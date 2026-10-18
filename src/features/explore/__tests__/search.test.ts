import { getDayViews } from '@/content';
import { journeyTopics, normalize, searchDays } from '@/features/explore/search';
import { plannedDay } from '@/test-utils/test-store';

const days = getDayViews('nl');
const search = (query: string, extra: Partial<Parameters<typeof searchDays>[1]> = {}) =>
  searchDays(days, { query, topic: null, onlyAvailable: false, language: 'nl', ...extra });

describe('searchDays', () => {
  it('returns every day in journey order without a query or filter', () => {
    expect(search('').map((d) => d.day)).toEqual(days.map((d) => d.day));
  });

  it('ignores case and accents', () => {
    expect(normalize('Korintiërs')).toBe('korintiers');
    expect(search('korintiers').map((d) => d.day)).toContain(3);
    expect(search('GENADE').some((d) => d.day === 4)).toBe(true);
  });

  it('matches the passage reference and topic labels', () => {
    expect(search('lucas 15').map((d) => d.day)).toEqual([4]);
    expect(search('dankbaarheid').map((d) => d.day)).toContain(11);
  });

  it('requires every word of the query', () => {
    const both = search('vergeving grenzen');
    expect(both.length).toBeGreaterThan(0);
    expect(both.every((d) => /vergev/i.test(d.title + d.summary + d.objective))).toBe(true);
  });

  it('filters by topic', () => {
    const forgiveness = search('', { topic: 'forgiveness' });
    expect(forgiveness.length).toBeGreaterThan(1);
    expect(forgiveness.every((d) => d.topics.includes('forgiveness'))).toBe(true);
    expect(forgiveness.map((d) => d.day)).toEqual(expect.arrayContaining([4, 10]));
  });

  it('finds planned days but keeps them unavailable, and can hide them', () => {
    const withPlanned = [...days, plannedDay];
    const options = { query: 'geplande', topic: null, onlyAvailable: false, language: 'nl' as const };
    expect(searchDays(withPlanned, options)).toEqual([plannedDay]);
    expect(searchDays(withPlanned, { ...options, onlyAvailable: true })).toEqual([]);
  });

  it('returns nothing for a query that matches nothing', () => {
    expect(search('quantumfysica')).toEqual([]);
  });

  it('lists each journey topic once', () => {
    const topics = journeyTopics(days);
    expect(new Set(topics).size).toBe(topics.length);
    expect(topics).toEqual(expect.arrayContaining(['faith-basics', 'money', 'community']));
  });
});
