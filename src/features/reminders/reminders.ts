import { requireOptionalNativeModule } from 'expo';
import { Platform } from 'react-native';

import type { ReminderPreference } from '@/models/user';

/**
 * Expo Go on Android lacks a native module that expo-notifications loads on import, so importing it
 * there crashes the app (and Expo Go reports itself as "bare", so the environment cannot tell).
 * Real builds have the module. So the module is loaded only when reminders are used, and only
 * when that native piece is present.
 */
const inExpoGoOnAndroid =
  Platform.OS === 'android' && requireOptionalNativeModule('ExpoTopicSubscriptionModule') == null;

export const remindersSupported = !inExpoGoOnAndroid;
export const remindersUnavailableReason: 'web' | 'expo-go' | null = inExpoGoOnAndroid ? 'expo-go' : null;

// A lazy require keeps the module out of app start-up; it is evaluated on first use only.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const notifications = (): typeof import('expo-notifications') => require('expo-notifications');

const CHANNEL_ID = 'daily-lesson';

export function configureReminders() {
  if (!remindersSupported) return;
  notifications().setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

export async function hasReminderPermission(): Promise<boolean> {
  if (!remindersSupported) return false;
  return (await notifications().getPermissionsAsync()).granted;
}

/** Asks only when the user has chosen a reminder time. */
export async function requestReminderPermission(): Promise<boolean> {
  if (!remindersSupported) return false;
  if (await hasReminderPermission()) return true;
  return (await notifications().requestPermissionsAsync()).granted;
}

export interface ReminderMessage {
  channelName: string;
  title: string;
  body: string;
}

/**
 * The one place reminders are scheduled or cancelled: whatever is scheduled afterwards matches
 * the preference exactly. Returns false when the reminder could not be scheduled.
 */
export async function syncReminder(reminder: ReminderPreference, message: ReminderMessage): Promise<boolean> {
  if (!remindersSupported) return !reminder.enabled;
  const Notifications = notifications();
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!reminder.enabled) return true;
  if (!(await hasReminderPermission())) return false;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: message.channelName,
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  await Notifications.scheduleNotificationAsync({
    content: { title: message.title, body: message.body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: reminder.hour,
      minute: reminder.minute,
      channelId: CHANNEL_ID,
    },
  });
  return true;
}
