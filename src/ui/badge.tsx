import { StyleSheet, View } from 'react-native';

import { radius, spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';

import { Icon, type IconName } from './icon';
import { AppText } from './text';

type Tone = 'done' | 'active' | 'neutral' | 'soon';

export function Badge({ label, tone, icon }: { label: string; tone: Tone; icon?: IconName }) {
  const { colors } = useTheme();
  const look = {
    done: { bg: colors.sageSoft, fg: colors.primary },
    active: { bg: colors.primary, fg: colors.onPrimary },
    neutral: { bg: colors.surfaceMuted, fg: colors.text },
    soon: { bg: 'transparent', fg: colors.textMuted },
  }[tone];
  return (
    <View style={[styles.badge, { backgroundColor: look.bg, borderColor: tone === 'soon' ? colors.border : look.bg }]}>
      {icon ? <Icon name={icon} size={12} color={look.fg} /> : null}
      <AppText variant="caption" style={{ color: look.fg, fontWeight: '600' }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xxs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
});
