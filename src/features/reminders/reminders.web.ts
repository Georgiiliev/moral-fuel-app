import type { ReminderPreference } from '@/models/user';

import type { ReminderMessage } from './reminders';

/** Browsers cannot schedule daily local notifications here, so the app never offers them on web. */
export const remindersSupported = false;
export const remindersUnavailableReason: 'web' | 'expo-go' | null = 'web';

export function configureReminders() {}

export async function hasReminderPermission(): Promise<boolean> {
  return false;
}

export async function requestReminderPermission(): Promise<boolean> {
  return false;
}

export async function syncReminder(reminder: ReminderPreference, _message: ReminderMessage): Promise<boolean> {
  return !reminder.enabled;
}
