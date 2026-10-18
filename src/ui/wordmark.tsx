import { StyleSheet, View } from 'react-native';

import { useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';

import { AppText } from './text';

/** MORAL FUEL set in spaced capitals with a short gold rule. */
export function Wordmark({ onPrimary }: { onPrimary?: boolean }) {
  const strings = useStrings();
  const { colors } = useTheme();
  return (
    <View style={styles.row} accessible accessibilityRole="header" accessibilityLabel="Moral Fuel">
      <View style={[styles.rule, { backgroundColor: colors.accent }]} />
      <AppText variant="overline" tone={onPrimary ? 'onPrimary' : 'default'} style={styles.text}>
        {strings.brand.name}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  rule: { width: 18, height: 2, borderRadius: 1 },
  text: { letterSpacing: 3 },
});
