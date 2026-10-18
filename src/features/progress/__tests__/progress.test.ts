import { getDayViews } from '@/content';
import {
  completeLesson,
  daysForInterest,
  getJourneyPosition,
  isCompleted,
  openLesson,
  setLessonStep,
} from '@/features/progress/progress';
import type { ProgressMap } from '@/models/user';
import { plannedDay } from '@/test-utils/test-store';

const days = getDayViews('nl');
const T1 = '2026-10-01T08:00:00.000Z';
const T2 = '2026-10-02T08:00:00.000Z';
const T3 = '2026-10-03T08:00:00.000Z';
const lessonId = (day: number) => days[day - 1].lessonId!;

describe('lesson progress', () => {
  it('opening a lesson marks it in progress at step 0, once', () => {
    const opened = openLesson({}, lessonId(1), T1);
    expect(opened[lessonId(1)]).toMatchObject({ status: 'in-progress', stepIndex: 0, startedAt: T1 });
    expect(openLesson(opened, lessonId(1), T2)).toBe(opened);
  });

  it('remembers the step and clamps it to the three steps', () => {
    let progress = openLesson({}, lessonId(2), T1);
    progress = setLessonStep(progress, lessonId(2), 2, T2);
    expect(progress[lessonId(2)]).toMatchObject({ stepIndex: 2, updatedAt: T2 });
    expect(setLessonStep(progress, lessonId(2), 9, T2)[lessonId(2)].stepIndex).toBe(2);
    expect(setLessonStep(progress, lessonId(2), -3, T2)[lessonId(2)].stepIndex).toBe(0);
  });

  it('ignores steps for lessons that were never opened', () => {
    expect(setLessonStep({}, lessonId(3), 1, T1)).toEqual({});
  });

  it('completes a lesson without requiring anything else, and keeps the first completion date', () => {
    let progress = completeLesson(openLesson({}, lessonId(1), T1), lessonId(1), T2);
    expect(progress[lessonId(1)]).toMatchObject({ status: 'completed', startedAt: T1, completedAt: T2 });
    progress = completeLesson(progress, lessonId(1), T3);
    expect(progress[lessonId(1)].completedAt).toBe(T2);
    expect(isCompleted(progress, lessonId(1))).toBe(true);
  });

  it('does not reset a completed lesson when it is reviewed', () => {
    const done = completeLesson({}, lessonId(4), T1);
    expect(openLesson(done, lessonId(4), T2)).toBe(done);
    expect(setLessonStep(done, lessonId(4), 0, T2)).toBe(done);
  });
});

describe('getJourneyPosition', () => {
  it('starts at day 1 with nothing done', () => {
    const position = getJourneyPosition(days, {});
    expect(position).toMatchObject({ completedCount: 0, availableCount: 30, totalDays: 30, nextPlanned: null });
    expect(position.current?.day).toBe(1);
  });

  it('moves to the first uncompleted lesson, without requiring calendar order', () => {
    let progress: ProgressMap = completeLesson({}, lessonId(1), T1);
    progress = completeLesson(progress, lessonId(3), T2);
    const position = getJourneyPosition(days, progress);
    expect(position.current?.day).toBe(2);
    expect(position.completedCount).toBe(2);
  });

  it('prefers the most recently touched unfinished lesson', () => {
    let progress = setLessonStep(openLesson({}, lessonId(5), T1), lessonId(5), 1, T1);
    progress = openLesson(progress, lessonId(2), T2);
    const position = getJourneyPosition(days, progress);
    expect(position.current?.day).toBe(2);
    expect(position.currentProgress?.status).toBe('in-progress');
  });

  it('has nothing left once every lesson is done', () => {
    const progress = days.reduce<ProgressMap>((acc, d) => completeLesson(acc, d.lessonId!, T1), {});
    expect(getJourneyPosition(days, progress)).toMatchObject({ current: null, nextPlanned: null, completedCount: 30 });
  });

  it('points at the first planned day once every written lesson is done', () => {
    const progress = days.reduce<ProgressMap>((acc, d) => completeLesson(acc, d.lessonId!, T1), {});
    const position = getJourneyPosition([...days, plannedDay], progress);
    expect(position.current).toBeNull();
    expect(position.nextPlanned?.day).toBe(31);
  });
});

describe('daysForInterest', () => {
  it('returns nothing without an interest', () => {
    expect(daysForInterest(days, null)).toEqual([]);
  });

  it('lists available lessons before planned ones', () => {
    const result = daysForInterest([plannedDay, ...days], 'forgiveness');
    expect(result.length).toBeGreaterThan(1);
    expect(result.every((d) => d.topics.includes('forgiveness'))).toBe(true);
    expect(result[result.length - 1]).toBe(plannedDay);
    expect(result.slice(0, -1).every((d) => d.available)).toBe(true);
  });

  it('includes lessons for every onboarding interest', () => {
    for (const interest of ['faith-basics', 'habits', 'prayer', 'relationships', 'forgiveness', 'patience', 'trust'] as const) {
      expect(daysForInterest(days, interest).some((d) => d.available)).toBe(true);
    }
  });
});
