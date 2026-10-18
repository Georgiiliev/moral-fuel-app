import { REMINDER_OFF } from '@/features/preferences/preferences';
import { createDefaultState } from '@/storage/app-state-codec';
import { appReducer } from '@/state/app-state-reducer';

const T = '2026-10-01T08:00:00.000Z';

describe('appReducer', () => {
  it('completing onboarding stores the answers', () => {
    const state = appReducer(createDefaultState(), {
      type: 'onboarding-completed',
      answers: { interest: 'trust', dailyMinutes: 10, reminder: REMINDER_OFF },
    });
    expect(state.onboardingCompleted).toBe(true);
    expect(state.preferences).toMatchObject({ interest: 'trust', dailyMinutes: 10 });
  });

  it('restarting onboarding keeps progress', () => {
    let state = appReducer(createDefaultState(), { type: 'lesson-completed', lessonId: 'day-01-why-believe', now: T });
    state = appReducer({ ...state, onboardingCompleted: true }, { type: 'onboarding-restarted' });
    expect(state.onboardingCompleted).toBe(false);
    expect(state.progress['day-01-why-believe'].status).toBe('completed');
  });

  it('reset returns to a fresh state', () => {
    let state = appReducer(createDefaultState(), { type: 'lesson-opened', lessonId: 'day-02-who-is-jesus', now: T });
    state = appReducer(state, { type: 'preferences-updated', patch: { reduceMotion: true } });
    expect(appReducer(state, { type: 'reset' })).toEqual(createDefaultState());
  });
});
