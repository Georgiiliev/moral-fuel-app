import type { ReactNode } from 'react';
import Animated, { FadeInDown, useReducedMotion } from 'react-native-reanimated';

import { useAppState } from '@/state/app-state';

/** True when either the device or the app setting asks for less motion. */
export function useReduceMotion() {
  const system = useReducedMotion();
  const app = useAppState().state.preferences.reduceMotion;
  return system || app;
}

/** A short, calm entrance; content simply appears when motion is reduced. */
export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReduceMotion();
  return (
    <Animated.View entering={reduce ? undefined : FadeInDown.duration(320).delay(delay)}>{children}</Animated.View>
  );
}
