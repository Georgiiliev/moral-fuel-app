import { DEFAULT_PREFERENCES, sanitizePreferences } from '@/features/preferences/preferences';
import { LESSON_STEP_COUNT } from '@/features/progress/progress';
import { APP_STATE_VERSION, type AppState, type LessonProgress, type ProgressMap } from '@/models/user';

export function createDefaultState(): AppState {
  return { version: APP_STATE_VERSION, onboardingCompleted: false, preferences: DEFAULT_PREFERENCES, progress: {} };
}

const isDate = (value: unknown): value is string =>
  typeof value === 'string' && !Number.isNaN(Date.parse(value));

function sanitizeProgress(raw: unknown, knownLessonIds: ReadonlySet<string>): ProgressMap {
  if (typeof raw !== 'object' || raw === null) return {};
  const progress: ProgressMap = {};
  for (const [lessonId, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!knownLessonIds.has(lessonId) || typeof value !== 'object' || value === null) continue;
    const entry = value as Partial<LessonProgress>;
    if (entry.status !== 'in-progress' && entry.status !== 'completed') continue;
    if (!isDate(entry.startedAt) || !isDate(entry.updatedAt)) continue;
    if (entry.status === 'completed' && !isDate(entry.completedAt)) continue;
    const step = Number.isInteger(entry.stepIndex) ? (entry.stepIndex as number) : 0;
    progress[lessonId] = {
      lessonId,
      status: entry.status,
      stepIndex: Math.min(Math.max(step, 0), LESSON_STEP_COUNT - 1),
      startedAt: entry.startedAt,
      updatedAt: entry.updatedAt,
      ...(entry.status === 'completed' ? { completedAt: entry.completedAt } : {}),
    };
  }
  return progress;
}

type StoredState = Record<string, unknown>;

/**
 * Upgrades from each older version to the next: MIGRATIONS[n] turns version n into n + 1.
 * Add one whenever APP_STATE_VERSION goes up, so an app update never resets anyone's progress.
 */
export const MIGRATIONS: Record<number, (state: StoredState) => StoredState> = {};

/** Runs the migrations up to `target`; returns null when there is no path (e.g. data from a newer app). */
export function migrateState(
  stored: StoredState,
  migrations: Record<number, (state: StoredState) => StoredState> = MIGRATIONS,
  target: number = APP_STATE_VERSION,
): StoredState | null {
  let version = stored.version;
  let data = stored;
  while (typeof version === 'number' && Number.isInteger(version) && version < target) {
    const step = migrations[version];
    if (!step) return null;
    data = { ...step(data), version: version + 1 };
    version = version + 1;
  }
  return version === target ? data : null;
}

/**
 * Turns stored text back into state. Older versions are migrated; corrupt JSON or a version with no
 * migration path starts fresh; stale entries (removed lessons, invalid values) are dropped one by one
 * instead of failing the lot.
 */
export function parseAppState(raw: string | null, knownLessonIds: ReadonlySet<string>): AppState {
  if (!raw) return createDefaultState();
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return createDefaultState();
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return createDefaultState();
  const stored = migrateState(data as StoredState);
  if (!stored) return createDefaultState();
  return {
    version: APP_STATE_VERSION,
    onboardingCompleted: stored.onboardingCompleted === true,
    preferences: sanitizePreferences(stored.preferences),
    progress: sanitizeProgress(stored.progress, knownLessonIds),
  };
}

export const serializeAppState = (state: AppState) => JSON.stringify(state);
