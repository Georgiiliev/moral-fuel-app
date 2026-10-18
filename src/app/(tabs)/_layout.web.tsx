import { TabList, TabSlot, TabTrigger, Tabs, type TabListProps, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStrings } from '@/state/app-state';
import { MAX_CONTENT_WIDTH, spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Icon, type IconName } from '@/ui/icon';
import { AppText } from '@/ui/text';

const TABS = [
  { name: 'index', href: '/', label: 'today', icon: 'today' },
  { name: 'journey', href: '/journey', label: 'journey', icon: 'journey' },
  { name: 'explore', href: '/explore', label: 'explore', icon: 'explore' },
  { name: 'journal', href: '/journal', label: 'journal', icon: 'journal' },
  { name: 'you', href: '/you', label: 'you', icon: 'you' },
] as const;

/** Native tabs have no proper web bar, so the web gets a quiet bottom bar of its own. */
export default function WebTabLayout() {
  const strings = useStrings();
  const { colors } = useTheme();
  return (
    // Our style replaces the Tabs root style, so it must keep flex: 1 for the bar to stay at the bottom.
    <Tabs style={{ flex: 1, backgroundColor: colors.background }}>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <TabBar>
          {TABS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton label={strings.tabs[tab.label]} icon={tab.icon} />
            </TabTrigger>
          ))}
        </TabBar>
      </TabList>
    </Tabs>
  );
}

/** TabList passes its own props through; a component child keeps expo-router's Slot happy. */
function TabBar({ children, ...props }: TabListProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      {...props}
      accessibilityRole="tablist"
      style={[styles.bar, { borderTopColor: colors.border, backgroundColor: colors.background, paddingBottom: insets.bottom }]}>
      <View style={styles.row}>{children}</View>
    </View>
  );
}

function TabButton({ label, icon, isFocused, ...props }: TabTriggerSlotProps & { label: string; icon: IconName }) {
  const { colors } = useTheme();
  const color = isFocused ? colors.primary : colors.textMuted;
  return (
    <Pressable
      {...(props as PressableProps)}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
      <Icon name={icon} size={22} color={color} />
      <AppText variant="caption" style={{ color, fontWeight: isFocused ? '600' : '400' }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: { flex: 1 },
  bar: { borderTopWidth: StyleSheet.hairlineWidth },
  row: { flexDirection: 'row', width: '100%', maxWidth: MAX_CONTENT_WIDTH, alignSelf: 'center' },
  tab: { flex: 1, alignItems: 'center', gap: 2, paddingVertical: spacing.xs, minHeight: 56, justifyContent: 'center' },
  pressed: { opacity: 0.7 },
});
