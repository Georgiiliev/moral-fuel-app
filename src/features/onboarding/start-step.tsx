import { StyleSheet, View } from 'react-native';

import { getDayViews, topicLabel } from '@/content';
import { reminderTimeId, type OnboardingAnswers } from '@/features/preferences/preferences';
import { daysForInterest } from '@/features/progress/progress';
import { formatClock } from '@/i18n/format';
import { useAppState, useStrings } from '@/state/app-state';
import { radius, spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Card } from '@/ui/card';
import { AppText } from '@/ui/text';

import { StepFrame, StepHeading } from './step-frame';

interface Props {
  answers: OnboardingAnswers;
  onFinish: () => void;
  onBack: () => void;
}

export function StartStep({ answers, onFinish, onBack }: Props) {
  const strings = useStrings();
  const { colors } = useTheme();
  const { language } = useAppState().state.preferences;
  const { start } = strings.onboarding;
  const days = getDayViews(language);
  const first = days.find((d) => d.available) ?? days[0];
  const matching = daysForInterest(days, answers.interest)
    .filter((d) => d.available && d.day !== first?.day)
    .slice(0, 2);
  const timeId = reminderTimeId(answers.reminder);

  const summary = [
    { label: start.interest, value: answers.interest ? topicLabel(answers.interest, language) : strings.common.notChosen },
    {
      label: start.time,
      value: answers.dailyMinutes ? strings.dailyMinutes[answers.dailyMinutes].title : strings.common.notChosen,
    },
    {
      label: start.reminder,
      value: timeId
        ? strings.reminderTimes[timeId]
        : answers.reminder.enabled
          ? formatClock(answers.reminder.hour, answers.reminder.minute)
          : start.reminderOff,
    },
  ];

  return (
    <StepFrame step={4} onBack={onBack} ctaLabel={start.cta} onCta={onFinish}>
      <StepHeading title={start.title} body={start.body} />

      <View style={[styles.rule, { borderColor: colors.border }]}>
        {summary.map((row) => (
          <View
            key={row.label}
            style={[styles.summaryRow, { borderColor: colors.border }]}
            accessible
            accessibilityLabel={`${row.label}: ${row.value}`}>
            <AppText variant="small" tone="muted">
              {row.label}
            </AppText>
            <AppText variant="bodyStrong" style={styles.summaryValue}>
              {row.value}
            </AppText>
          </View>
        ))}
      </View>

      {first ? (
        <Card tone="muted">
          <AppText variant="overline" tone="accent">
            {start.firstLesson}
          </AppText>
          <AppText variant="heading">{`${strings.common.day(first.day)} · ${first.title}`}</AppText>
          <AppText variant="small" tone="muted">
            {first.summary}
          </AppText>
        </Card>
      ) : null}

      {matching.length > 0 ? (
        <View style={styles.matching}>
          <AppText variant="overline" tone="muted">
            {start.matching}
          </AppText>
          {matching.map((day) => (
            <View key={day.day} style={styles.matchRow} accessible accessibilityLabel={`${strings.common.day(day.day)}. ${day.title}`}>
              <AppText variant="small" tone="accent" style={styles.matchDay}>
                {strings.common.day(day.day)}
              </AppText>
              <AppText style={styles.matchTitle}>{day.title}</AppText>
            </View>
          ))}
        </View>
      ) : null}
    </StepFrame>
  );
}

const styles = StyleSheet.create({
  rule: { borderTopWidth: StyleSheet.hairlineWidth, borderRadius: radius.sm },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  summaryValue: { flexShrink: 1, textAlign: 'right' },
  matching: { gap: spacing.sm },
  matchRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'baseline' },
  matchDay: { width: 56 },
  matchTitle: { flex: 1 },
});
