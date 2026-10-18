import { localize } from '@/i18n/localize';
import type {
  BibleReference,
  JourneyDay,
  LanguageCode,
  Lesson,
  LessonText,
  TopicId,
} from '@/models/content';

import { JOURNEY } from './journey';
import { day01 } from './lessons/day-01';
import { day02 } from './lessons/day-02';
import { day03 } from './lessons/day-03';
import { day04 } from './lessons/day-04';
import { day05 } from './lessons/day-05';
import { day06 } from './lessons/day-06';
import { day07 } from './lessons/day-07';
import { day08 } from './lessons/day-08';
import { day09 } from './lessons/day-09';
import { day10 } from './lessons/day-10';
import { day11 } from './lessons/day-11';
import { day12 } from './lessons/day-12';
import { day13 } from './lessons/day-13';
import { day14 } from './lessons/day-14';
import { day15 } from './lessons/day-15';
import { day16 } from './lessons/day-16';
import { day17 } from './lessons/day-17';
import { day18 } from './lessons/day-18';
import { day19 } from './lessons/day-19';
import { day20 } from './lessons/day-20';
import { day21 } from './lessons/day-21';
import { day22 } from './lessons/day-22';
import { day23 } from './lessons/day-23';
import { day24 } from './lessons/day-24';
import { day25 } from './lessons/day-25';
import { day26 } from './lessons/day-26';
import { day27 } from './lessons/day-27';
import { day28 } from './lessons/day-28';
import { day29 } from './lessons/day-29';
import { day30 } from './lessons/day-30';
import { BIBLE_BOOK_NAMES, TOPIC_LABELS } from './taxonomy';

export { JOURNEY };

export const LESSONS: readonly Lesson[] = [
  day01, day02, day03, day04, day05, day06, day07, day08, day09, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30,
];

const lessonsById = new Map(LESSONS.map((lesson) => [lesson.id, lesson]));

export function getLesson(id: string): Lesson | undefined {
  return lessonsById.get(id);
}

export function getLessonText(lesson: Lesson, language: LanguageCode): LessonText {
  return localize(lesson.text, language);
}

export function topicLabel(topic: TopicId, language: LanguageCode): string {
  return localize(TOPIC_LABELS[topic], language);
}

/** Formats a reference such as "Lucas 15:11–32", or "Psalmen 23" for a whole chapter. */
export function formatReference(ref: BibleReference, language: LanguageCode): string {
  const book = localize(BIBLE_BOOK_NAMES[ref.book], language);
  if (ref.verseStart === undefined) return `${book} ${ref.chapter}`;
  const verses = ref.verseEnd ? `${ref.verseStart}–${ref.verseEnd}` : `${ref.verseStart}`;
  return `${book} ${ref.chapter}:${verses}`;
}

/** One journey day as every screen sees it, whether it has a written lesson or is still planned. */
export interface DayView {
  day: number;
  sectionId: string;
  available: boolean;
  lessonId?: string;
  title: string;
  summary: string;
  objective: string;
  topics: TopicId[];
  readingMinutes?: number;
  passage?: string;
}

function toDayView(day: JourneyDay, language: LanguageCode): DayView {
  if (day.availability === 'coming-soon') {
    const text = localize(day.text, language);
    return { day: day.day, sectionId: day.sectionId, available: false, topics: day.topics, ...text };
  }
  const lesson = lessonsById.get(day.lessonId);
  if (!lesson) {
    // The validator rejects this; never send the user into a broken lesson.
    return { day: day.day, sectionId: day.sectionId, available: false, title: '', summary: '', objective: '', topics: [] };
  }
  const text = getLessonText(lesson, language);
  return {
    day: day.day,
    sectionId: day.sectionId,
    available: true,
    lessonId: lesson.id,
    title: text.title,
    summary: text.summary,
    objective: text.objective,
    topics: lesson.topics,
    readingMinutes: lesson.readingMinutes,
    passage: formatReference(lesson.passage, language),
  };
}

const dayViewCache = new Map<LanguageCode, DayView[]>();

export function getDayViews(language: LanguageCode): DayView[] {
  let views = dayViewCache.get(language);
  if (!views) {
    views = JOURNEY.days.map((day) => toDayView(day, language));
    dayViewCache.set(language, views);
  }
  return views;
}

export function getSections(language: LanguageCode) {
  return JOURNEY.sections.map((section) => ({ ...section, ...localize(section.text, language) }));
}
