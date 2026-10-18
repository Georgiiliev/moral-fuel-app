import { View } from 'react-native';

import { useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { Button } from '@/ui/button';
import { Screen } from '@/ui/screen';
import { AppText } from '@/ui/text';

import { useCloseLesson } from './close-lesson';

/** Calm fallback for an unknown lesson or a planned day: never a broken screen. */
export function LessonUnavailable() {
  const strings = useStrings();
  const close = useCloseLesson();
  return (
    <Screen>
      <View style={{ gap: spacing.md, paddingTop: spacing.xxl }}>
        <AppText variant="title">{strings.lesson.unavailableTitle}</AppText>
        <AppText tone="muted">{strings.lesson.unavailableBody}</AppText>
        <View style={{ paddingTop: spacing.md }}>
          <Button label={strings.common.back} variant="secondary" icon="chevronLeft" iconPosition="start" onPress={close} />
        </View>
      </View>
    </Screen>
  );
}
