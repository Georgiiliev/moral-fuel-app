import { Pressable, StyleSheet, View } from 'react-native';

import { getDayViews } from '@/content';
import { useOpenLesson } from '@/features/lesson/use-open-lesson';
import { getJourneyPosition, isCompleted } from '@/features/progress/progress';
import { useAppState, useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Icon } from '@/ui/icon';
import { ProgressBar } from '@/ui/progress-bar';
import { AppText } from '@/ui/text';

import { Section } from './section';

/** Overall journey percentage and the lessons finished so far, each opening its lesson. */
export function ProgressSection() {
  const strings = useStrings();
  const { state } = useAppState();
  const { colors } = useTheme();
  const openLesson = useOpenLesson();
  const days = getDayViews(state.preferences.language);
  const position = getJourneyPosition(days, state.progress);
  const percent = position.totalDays ? Math.round((position.completedCount / position.totalDays) * 100) : 0;
  const line = strings.you.journeyPercent(percent);
  const completed = days.filter((day) => day.available && isCompleted(state.progress, day.lessonId));

  return (
    <Section title={strings.you.progress}>
      <View style={styles.summary}>
        <AppText>{line}</AppText>
        <ProgressBar value={position.completedCount} max={position.totalDays} label={line} />
      </View>
      {completed.length === 0 ? (
        <AppText tone="muted">{strings.you.noneCompleted}</AppText>
      ) : (
        <View>
          {completed.map((day) => (
            <Pressable
              key={day.day}
              accessibilityRole="link"
              accessibilityLabel={`${strings.common.day(day.day)}. ${day.title}`}
              onPress={() => day.lessonId && openLesson(day.lessonId)}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
              <View style={styles.rowText}>
                <AppText variant="caption" tone="muted">
                  {strings.common.day(day.day)}
                </AppText>
                <AppText variant="bodyStrong">{day.title}</AppText>
              </View>
              <Icon name="chevronRight" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  summary: { gap: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 56, paddingVertical: spacing.xs },
  rowText: { flex: 1, gap: 2 },
  pressed: { opacity: 0.7 },
});
