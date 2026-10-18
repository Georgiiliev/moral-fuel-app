import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';

type Tone = 'surface' | 'muted' | 'primary' | 'outline';

export function Card({ tone = 'surface', children, style }: { tone?: Tone; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const look = {
    surface: { backgroundColor: colors.surface, borderColor: colors.border },
    muted: { backgroundColor: colors.surfaceMuted, borderColor: colors.surfaceMuted },
    primary: { backgroundColor: colors.primary, borderColor: colors.primary },
    outline: { backgroundColor: 'transparent', borderColor: colors.border },
  }[tone];
  return <View style={[styles.card, look, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, borderWidth: StyleSheet.hairlineWidth, padding: spacing.lg, gap: spacing.sm },
});
