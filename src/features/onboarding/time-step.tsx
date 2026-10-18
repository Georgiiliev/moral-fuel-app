import { View } from 'react-native';

import { DAILY_MINUTES, type DailyMinutes } from '@/models/user';
import { useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { OptionRow } from '@/ui/choice';

import { StepFrame, StepHeading } from './step-frame';

interface Props {
  value: DailyMinutes | null;
  onChange: (value: DailyMinutes | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TimeStep({ value, onChange, onNext, onBack }: Props) {
  const strings = useStrings();

  return (
    <StepFrame
      step={2}
      onBack={onBack}
      ctaLabel={strings.common.continue}
      onCta={onNext}
      onSkip={() => {
        onChange(null);
        onNext();
      }}>
      <StepHeading title={strings.onboarding.time.title} body={strings.onboarding.time.body} />
      <View accessibilityRole="radiogroup" style={{ gap: spacing.sm }}>
        {DAILY_MINUTES.map((minutes) => (
          <OptionRow
            key={minutes}
            title={strings.dailyMinutes[minutes].title}
            description={strings.dailyMinutes[minutes].description}
            selected={value === minutes}
            onPress={() => onChange(minutes)}
          />
        ))}
      </View>
    </StepFrame>
  );
}
