import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { Button } from '@/ui/button';
import { FadeIn } from '@/ui/motion';
import { ProgressBar } from '@/ui/progress-bar';
import { Screen } from '@/ui/screen';
import { AppText } from '@/ui/text';

import { STEP_COUNT } from './steps';

interface Props {
  /** Zero-based index of the step. */
  step: number;
  onBack: () => void;
  /** Primary action label and handler; shown pinned below the content. */
  ctaLabel: string;
  onCta: () => void;
  ctaBusy?: boolean;
  onSkip?: () => void;
  children: ReactNode;
}

/** Progress, back control, content and pinned actions shared by every onboarding step. */
export function StepFrame({ step, onBack, ctaLabel, onCta, ctaBusy, onSkip, children }: Props) {
  const strings = useStrings();
  const label = strings.common.stepOf(step + 1, STEP_COUNT);

  return (
    <Screen
      edges={['top', 'left', 'right', 'bottom']}
      footer={
        <>
          <Button label={ctaLabel} onPress={onCta} disabled={ctaBusy} />
          {onSkip ? <Button label={strings.common.skip} variant="ghost" onPress={onSkip} disabled={ctaBusy} /> : null}
        </>
      }>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.back}>
            {step > 0 ? (
              <Button
                label={strings.common.back}
                variant="ghost"
                icon="chevronLeft"
                iconPosition="start"
                onPress={onBack}
                disabled={ctaBusy}
              />
            ) : null}
          </View>
          <AppText variant="caption" tone="muted" accessibilityLiveRegion="polite">
            {label}
          </AppText>
        </View>
        <ProgressBar value={step + 1} max={STEP_COUNT} label={label} />
      </View>
      <FadeIn key={step}>
        <View style={styles.body}>{children}</View>
      </FadeIn>
    </Screen>
  );
}

/** Title and intro text of a step. */
export function StepHeading({ title, body }: { title: string; body?: string }) {
  return (
    <View style={styles.heading}>
      <AppText variant="title">{title}</AppText>
      {body ? <AppText tone="muted">{body}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.xs },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44 },
  back: { marginLeft: -spacing.sm },
  body: { gap: spacing.lg },
  heading: { gap: spacing.sm },
});
