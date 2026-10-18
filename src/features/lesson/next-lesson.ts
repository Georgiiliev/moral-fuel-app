import type { DayView } from '@/content';
import { isCompleted } from '@/features/progress/progress';
import type { ProgressMap } from '@/models/user';

/** The next lesson to offer after finishing one: the following open day, else any open day left. */
export function findNextLesson(days: DayView[], progress: ProgressMap, currentLessonId: string): DayView | null {
  const current = days.find((d) => d.lessonId === currentLessonId);
  const open = days.filter((d) => d.available && d.lessonId !== currentLessonId && !isCompleted(progress, d.lessonId));
  return open.find((d) => !current || d.day > current.day) ?? open[0] ?? null;
}
