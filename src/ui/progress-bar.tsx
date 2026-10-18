import { StyleSheet, View } from 'react-native';

import { radius } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';

export function ProgressBar({ value, max, label, onPrimary }: { value: number; max: number; label: string; onPrimary?: boolean }) {
  const { colors } = useTheme();
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max, now: value }}
      style={[styles.track, { backgroundColor: onPrimary ? colors.onPrimaryMuted : colors.sageSoft }]}>
      <View
        style={[
          styles.fill,
          { width: `${ratio * 100}%`, backgroundColor: onPrimary ? colors.accent : colors.primary },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill },
});
