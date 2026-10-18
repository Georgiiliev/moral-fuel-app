import { useColorScheme } from 'react-native';

import { darkColors, lightColors } from './tokens';

export function useTheme() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return { scheme, colors: scheme === 'dark' ? darkColors : lightColors } as const;
}
