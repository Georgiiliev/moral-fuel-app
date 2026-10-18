import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { REMINDER_OFF } from '@/features/preferences/preferences';
import { ReminderTimeChooser } from '@/features/reminders/reminder-time-chooser';
import {
  hasReminderPermission,
  remindersSupported,
  remindersUnavailableReason,
  requestReminderPermission,
} from '@/features/reminders/reminders';
import { formatClock } from '@/i18n/format';
import type { ReminderPreference } from '@/models/user';
import { useAppState, useStrings } from '@/state/app-state';
import { AppText } from '@/ui/text';

import { Section } from './section';

/**
 * Reminder choice. This screen only updates the preference; the state provider does the scheduling.
 * Permission is asked for only when a time is chosen, and re-checked whenever the screen gains focus.
 */
export function ReminderSection() {
  const strings = useStrings();
  const { state, actions } = useAppState();
  const { reminder } = state.preferences;
  const [denied, setDenied] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!remindersSupported || !reminder.enabled) return;
      let active = true;
      hasReminderPermission().then(
        (granted) => active && setDenied(!granted),
        () => {},
      );
      return () => {
        active = false;
      };
    }, [reminder.enabled]),
  );

  if (!remindersSupported) {
    return (
      <Section title={strings.you.reminder}>
        <AppText tone="muted">
          {remindersUnavailableReason === 'expo-go' ? strings.you.reminderExpoGo : strings.you.reminderUnsupported}
        </AppText>
      </Section>
    );
  }

  const choose = async (next: ReminderPreference) => {
    if (!next.enabled) return turnOff();
    const granted = await requestReminderPermission().catch(() => false);
    setDenied(!granted);
    if (granted) actions.updatePreferences({ reminder: next });
  };
  const turnOff = () => {
    setDenied(false);
    actions.updatePreferences({ reminder: REMINDER_OFF });
  };
  const status = reminder.enabled && !denied
    ? strings.you.reminderOn(formatClock(reminder.hour, reminder.minute))
    : strings.you.reminderOff;

  return (
    <Section title={strings.you.reminder}>
      <AppText variant="bodyStrong" accessibilityLiveRegion="polite">
        {status}
      </AppText>
      <ReminderTimeChooser
        value={denied ? REMINDER_OFF : reminder}
        onChange={choose}
        offLabel={strings.you.reminderOff}
      />
      {denied ? (
        <AppText tone="danger" variant="small" accessibilityLiveRegion="polite">
          {strings.you.reminderDenied}
        </AppText>
      ) : null}
    </Section>
  );
}


