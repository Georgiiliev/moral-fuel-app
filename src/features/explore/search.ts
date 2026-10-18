import { topicLabel, type DayView } from '@/content';
import type { LanguageCode, TopicId } from '@/models/content';

export interface SearchOptions {
  query: string;
  topic: TopicId | null;
  onlyAvailable: boolean;
  language: LanguageCode;
}

/** Lower case without accents, so "korintiers" finds "Korintiërs". */
export const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

/** Filters journey days in journey order; every word of the query must match somewhere. */
export function searchDays(days: DayView[], { query, topic, onlyAvailable, language }: SearchOptions): DayView[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return days.filter((day) => {
    if (onlyAvailable && !day.available) return false;
    if (topic && !day.topics.includes(topic)) return false;
    if (words.length === 0) return true;
    const haystack = normalize(
      [day.title, day.summary, day.objective, day.passage ?? '', ...day.topics.map((t) => topicLabel(t, language))].join(' '),
    );
    return words.every((word) => haystack.includes(word));
  });
}

/** Topics that occur on the journey, in a stable order. */
export function journeyTopics(days: DayView[]): TopicId[] {
  return [...new Set(days.flatMap((day) => day.topics))];
}
