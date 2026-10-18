import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { REMINDER_OFF, REMINDER_TIMES, reminderAt, reminderAtTime, reminderTimeId } from '@/features/preferences/preferences';
import { formatClock } from '@/i18n/format';
import type { ReminderPreference } from '@/models/user';
import { useStrings } from '@/state/app-state';
import { radius, spacing, typography } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { OptionRow } from '@/ui/choice';
import { AppText } from '@/ui/text';

interface Props {
  value: ReminderPreference;
  onChange: (value: ReminderPreference) => void;
  offLabel: string;
}

/** Off, one of the suggested times, or a time of your own. Used in onboarding and on the You tab. */
export function ReminderTimeChooser({ value, onChange, offLabel }: Props) {
  const strings = useStrings();
  const preset = reminderTimeId(value);
  // Stepping onto a suggested time (say 08:00) keeps the custom picker open under the user's finger.
  const [customOpen, setCustomOpen] = useState(value.enabled && !preset);
  const custom = value.enabled && customOpen;
  const choose = (next: ReminderPreference, openCustom: boolean) => {
    setCustomOpen(openCustom);
    onChange(next);
  };
  return (
    <View accessibilityRole="radiogroup" style={styles.options}>
      <OptionRow title={offLabel} selected={!value.enabled} onPress={() => choose(REMINDER_OFF, false)} />
      {REMINDER_TIMES.map((time) => (
        <OptionRow
          key={time.id}
          title={strings.reminderTimes[time.id]}
          selected={!custom && preset === time.id}
          onPress={() => choose(reminderAt(time.id), false)}
        />
      ))}
      <OptionRow
        title={strings.reminderCustom.title}
        description={custom ? formatClock(value.hour, value.minute) : strings.reminderCustom.description}
        selected={custom}
        onPress={() => choose(value.enabled ? value : reminderAtTime(21, 30), true)}
      />
      {custom ? <TimeStepper value={value} onChange={onChange} /> : null}
    </View>
  );
}

function TimeStepper({ value, onChange }: { value: ReminderPreference; onChange: (value: ReminderPreference) => void }) {
  const strings = useStrings();
  const t = strings.reminderCustom;
  const set = (hour: number, minute: number) => onChange(reminderAtTime(hour, minute));
  return (
    <View style={styles.stepper}>
      <Adjuster
        label={t.hour}
        value={String(value.hour).padStart(2, '0')}
        decrementLabel={t.earlierHour}
        incrementLabel={t.laterHour}
        onDecrement={() => set(value.hour - 1, value.minute)}
        onIncrement={() => set(value.hour + 1, value.minute)}
      />
      <AppText variant="title" accessible={false}>
        :
      </AppText>
      <Adjuster
        label={t.minute}
        value={String(value.minute).padStart(2, '0')}
        decrementLabel={t.earlierMinutes}
        incrementLabel={t.laterMinutes}
        onDecrement={() => set(value.hour, value.minute - 5)}
        onIncrement={() => set(value.hour, value.minute + 5)}
      />
    </View>
  );
}

interface AdjusterProps {
  label: string;
  value: string;
  decrementLabel: string;
  incrementLabel: string;
  onDecrement: () => void;
  onIncrement: () => void;
}

/** One adjustable number: swipe up or down with a screen reader, or press minus and plus. */
function Adjuster({ label, value, decrementLabel, incrementLabel, onDecrement, onIncrement }: AdjusterProps) {
  const { colors } = useTheme();
  const button = (text: string, accessibilityLabel: string, onPress: () => void) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [styles.step, { borderColor: colors.border }, pressed && { backgroundColor: colors.surfaceMuted }]}>
      <AppText variant="heading">{text}</AppText>
    </Pressable>
  );
  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ text: value }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(event) => (event.nativeEvent.actionName === 'increment' ? onIncrement() : onDecrement())}
      style={styles.adjuster}>
      {button('−', decrementLabel, onDecrement)}
      <AppText style={[typography.title, styles.value]}>{value}</AppText>
      {button('+', incrementLabel, onIncrement)}
    </View>
  );
}

const styles = StyleSheet.create({
  options: { gap: spacing.sm },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  adjuster: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  step: { width: 44, height: 44, borderRadius: radius.pill, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  value: { minWidth: 44, textAlign: 'center', fontVariant: ['tabular-nums'] },
});
