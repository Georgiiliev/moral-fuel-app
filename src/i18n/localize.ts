import type { LanguageCode, LocalizedContent } from '@/models/content';

/** The one place localized content is resolved; falls back to Dutch (the default) when a translation is missing. */
export function localize<T>(content: LocalizedContent<T>, language: LanguageCode): T {
  return content[language] ?? content.nl;
}
