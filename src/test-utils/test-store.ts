import { stringsFor } from '@/i18n/strings';
import type { AppState } from '@/models/user';
import { createDefaultState } from '@/storage/app-state-codec';

/** A useAppState() stand-in for component tests. */
export function makeStore(overrides: Partial<AppState> = {}) {
  const state: AppState = { ...createDefaultState(), onboardingCompleted: true, ...overrides };
  return {
    ready: true,
    state,
    storageProblem: false,
    actions: {
      completeOnboarding: jest.fn(),
      restartOnboarding: jest.fn(),
      updatePreferences: jest.fn(),
      openLesson: jest.fn(),
      setLessonStep: jest.fn(),
      completeLesson: jest.fn(),
      eraseAllData: jest.fn(async () => {}),
    },
  };
}

export const nlStrings = stringsFor('nl');

/** A planned, not yet written day: the journey has none today, but screens must keep handling them. */
export const plannedDay = {
  day: 31,
  sectionId: 'week-4',
  available: false,
  title: 'Een geplande les',
  summary: 'Deze les wordt nog geschreven.',
  objective: 'Je weet dat deze les later komt.',
  topics: ['patience', 'forgiveness'],
} satisfies import('@/content').DayView;
