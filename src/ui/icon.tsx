import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';

import { useTheme } from '@/theme/use-theme';

/** SF Symbols on iOS, Material Symbols on Android and the web. */
export const ICONS = {
  today: { ios: 'sun.horizon', android: 'wb_twilight', web: 'wb_twilight' },
  journey: { ios: 'map', android: 'map', web: 'map' },
  explore: { ios: 'safari', android: 'explore', web: 'explore' },
  you: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  checkCircle: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  circle: { ios: 'circle', android: 'radio_button_unchecked', web: 'radio_button_unchecked' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  chevronLeft: { ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' },
  chevronDown: { ios: 'chevron.down', android: 'expand_more', web: 'expand_more' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  book: { ios: 'book', android: 'menu_book', web: 'menu_book' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  bell: { ios: 'bell', android: 'notifications', web: 'notifications' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  clear: { ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' },
  lightbulb: { ios: 'lightbulb', android: 'lightbulb', web: 'lightbulb' },
  walk: { ios: 'figure.walk', android: 'directions_walk', web: 'directions_walk' },
  leaf: { ios: 'leaf', android: 'eco', web: 'eco' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  info: { ios: 'info.circle', android: 'info', web: 'info' },
  restart: { ios: 'arrow.counterclockwise', android: 'restart_alt', web: 'restart_alt' },
  trash: { ios: 'trash', android: 'delete', web: 'delete' },
  globe: { ios: 'globe', android: 'language', web: 'language' },
  textSize: { ios: 'textformat.size', android: 'format_size', web: 'format_size' },
  motion: { ios: 'figure.walk.motion', android: 'animation', web: 'animation' },
  heart: { ios: 'heart', android: 'favorite', web: 'favorite' },
  journal: { ios: 'book.closed', android: 'edit_note', web: 'edit_note' },
  pencil: { ios: 'square.and.pencil', android: 'edit', web: 'edit' },
  share: { ios: 'square.and.arrow.up', android: 'share', web: 'share' },
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 20, color }: { name: IconName; size?: number; color?: ColorValue }) {
  const { colors } = useTheme();
  // Decorative: the surrounding control carries the accessible label.
  return (
    <SymbolView
      name={ICONS[name]}
      size={size}
      tintColor={color ?? colors.text}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}
