import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { topicLabel } from '@/content';
import { DAILY_MINUTES, INTERESTS } from '@/models/user';
import { useAppState, useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { Button } from '@/ui/button';
import { OptionRow } from '@/ui/choice';
import { AppText } from '@/ui/text';

import { Section } from './section';

type Editing = 'interest' | 'time' | null;

/** Interest and daily time with their current value; Wijzig expands the same options as onboarding. */
export function ChoicesSection() {
  const strings = useStrings();
  const { state, actions } = useAppState();
  const { interest, dailyMinutes, language } = state.preferences;
  const [editing, setEditing] = useState<Editing>(null);
  const toggle = (which: Exclude<Editing, null>) => setEditing((current) => (current === which ? null : which));

  return (
    <Section title={strings.you.choices}>
      <View style={styles.group}>
        <ChoiceHeader
          label={strings.you.interest}
          value={interest ? topicLabel(interest, language) : strings.common.notChosen}
          open={editing === 'interest'}
          onToggle={() => toggle('interest')}
        />
        {editing === 'interest' &&
          INTERESTS.map((id) => (
            <OptionRow
              key={id}
              title={topicLabel(id, language)}
              description={strings.interests[id]}
              selected={interest === id}
              onPress={() => actions.updatePreferences({ interest: id })}
            />
          ))}
      </View>
      <View style={styles.group}>
        <ChoiceHeader
          label={strings.you.time}
          value={dailyMinutes ? strings.dailyMinutes[dailyMinutes].title : strings.common.notChosen}
          open={editing === 'time'}
          onToggle={() => toggle('time')}
        />
        {editing === 'time' &&
          DAILY_MINUTES.map((minutes) => (
            <OptionRow
              key={minutes}
              title={strings.dailyMinutes[minutes].title}
              description={strings.dailyMinutes[minutes].description}
              selected={dailyMinutes === minutes}
              onPress={() => actions.updatePreferences({ dailyMinutes: minutes })}
            />
          ))}
      </View>
    </Section>
  );
}

function ChoiceHeader({
  label,
  value,
  open,
  onToggle,
}: {
  label: string;
  value: string;
  open: boolean;
  onToggle: () => void;
}) {
  const strings = useStrings();
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <AppText variant="caption" tone="muted">
          {label}
        </AppText>
        <AppText variant="bodyStrong">{value}</AppText>
      </View>
      <Button
        variant="ghost"
        label={open ? strings.you.done : strings.you.change}
        accessibilityLabel={`${open ? strings.you.done : strings.you.change}: ${label}`}
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: spacing.xs },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  headerText: { flex: 1, gap: 2 },
});
