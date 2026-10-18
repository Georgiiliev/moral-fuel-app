import type { Journey } from '@/models/content';

/**
 * The 30-day journey. Every day now points at a written lesson; a future day can be added as
 * { availability: 'coming-soon', editorialState: 'PLANNED', ... } and screens show it honestly.
 */
export const JOURNEY: Journey = {
  id: 'first-30-days',
  version: '0.1.0',
  totalDays: 30,
  sections: [
    {
      id: 'week-1',
      order: 1,
      dayStart: 1,
      dayEnd: 7,
      text: {
        nl: {
          title: 'Fundamenten',
          description: 'Wie is God, wie is Jezus, en wat bedoelen christenen met genade en geloof?',
        },
      },
    },
    {
      id: 'week-2',
      order: 2,
      dayStart: 8,
      dayEnd: 14,
      text: {
        nl: {
          title: 'Geloof in het dagelijks leven',
          description: 'Liefde, geduld, eerlijkheid en dienen in gewone keuzes.',
        },
      },
    },
    {
      id: 'week-3',
      order: 3,
      dayStart: 15,
      dayEnd: 21,
      text: {
        nl: {
          title: 'Moeilijke momenten',
          description: 'Angst, boosheid, twijfel en verlies, eerlijk benoemd.',
        },
      },
    },
    {
      id: 'week-4',
      order: 4,
      dayStart: 22,
      dayEnd: 30,
      text: {
        nl: {
          title: 'Blijvende gewoontes',
          description: 'Bidden, lezen en gemeenschap, met een terugblik en een plan voor daarna.',
        },
      },
    },
  ],
  days: [
    { day: 1, sectionId: 'week-1', availability: 'available', lessonId: 'day-01-why-believe' },
    { day: 2, sectionId: 'week-1', availability: 'available', lessonId: 'day-02-who-is-jesus' },
    { day: 3, sectionId: 'week-1', availability: 'available', lessonId: 'day-03-the-gospel' },
    { day: 4, sectionId: 'week-1', availability: 'available', lessonId: 'day-04-grace-forgiveness' },
    { day: 5, sectionId: 'week-1', availability: 'available', lessonId: 'day-05-cross-resurrection' },
    { day: 6, sectionId: 'week-1', availability: 'available', lessonId: 'day-06-what-is-faith' },
    { day: 7, sectionId: 'week-1', availability: 'available', lessonId: 'day-07-first-steps' },
    { day: 8, sectionId: 'week-2', availability: 'available', lessonId: 'day-08-love-your-neighbour' },
    { day: 9, sectionId: 'week-2', availability: 'available', lessonId: 'day-09-practising-patience' },
    { day: 10, sectionId: 'week-2', availability: 'available', lessonId: 'day-10-forgiveness-boundaries' },
    { day: 11, sectionId: 'week-2', availability: 'available', lessonId: 'day-11-gratitude' },
    { day: 12, sectionId: 'week-2', availability: 'available', lessonId: 'day-12-honesty-integrity' },
    { day: 13, sectionId: 'week-2', availability: 'available', lessonId: 'day-13-humility-serving' },
    { day: 14, sectionId: 'week-2', availability: 'available', lessonId: 'day-14-review-daily-choices' },
    { day: 15, sectionId: 'week-3', availability: 'available', lessonId: 'day-15-worry-anxiety' },
    { day: 16, sectionId: 'week-3', availability: 'available', lessonId: 'day-16-anger' },
    { day: 17, sectionId: 'week-3', availability: 'available', lessonId: 'day-17-doubt-questions' },
    { day: 18, sectionId: 'week-3', availability: 'available', lessonId: 'day-18-grief-loss' },
    { day: 19, sectionId: 'week-3', availability: 'available', lessonId: 'day-19-temptation-self-control' },
    { day: 20, sectionId: 'week-3', availability: 'available', lessonId: 'day-20-hope-perseverance' },
    { day: 21, sectionId: 'week-3', availability: 'available', lessonId: 'day-21-looking-back-hard-moments' },
    { day: 22, sectionId: 'week-4', availability: 'available', lessonId: 'day-22-learning-to-pray' },
    { day: 23, sectionId: 'week-4', availability: 'available', lessonId: 'day-23-reading-the-bible' },
    { day: 24, sectionId: 'week-4', availability: 'available', lessonId: 'day-24-relationships-reconciliation' },
    { day: 25, sectionId: 'week-4', availability: 'available', lessonId: 'day-25-responsible-with-money' },
    { day: 26, sectionId: 'week-4', availability: 'available', lessonId: 'day-26-helping-others' },
    { day: 27, sectionId: 'week-4', availability: 'available', lessonId: 'day-27-faith-and-community' },
    { day: 28, sectionId: 'week-4', availability: 'available', lessonId: 'day-28-taking-the-next-step' },
    { day: 29, sectionId: 'week-4', availability: 'available', lessonId: 'day-29-looking-back-at-your-growth' },
    { day: 30, sectionId: 'week-4', availability: 'available', lessonId: 'day-30-the-next-thirty-days' },
  ],
};
