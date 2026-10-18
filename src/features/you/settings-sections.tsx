import { openBrowserAsync } from 'expo-web-browser';
import { StyleSheet, Switch, View } from 'react-native';

import { BGT } from '@/content/bible';
import { useAppState, useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { AppText } from '@/ui/text';

import { Section } from './section';

export function AccessibilitySection() {
  const strings = useStrings();
  const { state, actions } = useAppState();
  const { colors } = useTheme();
  return (
    <Section title={strings.you.accessibility}>
      <View style={styles.switchRow}>
        <View style={styles.switchText}>
          <AppText variant="bodyStrong">{strings.you.reduceMotion}</AppText>
          <AppText variant="small" tone="muted">
            {strings.you.reduceMotionHint}
          </AppText>
        </View>
        <Switch
          value={state.preferences.reduceMotion}
          onValueChange={(reduceMotion) => actions.updatePreferences({ reduceMotion })}
          accessibilityLabel={strings.you.reduceMotion}
          accessibilityHint={strings.you.reduceMotionHint}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>
      <View style={styles.switchText}>
        <AppText variant="bodyStrong">{strings.you.textSize}</AppText>
        <AppText variant="small" tone="muted">
          {strings.you.textSizeHint}
        </AppText>
      </View>
    </Section>
  );
}

/** Informational only: Dutch is the active language, English is still being prepared. */
export function LanguageSection() {
  const strings = useStrings();
  const languages = [
    { code: 'nl', status: strings.you.languageActive, tone: 'done' },
    { code: 'en', status: strings.you.languagePlanned, tone: 'soon' },
  ] as const;
  return (
    <Section title={strings.you.language}>
      {languages.map(({ code, status, tone }) => (
        <View
          key={code}
          accessible
          accessibilityLabel={`${strings.you.languages[code]}. ${status}`}
          style={styles.languageRow}>
          <AppText variant="bodyStrong">{strings.you.languages[code]}</AppText>
          <Badge label={status} tone={tone} />
        </View>
      ))}
    </Section>
  );
}

/** Which Bible translation the lessons show, its publisher and where to read more. */
export function BibleSourceSection() {
  const strings = useStrings();
  return (
    <Section title={strings.bible.infoTitle}>
      {strings.bible.infoBody(BGT.name, BGT.copyright).map((paragraph) => (
        <AppText key={paragraph} tone="muted">
          {paragraph}
        </AppText>
      ))}
      <Button
        variant="secondary"
        label={strings.bible.infoLink}
        icon="chevronRight"
        onPress={() => openBrowserAsync(BGT.website)}
      />
    </Section>
  );
}

export function TextSection({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <Section title={title}>
      {paragraphs.map((paragraph) => (
        <AppText key={paragraph} tone="muted">
          {paragraph}
        </AppText>
      ))}
    </Section>
  );
}

const styles = StyleSheet.create({
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 56 },
  switchText: { flex: 1, gap: 2 },
  languageRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44 },
});
