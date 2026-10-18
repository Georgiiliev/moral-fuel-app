import { View } from 'react-native';

import { topicLabel } from '@/content';
import { INTERESTS, type InterestId } from '@/models/user';
import { useAppState, useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { OptionRow } from '@/ui/choice';

import { StepFrame, StepHeading } from './step-frame';

interface Props {
  value: InterestId | null;
  onChange: (value: InterestId | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export function InterestStep({ value, onChange, onNext, onBack }: Props) {
  const strings = useStrings();
  const { language } = useAppState().state.preferences;

  return (
    <StepFrame
      step={1}
      onBack={onBack}
      ctaLabel={strings.common.continue}
      onCta={onNext}
      onSkip={() => {
        onChange(null);
        onNext();
      }}>
      <StepHeading title={strings.onboarding.interest.title} body={strings.onboarding.interest.body} />
      <View accessibilityRole="radiogroup" style={{ gap: spacing.sm }}>
        {INTERESTS.map((interest) => (
          <OptionRow
            key={interest}
            title={topicLabel(interest, language)}
            description={strings.interests[interest]}
            selected={value === interest}
            onPress={() => onChange(interest)}
          />
        ))}
      </View>
    </StepFrame>
  );
}
