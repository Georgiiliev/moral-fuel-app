import { useState } from 'react';

import { REMINDER_OFF } from '@/features/preferences/preferences';
import { ReminderTimeChooser } from '@/features/reminders/reminder-time-chooser';
import { remindersSupported, remindersUnavailableReason, requestReminderPermission } from '@/features/reminders/reminders';
import type { ReminderPreference } from '@/models/user';
import { useStrings } from '@/state/app-state';
import { AppText } from '@/ui/text';

import { StepFrame, StepHeading } from './step-frame';

interface Props {
  value: ReminderPreference;
  onChange: (value: ReminderPreference) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ReminderStep({ value, onChange, onNext, onBack }: Props) {
  const strings = useStrings();
  const { reminder } = strings.onboarding;
  const [denied, setDenied] = useState(false);
  const [busy, setBusy] = useState(false);

  const choose = (next: ReminderPreference) => {
    setDenied(false);
    onChange(next);
  };

  const proceed = async () => {
    // The permission is asked only when a time was chosen.
    if (!remindersSupported || !value.enabled) return onNext();
    setBusy(true);
    let granted = false;
    try {
      granted = await requestReminderPermission();
    } catch {
      granted = false;
    }
    setBusy(false);
    if (granted) return onNext();
    onChange(REMINDER_OFF);
    setDenied(true);
  };

  return (
    <StepFrame
      step={3}
      onBack={onBack}
      ctaLabel={strings.common.continue}
      onCta={denied ? onNext : proceed}
      ctaBusy={busy}>
      <StepHeading title={reminder.title} body={reminder.body} />
      {remindersSupported ? (
        <>
          <ReminderTimeChooser value={value} onChange={choose} offLabel={reminder.none} />
          {denied ? (
            <AppText variant="small" tone="danger" accessibilityRole="alert">
              {reminder.denied}
            </AppText>
          ) : (
            <AppText variant="small" tone="muted">
              {reminder.permissionNote}
            </AppText>
          )}
        </>
      ) : (
        <AppText variant="small" tone="muted">
          {remindersUnavailableReason === 'expo-go' ? reminder.expoGo : reminder.unsupported}
        </AppText>
      )}
    </StepFrame>
  );
}
