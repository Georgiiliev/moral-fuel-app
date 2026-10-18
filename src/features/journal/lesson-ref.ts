import { getLesson, getLessonText } from '@/content';
import type { LanguageCode } from '@/models/content';

/** The day and title of the lesson a journal entry belongs to, if that lesson still exists. */
export function lessonRef(lessonId: string | undefined, language: LanguageCode) {
  const lesson = lessonId ? getLesson(lessonId) : undefined;
  return lesson ? { id: lesson.id, day: lesson.day, title: getLessonText(lesson, language).title } : undefined;
}
