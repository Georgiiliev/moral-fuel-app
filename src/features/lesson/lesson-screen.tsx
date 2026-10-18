import { getDayViews, getLesson } from '@/content';
import { useAppState } from '@/state/app-state';

import { LessonFlow } from './lesson-flow';
import { LessonUnavailable } from './lesson-unavailable';

/** Resolves the route id to a lesson that may be opened, or shows the unavailable state. */
export function LessonScreen({ id }: { id?: string }) {
  const { state } = useAppState();
  const lesson = id ? getLesson(id) : undefined;
  const day = lesson ? getDayViews(state.preferences.language).find((d) => d.lessonId === lesson.id) : undefined;
  if (!lesson || !day?.available) return <LessonUnavailable />;
  return <LessonFlow lesson={lesson} />;
}
