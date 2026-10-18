import { StyleSheet, View } from 'react-native';

import { useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { FadeIn } from '@/ui/motion';
import { Screen } from '@/ui/screen';
import { AppText } from '@/ui/text';

import { ChoicesSection } from './choices-section';
import { DataSection } from './data-section';
import { ProgressSection } from './progress-section';
import { ReminderSection } from './reminder-section';
import { WidgetsSection } from './widgets-section';
import { AccessibilitySection, BibleSourceSection, LanguageSection, TextSection } from './settings-sections';

export function YouScreen() {
  const strings = useStrings();
  return (
    <Screen inTabs>
      <View style={styles.header}>
        <AppText variant="display">{strings.you.title}</AppText>
        <AppText tone="muted">{strings.you.subtitle}</AppText>
      </View>
      <FadeIn>
        <View style={styles.sections}>
          <ChoicesSection />
          <ProgressSection />
          <ReminderSection />
          <WidgetsSection />
          <AccessibilitySection />
          <LanguageSection />
          <TextSection title={strings.you.privacy} paragraphs={strings.you.privacyBody} />
          <TextSection title={strings.you.about} paragraphs={strings.you.aboutBody} />
          <BibleSourceSection />
          <DataSection />
        </View>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.xs, paddingTop: spacing.sm },
  sections: { gap: spacing.xl },
});
