import { StyleSheet, View } from 'react-native';

import type { DayView } from '@/content';
import type { DailyAction } from '@/models/content';
import { useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { AppText } from '@/ui/text';

interface CompletionViewProps {
  day: number;
  action: DailyAction;
  next: DayView | null;
  onNext: (lessonId: string) => void;
  onToday: () => void;
  onReview: () => void;
  onJournal: () => void;
}

/** A quiet finish: what was done, the one step to take, and where to go next. No scores, no streaks. */
export function CompletionView({ day, action, next, onNext, onToday, onReview, onJournal }: CompletionViewProps) {
  const strings = useStrings();
  const { colors } = useTheme();
  return (
    <View style={styles.stack}>
      <View style={styles.hero}>
        <Icon name="checkCircle" size={44} color={colors.primary} />
        <AppText variant="display">{strings.lesson.doneTitle}</AppText>
        <AppText tone="muted">{strings.lesson.doneBody(day)}</AppText>
      </View>

      <Card tone="muted">
        <AppText variant="overline" tone="accent">
          {strings.lesson.doneAction}
        </AppText>
        <AppText variant="heading">{action.title}</AppText>
        <AppText>{action.description}</AppText>
      </Card>

      <View style={styles.buttons}>
        {next?.lessonId ? (
          <Button
            label={strings.lesson.doneNext(next.day)}
            icon="chevronRight"
            onPress={() => onNext(next.lessonId!)}
          />
        ) : null}
        <Button label={strings.lesson.doneToday} variant={next ? 'secondary' : 'primary'} onPress={onToday} />
        <Button label={strings.lesson.writeInJournal} variant="ghost" icon="pencil" iconPosition="start" onPress={onJournal} />
        <Button label={strings.lesson.doneReview} variant="ghost" icon="restart" iconPosition="start" onPress={onReview} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  hero: { gap: spacing.sm, paddingTop: spacing.xl },
  buttons: { gap: spacing.sm, paddingTop: spacing.sm },
});
