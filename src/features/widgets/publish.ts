import type { WidgetBundle } from './widget-data';

/** Home Screen widgets are an iOS feature; Android and the web keep working without them. */
export const widgetsSupported = false;

export function publishWidgetBundle(_bundle: WidgetBundle): void {}
