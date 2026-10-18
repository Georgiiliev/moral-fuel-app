import { getDayViews } from '@/content';
import { INSPIRATIONS, INSPIRATION_THEMES } from '@/content/inspirations';
import { completeLesson } from '@/features/progress/progress';
import {
  TIMELINE_DAYS,
  buildWidgetBundle,
  inspirationFor,
  links,
  localDayNumber,
  startOfLocalDay,
  validateInspirations,
} from '@/features/widgets/widget-data';
import { stringsFor } from '@/i18n/strings';
import { BIBLE_BOOKS } from '@/models/content';
import type { AppState } from '@/models/user';
import { createDefaultState } from '@/storage/app-state-codec';

const strings = stringsFor('nl');
const days = getDayViews('nl');
const T = '2026-10-01T08:00:00.000Z';
const onboarded = (patch: Partial<AppState> = {}): AppState => ({ ...createDefaultState(), onboardingCompleted: true, ...patch });
// npm test runs with TZ=Europe/Amsterdam, so local dates below are Amsterdam dates.

describe('inspiration content', () => {
  it('has at least 30 sound entries with attribution, license, review state and a real reference', () => {
    expect(INSPIRATIONS.length).toBeGreaterThanOrEqual(30);
    expect(validateInspirations()).toEqual([]);
    for (const item of INSPIRATIONS) {
      expect(BIBLE_BOOKS).toContain(item.reference.book);
      expect(item.language).toBe('nl');
      expect(item.source.attribution).toBeTruthy();
      expect(item.review.state).toBe('EDITORIAL_DRAFT');
    }
  });

  it('never presents a paraphrase as a quotation', () => {
    expect(INSPIRATIONS.every((item) => item.contentType === 'paraphrase' && item.source.license === 'original-work')).toBe(true);
  });

  it('rejects a quotation without a named translation and license', () => {
    const bad = { ...INSPIRATIONS[0], contentType: 'quotation' as const };
    expect(validateInspirations([bad])).toContain(`${bad.id}: a quotation must name its translation and license`);
  });

  it('gives every theme at least four entries', () => {
    for (const theme of INSPIRATION_THEMES) {
      expect(INSPIRATIONS.filter((item) => item.theme === theme).length).toBeGreaterThanOrEqual(4);
    }
  });
});

describe('daily selection', () => {
  it('keeps one inspiration for the whole local day and changes at midnight', () => {
    {
      const morning = localDayNumber(new Date(2026, 9, 18, 0, 0, 1));
      const night = localDayNumber(new Date(2026, 9, 18, 23, 59, 59));
      const next = localDayNumber(new Date(2026, 9, 19, 0, 0, 0));
      expect(morning).toBe(night);
      expect(next).toBe(morning + 1);
      expect(inspirationFor(morning, 'all').id).not.toBe(inspirationFor(next, 'all').id);
    }
  });

  it('uses the local calendar day, so the same moment can be a different day elsewhere', () => {
    const instant = new Date('2026-10-18T22:30:00.000Z');
    const amsterdam = localDayNumber(instant, 'Europe/Amsterdam'); // 19 Oct, 00:30
    const newYork = localDayNumber(instant, 'America/New_York'); // 18 Oct, 18:30
    expect(localDayNumber(instant)).toBe(amsterdam);
    expect(amsterdam).toBe(newYork + 1);
  });

  it('builds local midnights across a daylight-saving change', () => {
    const sunday = startOfLocalDay(new Date(2026, 2, 28, 15), 1); // clocks go forward that night
    expect([sunday.getDate(), sunday.getHours(), sunday.getMinutes()]).toEqual([29, 0, 0]);
  });

  it('rotates through a whole theme without repeats before the cycle ends', () => {
    const pool = INSPIRATIONS.filter((item) => item.theme === 'hope');
    const ids = Array.from({ length: pool.length }, (_, i) => inspirationFor(1000 + i, 'hope').id);
    expect(new Set(ids).size).toBe(pool.length);
    expect(ids.every((id) => pool.some((item) => item.id === id))).toBe(true);
  });
});

