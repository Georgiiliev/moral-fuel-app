import { requireOptionalNativeModule } from 'expo';

import type { WidgetBundle } from './widget-data';

/**
 * False in a build without the widget extension (MORAL_FUEL_WIDGETS=off, see app.config.ts) and in
 * Expo Go: the widget modules are then never loaded, so the app cannot crash on them.
 */
export const widgetsSupported = requireOptionalNativeModule('ExpoWidgets') != null;

/* eslint-disable @typescript-eslint/no-require-imports -- loaded lazily, only when the native module exists */
const widgets = () => ({
  DailyInspiration: require('@/widgets/daily-inspiration').default as typeof import('@/widgets/daily-inspiration').default,
  Dashboard: require('@/widgets/dashboard').default as typeof import('@/widgets/dashboard').default,
  JourneyProgress: require('@/widgets/journey-progress').default as typeof import('@/widgets/journey-progress').default,
  LockScreen: require('@/widgets/lock-screen').default as typeof import('@/widgets/lock-screen').default,
  TodayAction: require('@/widgets/today-action').default as typeof import('@/widgets/today-action').default,
});
/* eslint-enable @typescript-eslint/no-require-imports */

/**
 * Hands the bundle to WidgetKit: date-driven widgets get a 30-day timeline (they keep rotating with
 * the app closed), progress and action widgets a snapshot. Each widget is published on its own, so
 * one failure cannot hold back the others; failures are reported together by widget name.
 */
export function publishWidgetBundle(bundle: WidgetBundle): void {
  const { DailyInspiration, Dashboard, JourneyProgress, LockScreen, TodayAction } = widgets();
  const steps: [string, () => void][] = [
    ['DailyInspiration', () => DailyInspiration.updateTimeline(bundle.daily)],
    ['Dashboard', () => Dashboard.updateTimeline(bundle.dashboard)],
    ['LockScreen', () => LockScreen.updateTimeline(bundle.lockScreen)],
    ['JourneyProgress', () => JourneyProgress.updateSnapshot(bundle.progress)],
    ['TodayAction', () => TodayAction.updateSnapshot(bundle.action)],
  ];
  const failures: string[] = [];
  for (const [name, publish] of steps) {
    try {
      publish();
    } catch (error) {
      failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  if (failures.length > 0) throw new Error(failures.join('; '));
}
