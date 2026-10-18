import {
  DEFAULT_PREFERENCES,
  REMINDER_OFF,
  preferencesFromOnboarding,
  reminderAt,
  reminderTimeId,
  sanitizePreferences,
} from '@/features/preferences/preferences';

describe('onboarding preferences', () => {
  it('starts with nothing chosen and no reminder', () => {
    expect(DEFAULT_PREFERENCES).toMatchObject({ interest: null, dailyMinutes: null, reminder: { enabled: false } });
  });

  it('applies the answers and keeps the other settings', () => {
    const current = { ...DEFAULT_PREFERENCES, reduceMotion: true };
    const result = preferencesFromOnboarding(current, {
      interest: 'patience',
      dailyMinutes: 5,
      reminder: reminderAt('evening'),
    });
    expect(result).toEqual({
      ...current,
      interest: 'patience',
      dailyMinutes: 5,
      reminder: { enabled: true, hour: 20, minute: 0 },
    });
  });

  it('accepts skipped answers', () => {
    const result = preferencesFromOnboarding(DEFAULT_PREFERENCES, {
      interest: null,
      dailyMinutes: null,
      reminder: REMINDER_OFF,
    });
    expect(result.interest).toBeNull();
    expect(result.dailyMinutes).toBeNull();
    expect(result.reminder.enabled).toBe(false);
  });

  it('maps reminder times both ways', () => {
    expect(reminderTimeId(reminderAt('midday'))).toBe('midday');
    expect(reminderTimeId(REMINDER_OFF)).toBeNull();
    expect(reminderTimeId({ enabled: true, hour: 6, minute: 15 })).toBeNull();
  });
});

describe('sanitizePreferences', () => {
  it('falls back to defaults for anything that is not an object', () => {
    expect(sanitizePreferences(null)).toEqual(DEFAULT_PREFERENCES);
    expect(sanitizePreferences('oops')).toEqual(DEFAULT_PREFERENCES);
    expect(sanitizePreferences([1, 2])).toEqual(DEFAULT_PREFERENCES);
  });

  it('keeps valid values', () => {
    const valid = { interest: 'trust', dailyMinutes: 10, reminder: { enabled: true, hour: 8, minute: 0 }, reduceMotion: true, lockScreenProgress: true, language: 'nl' };
    expect(sanitizePreferences(valid)).toEqual(valid);
  });

  it('drops invalid values field by field', () => {
    const result = sanitizePreferences({
      interest: 'astrology',
      dailyMinutes: 7,
      reminder: { enabled: true, hour: 25, minute: 0 },
      reduceMotion: 'yes',
      language: 'fr',
    });
    expect(result).toEqual(DEFAULT_PREFERENCES);
  });
});
