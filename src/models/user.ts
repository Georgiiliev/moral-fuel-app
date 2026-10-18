import type { LanguageCode } from './content';

/** The seven onboarding interests. Each is also a content topic, so lessons can be matched to it. */
export const INTERESTS = [
  'faith-basics',
  'habits',
  'prayer',
  'relationships',
  'forgiveness',
  'patience',
  'trust',
] as const;
export type InterestId = (typeof INTERESTS)[number];

export const DAILY_MINUTES = [2, 5, 10] as const;
export type DailyMinutes = (typeof DAILY_MINUTES)[number];

export interface ReminderPreference {
  enabled: boolean;
  hour: number;
  minute: number;
}

export interface UserPreferences {
  interest: InterestId | null;
  dailyMinutes: DailyMinutes | null;
  reminder: ReminderPreference;
  /** App-level switch on top of the system's reduce-motion setting. */
  reduceMotion: boolean;
  /** Lock Screen widgets may show journey progress; off by default, because a lock screen is public. */
  lockScreenProgress: boolean;
  language: LanguageCode;
}

export type LessonStatus = 'in-progress' | 'completed';

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  /** Last step the user was on: 0 learn, 1 reflect, 2 live. */
  stepIndex: number;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}

export type ProgressMap = Record<string, LessonProgress>;

export const APP_STATE_VERSION = 1;

export interface AppState {
  version: typeof APP_STATE_VERSION;
  onboardingCompleted: boolean;
  preferences: UserPreferences;
  progress: ProgressMap;
}
