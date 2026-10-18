import type { ComponentRef, ReactNode, Ref } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';

import { MAX_CONTENT_WIDTH, spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';

/** The iOS 26 tab bar floats over the content; the last item must still scroll clear of it. */
const IOS_TAB_BAR_CLEARANCE = 64;

interface ScreenProps {
  children: ReactNode;
  /** Pinned below the scrolling content, e.g. lesson navigation. */
  footer?: ReactNode;
  edges?: Edge[];
  /** A tab screen: leaves room for the floating tab bar on iOS. */
  inTabs?: boolean;
  /** Lets a screen scroll its page, e.g. back to the top when a lesson step changes. */
  scrollRef?: Ref<ComponentRef<typeof ScrollView>>;
  /** Lifts the page and footer above the keyboard, for screens with a text field. */
  avoidKeyboard?: boolean;
}

/**
 * Safe-area aware, scrolling page with a readable centred column. Insets come from the root
 * provider rather than a native SafeAreaView, which reports no top inset inside full-screen modals.
 */
export function Screen({ children, footer, edges = ['top', 'left', 'right'], inTabs, scrollRef, avoidKeyboard }: ScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const inset = (edge: Edge) => (edges.includes(edge) ? insets[edge] : 0);
  const bottomExtra = inTabs && Platform.OS === 'ios' ? insets.bottom + IOS_TAB_BAR_CLEARANCE : 0;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.background,
          paddingTop: inset('top'),
          paddingLeft: inset('left'),
          paddingRight: inset('right'),
          paddingBottom: inset('bottom'),
        },
      ]}>
      <KeyboardAvoidingView
        enabled={!!avoidKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.clip}>
        <ScrollView
          ref={scrollRef}
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={[styles.scroll, { paddingBottom: spacing.xxl + bottomExtra }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          <View style={styles.column}>{children}</View>
        </ScrollView>
        {footer ? <View style={[styles.column, styles.footer]}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  // Scrolled content stops at the safe-area edge instead of sliding under the status bar.
  clip: { flex: 1, overflow: 'hidden' },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  column: { width: '100%', maxWidth: MAX_CONTENT_WIDTH, alignSelf: 'center', gap: spacing.lg },
  footer: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md, gap: spacing.sm },
});
