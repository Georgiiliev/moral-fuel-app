import type { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * app.json holds the configuration. One switch: MORAL_FUEL_WIDGETS=off builds the app without the
 * widget extension and its App Group, for signing with a free Apple ID (Apple refuses App Groups for
 * free teams). Every other build, including EAS, keeps the widgets.
 */
export default ({ config }: ConfigContext): ExpoConfig => {
  const withoutWidgets = process.env.MORAL_FUEL_WIDGETS === 'off';
  if (!withoutWidgets) return config as ExpoConfig;
  return {
    ...(config as ExpoConfig),
    plugins: (config.plugins ?? []).filter((plugin) => (Array.isArray(plugin) ? plugin[0] : plugin) !== 'expo-widgets'),
  };
};
