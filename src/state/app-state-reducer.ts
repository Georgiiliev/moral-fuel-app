import { preferencesFromOnboarding, type OnboardingAnswers } from '@/features/preferences/preferences';
import { completeLesson, openLesson, setLessonStep } from '@/features/progress/progress';
import { createDefaultState } from '@/storage/app-state-codec';
import type { AppState, UserPreferences } from '@/models/user';

export type AppAction =
  | { type: 'hydrated'; state: AppState }
  | { type: 'onboarding-completed'; answers: OnboardingAnswers }
  | { type: 'onboarding-restarted' }
  | { type: 'preferences-updated'; patch: Partial<UserPreferences> }
  | { type: 'lesson-opened'; lessonId: string; now: string }
  | { type: 'lesson-step'; lessonId: string; stepIndex: number; now: string }
  | { type: 'lesson-completed'; lessonId: string; now: string }
  | { type: 'reset' };

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'hydrated':
      return action.state;
    case 'onboarding-completed':
      return {
        ...state,
        onboardingCompleted: true,
        preferences: preferencesFromOnboarding(state.preferences, action.answers),
      };
    case 'onboarding-restarted':
      return { ...state, onboardingCompleted: false };
    case 'preferences-updated':
      return { ...state, preferences: { ...state.preferences, ...action.patch } };
    case 'lesson-opened':
      return { ...state, progress: openLesson(state.progress, action.lessonId, action.now) };
    case 'lesson-step':
      return { ...state, progress: setLessonStep(state.progress, action.lessonId, action.stepIndex, action.now) };
    case 'lesson-completed':
      return { ...state, progress: completeLesson(state.progress, action.lessonId, action.now) };
    case 'reset':
      return createDefaultState();
  }
}
