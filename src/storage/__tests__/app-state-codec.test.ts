import { createDefaultState, migrateState, parseAppState, serializeAppState } from '@/storage/app-state-codec';
import { completeLesson, openLesson } from '@/features/progress/progress';
import type { AppState } from '@/models/user';

const known = new Set(['day-01-why-believe', 'day-02-who-is-jesus']);
const T = '2026-10-01T08:00:00.000Z';

describe('parseAppState', () => {
  it('starts fresh when nothing is stored', () => {
    expect(parseAppState(null, known)).toEqual(createDefaultState());
  });

  it('starts fresh on corrupt JSON instead of crashing', () => {
    expect(parseAppState('{"version":1, "onboard', known)).toEqual(createDefaultState());
    expect(parseAppState('42', known)).toEqual(createDefaultState());
  });

  it('starts fresh on an unknown version', () => {
    expect(parseAppState(JSON.stringify({ ...createDefaultState(), version: 99, onboardingCompleted: true }), known)).toEqual(
      createDefaultState(),
    );
  });

  it('round-trips a real state', () => {
    const state: AppState = {
      ...createDefaultState(),
      onboardingCompleted: true,
      preferences: { ...createDefaultState().preferences, interest: 'prayer', dailyMinutes: 2 },
      progress: completeLesson(openLesson({}, 'day-01-why-believe', T), 'day-01-why-believe', T),
    };
    expect(parseAppState(serializeAppState(state), known)).toEqual(state);
  });

  it('drops stale or invalid progress entries but keeps the rest', () => {
    const stored = {
      ...createDefaultState(),
      onboardingCompleted: true,
      progress: {
        'day-01-why-believe': { lessonId: 'day-01-why-believe', status: 'in-progress', stepIndex: 7, startedAt: T, updatedAt: T },
        'day-02-who-is-jesus': { lessonId: 'day-02-who-is-jesus', status: 'completed', stepIndex: 2, startedAt: T, updatedAt: T },
        'day-77-removed': { lessonId: 'day-77-removed', status: 'completed', stepIndex: 2, startedAt: T, updatedAt: T, completedAt: T },
      },
    };
    const state = parseAppState(JSON.stringify(stored), known);
    expect(state.onboardingCompleted).toBe(true);
    // Step clamped; the completed entry without completedAt and the removed lesson are dropped.
    expect(state.progress).toEqual({
      'day-01-why-believe': { lessonId: 'day-01-why-believe', status: 'in-progress', stepIndex: 2, startedAt: T, updatedAt: T },
    });
  });
});

describe('migrateState', () => {
  const migrations = {
    1: (s: Record<string, unknown>) => ({ ...s, renamed: s.old }),
    2: (s: Record<string, unknown>) => ({ ...s, added: true }),
  };

  it('runs every step from an old version to the current one', () => {
    expect(migrateState({ version: 1, old: 'x' }, migrations, 3)).toEqual({ version: 3, old: 'x', renamed: 'x', added: true });
  });

  it('leaves current data untouched', () => {
    expect(migrateState({ version: 3, a: 1 }, migrations, 3)).toEqual({ version: 3, a: 1 });
  });

  it('has no path for data from a newer app or without a version', () => {
    expect(migrateState({ version: 4 }, migrations, 3)).toBeNull();
    expect(migrateState({}, migrations, 3)).toBeNull();
    expect(migrateState({ version: 0 }, migrations, 3)).toBeNull();
  });
});
