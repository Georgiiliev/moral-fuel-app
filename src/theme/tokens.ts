import type { TextStyle } from 'react-native';

/** Brand palette. Screens use the semantic colors below, never these directly. */
export const palette = {
  ivory: '#F7F4ED',
  forest: '#244737',
  sage: '#A6B9A7',
  gold: '#D5AE6B',
  charcoal: '#222725',
  white: '#FFFFFF',
} as const;

export interface ColorTokens {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  onPrimary: string;
  onPrimaryMuted: string;
  accent: string;
  accentText: string;
  sage: string;
  sageSoft: string;
  danger: string;
  focus: string;
}

export const lightColors: ColorTokens = {
  background: palette.ivory,
  surface: palette.white,
  surfaceMuted: '#EFEADF',
  border: '#E2DCCF',
  text: palette.charcoal,
  textMuted: '#59615C',
  primary: palette.forest,
  onPrimary: palette.white,
  onPrimaryMuted: '#C9D6CA',
  accent: palette.gold,
  accentText: '#85601E',
  sage: palette.sage,
  sageSoft: '#E1E8DF',
  danger: '#A23B2A',
  focus: palette.gold,
};

export const darkColors: ColorTokens = {
  background: '#121815',
  surface: '#1A221E',
  surfaceMuted: '#222C27',
  border: '#2E3A34',
  text: '#F1EDE4',
  textMuted: '#AEB8B1',
  primary: '#B9CBBA',
  onPrimary: '#13201A',
  onPrimaryMuted: '#3D5446',
  accent: palette.gold,
  accentText: '#E0C38F',
  sage: palette.sage,
  sageSoft: '#26322C',
  danger: '#E8907E',
  focus: palette.gold,
};

export const spacing = { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radius = { sm: 10, md: 16, lg: 24, pill: 999 } as const;

/** Readable column width on tablets and the web. */
export const MAX_CONTENT_WIDTH = 640;

export const fonts = {
  serif: 'Newsreader_500Medium',
  serifRegular: 'Newsreader_400Regular',
  serifItalic: 'Newsreader_400Regular_Italic',
} as const;

export type TextVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'quote'
  | 'scripture'
  | 'body'
  | 'bodyStrong'
  | 'small'
  | 'caption'
  | 'overline';

export const typography: Record<TextVariant, TextStyle> = {
  display: { fontFamily: fonts.serif, fontSize: 34, lineHeight: 40, letterSpacing: -0.4 },
  title: { fontFamily: fonts.serif, fontSize: 27, lineHeight: 33, letterSpacing: -0.2 },
  heading: { fontFamily: fonts.serif, fontSize: 21, lineHeight: 27 },
  quote: { fontFamily: fonts.serifItalic, fontSize: 21, lineHeight: 30 },
  scripture: { fontFamily: fonts.serif, fontSize: 19, lineHeight: 31 },
  body: { fontSize: 17, lineHeight: 26 },
  bodyStrong: { fontSize: 17, lineHeight: 26, fontWeight: '600' },
  small: { fontSize: 15, lineHeight: 22 },
  caption: { fontSize: 13, lineHeight: 18 },
  overline: { fontSize: 12, lineHeight: 16, fontWeight: '600', letterSpacing: 1.4, textTransform: 'uppercase' },
};
