import * as Notifications from 'expo-notifications';

import { REMINDER_OFF, reminderAtTime } from '@/features/preferences/preferences';
import { requestReminderPermission, syncReminder } from '@/features/reminders/reminders';
import { stringsFor } from '@/i18n/strings';

// A stand-in for the system's notification schedule.
const mockPending: unknown[] = [];
let mockGranted = true;
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(async () => ({ granted: mockGranted })),
  requestPermissionsAsync: jest.fn(async () => ({ granted: mockGranted })),
  setNotificationChannelAsync: jest.fn(async () => null),
  cancelAllScheduledNotificationsAsync: jest.fn(async () => {
    mockPending.length = 0;
  }),
  scheduleNotificationAsync: jest.fn(async (request: unknown) => {
    mockPending.push(request);
    return 'id';
  }),
  SchedulableTriggerInputTypes: { DAILY: 'daily' },
  AndroidImportance: { DEFAULT: 3 },
}));

const message = stringsFor('nl').reminderMessage;

beforeEach(() => {
  mockPending.length = 0;
  mockGranted = true;
  jest.clearAllMocks();
});

describe('syncReminder', () => {
  it('schedules one daily reminder at the chosen time, with calm copy', async () => {
    expect(await syncReminder(reminderAtTime(21, 30), message)).toBe(true);
    expect(mockPending).toEqual([
      {
        content: { title: 'Moral Fuel', body: message.body },
        trigger: { type: 'daily', hour: 21, minute: 30, channelId: 'daily-lesson' },
      },
    ]);
    expect(message.body).not.toMatch(/moet|vergeet|mis|!/i);
  });

  it('never leaves duplicates: every sync replaces what was scheduled', async () => {
    await syncReminder(reminderAtTime(8, 0), message);
    await syncReminder(reminderAtTime(8, 0), message); // e.g. after an app restart
    await syncReminder(reminderAtTime(20, 15), message); // the time was changed
    expect(mockPending).toHaveLength(1);
    expect(mockPending[0]).toMatchObject({ trigger: { hour: 20, minute: 15 } });
  });

  it('turning reminders off removes them', async () => {
    await syncReminder(reminderAtTime(8, 0), message);
    expect(await syncReminder(REMINDER_OFF, message)).toBe(true);
    expect(mockPending).toHaveLength(0);
  });

  it('does not pretend: without permission nothing is scheduled and it reports false', async () => {
    mockGranted = false;
    expect(await syncReminder(reminderAtTime(8, 0), message)).toBe(false);
    expect(mockPending).toHaveLength(0);
    expect(Notifications.requestPermissionsAsync).not.toHaveBeenCalled();
  });
});

describe('requestReminderPermission', () => {
  it('does not ask again when permission was already given', async () => {
    expect(await requestReminderPermission()).toBe(true);
    expect(Notifications.requestPermissionsAsync).not.toHaveBeenCalled();
  });

  it('asks when permission is missing and reports a refusal', async () => {
    mockGranted = false;
    expect(await requestReminderPermission()).toBe(false);
    expect(Notifications.requestPermissionsAsync).toHaveBeenCalledTimes(1);
  });
});

describe('reminderAtTime', () => {
  it('keeps any valid time, snaps minutes to five and wraps around the clock', () => {
    expect(reminderAtTime(7, 42)).toEqual({ enabled: true, hour: 7, minute: 40 });
    expect(reminderAtTime(24, 0)).toEqual({ enabled: true, hour: 0, minute: 0 });
    expect(reminderAtTime(-1, -5)).toEqual({ enabled: true, hour: 23, minute: 55 });
  });
});