describe('buildWidgetBundle', () => {
  const now = new Date(2026, 9, 18, 9, 30);

  it('shows a welcoming empty state on a fresh install', () => {
    const bundle = buildWidgetBundle(createDefaultState(), now, strings);
    expect(bundle.progress.progress).toMatchObject({ state: 'new', completed: 0, total: 30, percent: 0 });
    expect(bundle.action.action).toBeUndefined();
    expect(bundle.lockScreen[0].props.progress).toBeUndefined();
  });

  it('reports real progress and the next lesson', () => {
    let progress = completeLesson({}, days[0].lessonId!, T);
    progress = completeLesson(progress, days[1].lessonId!, T);
    const bundle = buildWidgetBundle(onboarded({ progress }), now, strings);
    expect(bundle.progress.progress).toMatchObject({ state: 'active', completed: 2, total: 30, percent: 7 });
    expect(bundle.progress.progress.next).toEqual({ day: 3, title: days[2].title, link: `moralfuel://lesson/${days[2].lessonId}` });
    expect(bundle.action.action).toMatchObject({ day: 3, link: `moralfuel://lesson/${days[2].lessonId}` });
  });

  it('says so when every lesson is done', () => {
    const progress = days.reduce((acc, d) => completeLesson(acc, d.lessonId!, T), {});
    const bundle = buildWidgetBundle(onboarded({ progress }), now, strings);
    expect(bundle.progress.progress).toMatchObject({ state: 'done', completed: 30, percent: 100 });
    expect(bundle.progress.progress.next).toBeUndefined();
    expect(bundle.action.action).toBeUndefined();
  });

  it('schedules 30 entries at local midnights, starting today', () => {
    const bundle = buildWidgetBundle(onboarded(), now, strings);
    expect(bundle.daily).toHaveLength(TIMELINE_DAYS);
    expect(bundle.daily[0].date).toEqual(new Date(2026, 9, 18));
    expect(bundle.daily[1].date).toEqual(new Date(2026, 9, 19));
    expect(bundle.daily[0].props.byTheme.all.id).not.toBe(bundle.daily[1].props.byTheme.all.id);
    expect(bundle.daily[0].props.byTheme.all.label).toBe('In eigen woorden');
  });

  it('keeps progress off the Lock Screen unless the user allows it', () => {
    const progress = completeLesson({}, days[0].lessonId!, T);
    const hidden = buildWidgetBundle(onboarded({ progress }), now, strings);
    expect(hidden.lockScreen.every((entry) => entry.props.progress === undefined)).toBe(true);
    const shown = buildWidgetBundle(
      onboarded({ progress, preferences: { ...createDefaultState().preferences, lockScreenProgress: true } }),
      now,
      strings,
    );
    expect(shown.lockScreen[0].props.progress).toEqual({ completed: 1, total: 30, percent: 3 });
  });

  it('never sends null, which the native widget bridge rejects', () => {
    for (const state of [createDefaultState(), onboarded(), onboarded({ progress: days.reduce((acc, d) => completeLesson(acc, d.lessonId!, T), {}) })]) {
      const { signature: _internal, ...sent } = buildWidgetBundle(state, now, strings);
      expect(JSON.stringify(sent)).not.toContain('null');
    }
  });

  it('contains no journal or reflection text: widgets get lesson content and progress only', () => {
    const json = JSON.stringify(buildWidgetBundle(onboarded(), now, strings));
    expect(json).not.toMatch(/reflect|journal|dagboek/i);
  });

  it('changes its signature when progress or the day changes, and only then', () => {
    const state = onboarded();
    const a = buildWidgetBundle(state, now, strings).signature;
    expect(buildWidgetBundle(state, new Date(2026, 9, 18, 22, 0), strings).signature).toBe(a);
    expect(buildWidgetBundle(state, new Date(2026, 9, 19, 0, 5), strings).signature).not.toBe(a);
    expect(buildWidgetBundle(onboarded({ progress: completeLesson({}, days[0].lessonId!, T) }), now, strings).signature).not.toBe(a);
  });

  it('shows a reset journey after all data is erased', () => {
    const before = buildWidgetBundle(onboarded({ progress: completeLesson({}, days[0].lessonId!, T) }), now, strings);
    const after = buildWidgetBundle(createDefaultState(), now, strings);
    expect(before.progress.progress.completed).toBe(1);
    expect(after.progress.progress).toMatchObject({ state: 'new', completed: 0 });
  });

  it('falls back to Dutch when a language has no translation yet', () => {
    const bundle = buildWidgetBundle(
      onboarded({ preferences: { ...createDefaultState().preferences, language: 'en' } }),
      now,
      stringsFor('en'),
    );
    expect(bundle.daily[0].props.labels.inspiration).toBe('Inspiratie voor vandaag');
    expect(bundle.daily[0].props.byTheme.all.reference).toMatch(/\d+:\d+|\d+$/);
  });
});

describe('deep links', () => {
  it('opens a known lesson and falls back to the journey for an unknown one', () => {
    expect(links.lesson(days[3].lessonId)).toBe(`moralfuel://lesson/${days[3].lessonId}`);
    expect(links.lesson('day-99-removed')).toBe('moralfuel://journey');
    expect(links.lesson(undefined)).toBe('moralfuel://journey');
    expect(links.today()).toBe('moralfuel://');
  });
});
