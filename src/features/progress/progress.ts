import type { DayView } from '@/content';
import type { InterestId, LessonProgress, ProgressMap } from '@/models/user';

export const LESSON_STEP_COUNT = 3;

const clampStep = (step: number) => Math.min(Math.max(Math.trunc(step), 0), LESSON_STEP_COUNT - 1);

/** Opening a lesson marks it in progress the first time; a completed lesson stays completed. */
export function openLesson(progress: ProgressMap, lessonId: string, now: string): ProgressMap {
  if (progress[lessonId]) return progress;
  return {
    ...progress,
    [lessonId]: { lessonId, status: 'in-progress', stepIndex: 0, startedAt: now, updatedAt: now },
  };
}

/** Remembers where an unfinished lesson was left, so it can be resumed. */
export function setLessonStep(
  progress: ProgressMap,
  lessonId: string,
  stepIndex: number,
  now: string,
): ProgressMap {
  const entry = progress[lessonId];
  if (!entry || entry.status === 'completed') return progress;
  return { ...progress, [lessonId]: { ...entry, stepIndex: clampStep(stepIndex), updatedAt: now } };
}

/**
 * Records that the user worked through the lesson in the app. It is a learning event only:
 * nothing about prayer, reflection text or spiritual state is required or inferred.
 */
export function completeLesson(progress: ProgressMap, lessonId: string, now: string): ProgressMap {
  const entry = progress[lessonId];
  return {
    ...progress,
    [lessonId]: {
      lessonId,
      status: 'completed',
      stepIndex: LESSON_STEP_COUNT - 1,
      startedAt: entry?.startedAt ?? now,
      updatedAt: now,
      completedAt: entry?.completedAt ?? now,
    },
  };
}

export const isCompleted = (progress: ProgressMap, lessonId?: string) =>
  !!lessonId && progress[lessonId]?.status === 'completed';

export type DayStatus = 'completed' | 'in-progress' | 'available' | 'coming-soon';

export function dayStatus(day: DayView, progress: ProgressMap): DayStatus {
  if (!day.available || !day.lessonId) return 'coming-soon';
  return progress[day.lessonId]?.status ?? 'available';
}

export interface JourneyPosition {
  /** The lesson to show on Today: the latest unfinished one, else the first not yet completed. */
  current: DayView | null;
  currentProgress: LessonProgress | null;
  /** First planned day once every available lesson is done. */
  nextPlanned: DayView | null;
  completedCount: number;
  availableCount: number;
  totalDays: number;
}

export function getJourneyPosition(days: DayView[], progress: ProgressMap): JourneyPosition {
  const available = days.filter((d) => d.available);
  const inProgress = available
    .map((d) => ({ day: d, entry: progress[d.lessonId!] }))
    .filter((x) => x.entry?.status === 'in-progress')
    .sort((a, b) => b.entry!.updatedAt.localeCompare(a.entry!.updatedAt))[0];
  const current = inProgress?.day ?? available.find((d) => !isCompleted(progress, d.lessonId)) ?? null;
  return {
    current,
    currentProgress: current ? (progress[current.lessonId!] ?? null) : null,
    nextPlanned: current ? null : (days.find((d) => !d.available) ?? null),
    completedCount: available.filter((d) => isCompleted(progress, d.lessonId)).length,
    availableCount: available.length,
    totalDays: days.length,
  };
}

/** Days that match the user's interest: lessons they can open now first, then planned ones. */
export function daysForInterest(days: DayView[], interest: InterestId | null): DayView[] {
  if (!interest) return [];
  const matching = days.filter((d) => d.topics.includes(interest));
  return [...matching.filter((d) => d.available), ...matching.filter((d) => !d.available)];
}
