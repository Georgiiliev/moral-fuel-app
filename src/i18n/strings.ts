import type { LanguageCode, LocalizedContent } from '@/models/content';

import { localize } from './localize';
import { nl, type Strings } from './nl';

/** Interface text per language. English is planned: add `en` here once it is written. */
const STRINGS: LocalizedContent<Strings> = { nl };

export function stringsFor(language: LanguageCode): Strings {
  return localize(STRINGS, language);
}

export type { Strings };
