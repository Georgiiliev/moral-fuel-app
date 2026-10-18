import { StyleSheet, View } from 'react-native';

import { useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Card } from '@/ui/card';
import { Icon } from '@/ui/icon';
import { AppText } from '@/ui/text';
import { Wordmark } from '@/ui/wordmark';

import { StepFrame } from './step-frame';

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  const strings = useStrings();
  const { colors } = useTheme();
  const { welcome } = strings.onboarding;

  return (
    <StepFrame step={0} onBack={() => {}} ctaLabel={welcome.cta} onCta={onNext}>
      <Card tone="primary" style={styles.hero}>
        <Wordmark onPrimary />
        <AppText variant="overline" tone="onPrimaryMuted">
          {strings.brand.promise}
        </AppText>
        <AppText variant="display" tone="onPrimary">
          {welcome.title}
        </AppText>
        <AppText tone="onPrimaryMuted">{welcome.body}</AppText>
      </Card>

      <View style={styles.points}>
        {welcome.points.map((point, index) => (
          <View key={point.title} style={styles.point} accessible accessibilityLabel={`${point.title}. ${point.body}`}>
            <AppText variant="heading" tone="accent" style={styles.pointIndex}>
              {index + 1}
            </AppText>
            <View style={styles.pointText}>
              <AppText variant="heading">{point.title}</AppText>
              <AppText variant="small" tone="muted">
                {point.body}
              </AppText>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.note}>
        <Icon name="lock" size={18} color={colors.textMuted} />
        <AppText variant="small" tone="muted" style={styles.noteText}>
          {welcome.note}
        </AppText>
      </View>
    </StepFrame>
  );
}

const styles = StyleSheet.create({
  hero: { padding: spacing.xl, gap: spacing.md },
  points: { gap: spacing.md },
  point: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  pointIndex: { width: 28 },
  pointText: { flex: 1, gap: 2 },
  note: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  noteText: { flex: 1 },
});
