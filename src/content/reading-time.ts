import type { LessonText } from '@/models/content';

const WORDS_PER_MINUTE = 180;

/** Every word a reader meets in a lesson, in reading order. */
export function lessonProse(text: LessonText): string {
  const [learn, reflect, live] = text.steps;
  return [
    text.title, text.summary, learn.bigIdea, learn.passageSummary, learn.context, ...learn.explanation,
    learn.example, learn.traditionNote ?? '', learn.careNote ?? '', reflect.prompt.question,
    reflect.prompt.hint ?? '', live.action.title, live.action.description, live.prayer ?? '',
  ].join(' ');
}

/** Reading time in whole minutes at a calm pace; the value stored on each lesson must match it. */
export function estimateReadingMinutes(text: LessonText): number {
  return Math.max(3, Math.round(lessonProse(text).split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));
}
