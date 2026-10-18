import type { LanguageCode } from '@/models/content';

const LOCALES: Record<LanguageCode, string> = { nl: 'nl-NL', en: 'en-GB' };

/** "vrijdag 17 oktober 2026" */
export function formatDay(iso: string, language: LanguageCode): string {
  return new Date(iso).toLocaleDateString(LOCALES[language], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/** "17 okt 2026, 21:04" */
export function formatDateTime(iso: string, language: LanguageCode): string {
  return new Date(iso).toLocaleString(LOCALES[language], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** "21:04" */
export function formatTime(iso: string, language: LanguageCode): string {
  return new Date(iso).toLocaleTimeString(LOCALES[language], { hour: '2-digit', minute: '2-digit' });
}

/** "08:05" */
export const formatClock = (hour: number, minute: number) =>
  `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
