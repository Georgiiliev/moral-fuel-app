import { DEFAULT_LANGUAGE, LANGUAGES, type LanguageCode } from '@/models/content';
import {
  DAILY_MINUTES,
  INTERESTS,
  type DailyMinutes,
  type InterestId,
  type ReminderPreference,
  type UserPreferences,
} from '@/models/user';

export const REMINDER_TIMES = [
  { id: 'morning', hour: 8, minute: 0 },
  { id: 'midday', hour: 12, minute: 30 },
  { id: 'evening', hour: 20, minute: 0 },
] as const;
export type ReminderTimeId = (typeof REMINDER_TIMES)[number]['id'];

export const REMINDER_OFF: ReminderPreference = { enabled: false, hour: 8, minute: 0 };

export const DEFAULT_PREFERENCES: UserPreferences = {
  interest: null,
  dailyMinutes: null,
  reminder: REMINDER_OFF,
  reduceMotion: false,
  lockScreenProgress: false,
  language: DEFAULT_LANGUAGE,
};

export function reminderAt(id: ReminderTimeId): ReminderPreference {
  const time = REMINDER_TIMES.find((t) => t.id === id) ?? REMINDER_TIMES[0];
  return { enabled: true, hour: time.hour, minute: time.minute };
}

/** A reminder at any time of day; minutes snap to five-minute steps. */
export function reminderAtTime(hour: number, minute: number): ReminderPreference {
  const h = ((Math.trunc(hour) % 24) + 24) % 24;
  const m = ((Math.round(minute / 5) * 5) % 60 + 60) % 60;
  return { enabled: true, hour: h, minute: m };
}

export function reminderTimeId(reminder: ReminderPreference): ReminderTimeId | null {
  if (!reminder.enabled) return null;
  return REMINDER_TIMES.find((t) => t.hour === reminder.hour && t.minute === reminder.minute)?.id ?? null;
}

/** What onboarding asks; every answer may be skipped. */
export interface OnboardingAnswers {
  interest: InterestId | null;
  dailyMinutes: DailyMinutes | null;
  reminder: ReminderPreference;
}

export function preferencesFromOnboarding(
  current: UserPreferences,
  answers: OnboardingAnswers,
): UserPreferences {
  return { ...current, ...answers };
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function sanitizeReminder(raw: unknown): ReminderPreference {
  if (!isObject(raw)) return REMINDER_OFF;
  const { enabled, hour, minute } = raw;
  const validTime =
    Number.isInteger(hour) && Number.isInteger(minute) &&
    (hour as number) >= 0 && (hour as number) <= 23 &&
    (minute as number) >= 0 && (minute as number) <= 59;
  if (typeof enabled !== 'boolean' || !validTime) return REMINDER_OFF;
  return { enabled, hour: hour as number, minute: minute as number };
}

/** Accepts whatever was stored and keeps only valid values, falling back to defaults field by field. */
export function sanitizePreferences(raw: unknown): UserPreferences {
  if (!isObject(raw)) return DEFAULT_PREFERENCES;
  return {
    interest: INTERESTS.includes(raw.interest as InterestId) ? (raw.interest as InterestId) : null,
    dailyMinutes: DAILY_MINUTES.includes(raw.dailyMinutes as DailyMinutes)
      ? (raw.dailyMinutes as DailyMinutes)
      : null,
    reminder: sanitizeReminder(raw.reminder),
    reduceMotion: raw.reduceMotion === true,
    lockScreenProgress: raw.lockScreenProgress === true,
    language: LANGUAGES.includes(raw.language as LanguageCode)
      ? (raw.language as LanguageCode)
      : DEFAULT_LANGUAGE,
  };
}
