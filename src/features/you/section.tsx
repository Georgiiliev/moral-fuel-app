import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { AppText } from '@/ui/text';

/** A titled block of the You screen, separated from the previous one by a hairline rule. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.section, { borderTopColor: colors.border }]}>
      <AppText variant="title" accessibilityRole="header">
        {title}
      </AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md, borderTopWidth: StyleSheet.hairlineWidth, paddingTop: spacing.lg },
});
