import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { formatReference } from '@/content';
import { BGT, getPassage } from '@/content/bible';
import type { BibleReference } from '@/models/content';
import { useAppState, useStrings } from '@/state/app-state';
import { radius, spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Icon } from '@/ui/icon';
import { FadeIn } from '@/ui/motion';
import { AppText } from '@/ui/text';

import { PassageText } from './passage-text';

/** A Bible reference that opens into its full text in place. Reading it is optional and records nothing. */
export function BiblePassageAccordion({ reference }: { reference: BibleReference }) {
  const strings = useStrings();
  const { language } = useAppState().state.preferences;
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const label = formatReference(reference, language);

  return (
    <View style={[styles.box, { borderColor: colors.border, backgroundColor: colors.surface }]}>
      <Pressable
        onPress={() => setOpen((value) => !value)}
        accessibilityRole="button"
        accessibilityLabel={`${strings.bible.overline}: ${label}, ${BGT.name}`}
        accessibilityHint={open ? strings.bible.collapseHint : strings.bible.expandHint}
        aria-expanded={open}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}>
        <Icon name="book" size={20} color={colors.accentText} />
        <View style={styles.titles}>
          <AppText variant="overline" tone="accent">
            {strings.bible.overline}
          </AppText>
          <AppText variant="bodyStrong">{label}</AppText>
          <AppText variant="caption" tone="muted">
            {BGT.name}
          </AppText>
        </View>
        <View style={open && styles.flipped}>
          <Icon name="chevronDown" size={20} color={colors.textMuted} />
        </View>
      </Pressable>
      {open ? (
        <FadeIn>
          <View style={[styles.body, { borderTopColor: colors.border }]}>
            <PassageText passage={getPassage(reference)} />
          </View>
        </FadeIn>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: radius.lg, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, minHeight: 56 },
  pressed: { opacity: 0.7 },
  titles: { flex: 1, gap: 2 },
  flipped: { transform: [{ rotate: '180deg' }] },
  body: { padding: spacing.md, paddingTop: spacing.md, borderTopWidth: StyleSheet.hairlineWidth },
});
