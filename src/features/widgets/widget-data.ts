import { formatReference, getDayViews, getLesson, getLessonText, getSections } from '@/content';
import { INSPIRATIONS, INSPIRATION_THEMES, type Inspiration, type InspirationTheme } from '@/content/inspirations';
import { getJourneyPosition } from '@/features/progress/progress';
import type { Strings } from '@/i18n/strings';
import type { AppState } from '@/models/user';

/**
 * Everything the native widgets show, computed from the app's real state. Widgets run in an
 * isolated runtime that cannot import, so every label they need travels in their props. No journal
 * text, reflection or other private writing ever goes into these props. Props never contain null:
 * the native bridge rejects it, so an empty value is an absent key.
 */
export const WIDGET_DATA_VERSION = 1;
export const TIMELINE_DAYS = 30;
export const WIDGET_SCHEME = 'moralfuel://';

export type ThemeChoice = 'all' | InspirationTheme;

export interface InspirationView {
  id: string;
  text: string;
  note: string;
  reference: string;
  /** "In eigen woorden": the text is a paraphrase, never presented as a literal quotation. */
  label: string;
  themeLabel: string;
  link: string;
}

export interface ActionView {
  day: number;
  lessonTitle: string;
  title: string;
  description: string;
  reference: string;
  link: string;
}

export interface ProgressView {
  state: 'new' | 'active' | 'done';
  completed: number;
  total: number;
  percent: number;
  chapter: string;
  next?: { day: number; title: string; link: string };
}

export interface WidgetLabels {
  brand: string;
  inspiration: string;
  action: string;
  progress: string;
  lessons: string;
  completed: string;
  next: string;
  continueLesson: string;
  start: string;
  allDone: string;
  emptyAction: string;
  hiddenProgress: string;
}

export interface DailyInspirationWidgetData {
  v: number;
  byTheme: Record<ThemeChoice, InspirationView>;
  action?: ActionView;
  labels: WidgetLabels;
}

export interface JourneyProgressWidgetData {
  v: number;
  progress: ProgressView;
  link: string;
  labels: WidgetLabels;
}

export interface TodayActionWidgetData {
  v: number;
  action?: ActionView;
  link: string;
  labels: WidgetLabels;
}

export interface DashboardWidgetData {
  v: number;
  inspiration: InspirationView;
  progress: ProgressView;
  action?: ActionView;
  link: string;
  labels: WidgetLabels;
}

export interface LockScreenWidgetData {
  v: number;
  inspiration: { text: string; reference: string; theme: string; link: string };
  /** Absent when the user keeps progress off the Lock Screen. */
  progress?: { completed: number; total: number; percent: number };
  labels: WidgetLabels;
}

export interface TimelineEntry<P> {
  date: Date;
  props: P;
}

export interface WidgetBundle {
  /** Changes whenever anything a widget shows changes, including the local date. */
  signature: string;
  daily: TimelineEntry<DailyInspirationWidgetData>[];
  dashboard: TimelineEntry<DashboardWidgetData>[];
  lockScreen: TimelineEntry<LockScreenWidgetData>[];
  progress: JourneyProgressWidgetData;
  action: TodayActionWidgetData;
}

// --- dates -----------------------------------------------------------------------------------

/**
 * Number of the calendar day in the device's time zone (or the one given): stable from local
 * midnight to local midnight, so an inspiration never changes twice in one day.
 */
export function localDayNumber(date: Date, timeZone?: string): number {
  if (!timeZone) return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(date);
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return Math.floor(Date.UTC(part('year'), part('month') - 1, part('day')) / 86_400_000);
}

/** Local midnight `offset` days from `date` (DST-safe: built from calendar fields). */
export function startOfLocalDay(date: Date, offset = 0): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset);
}

// --- selection -------------------------------------------------------------------------------

/** The same inspiration all day; the next one at local midnight; never the same two days running. */
export function inspirationFor(dayNumber: number, theme: ThemeChoice, items: readonly Inspiration[] = INSPIRATIONS): Inspiration {
  const pool = theme === 'all' ? items : items.filter((item) => item.theme === theme);
  const list = pool.length > 0 ? pool : items;
  return list[((dayNumber % list.length) + list.length) % list.length];
}

// --- links -----------------------------------------------------------------------------------

export const links = {
  today: () => WIDGET_SCHEME,
  journey: () => `${WIDGET_SCHEME}journey`,
  /** A removed or unknown lesson falls back to the journey. */
  lesson: (lessonId: string | undefined) =>
    lessonId && getLesson(lessonId) ? `${WIDGET_SCHEME}lesson/${lessonId}` : `${WIDGET_SCHEME}journey`,
};

// --- views -----------------------------------------------------------------------------------

function inspirationView(item: Inspiration, strings: Strings): InspirationView {
  const language = item.language;
  return {
    id: item.id,
    text: item.text,
    note: item.note,
    reference: formatReference(item.reference, language),
    label: strings.widgets.paraphrase,
    themeLabel: strings.widgets.themes[item.theme],
    link: links.today(),
  };
}

function progressView(state: AppState): ProgressView {
  const language = state.preferences.language;
  const days = getDayViews(language);
  const position = getJourneyPosition(days, state.progress);
  const shown = position.current ?? position.nextPlanned ?? days[days.length - 1];
  const section = getSections(language).find((s) => s.id === shown.sectionId);
  const total = position.totalDays;
  return {
    state: !state.onboardingCompleted ? 'new' : position.current ? 'active' : 'done',
    completed: position.completedCount,
    total,
    percent: total > 0 ? Math.round((position.completedCount / total) * 100) : 0,
    chapter: section ? section.title : '',
    ...(position.current?.lessonId
      ? { next: { day: position.current.day, title: position.current.title, link: links.lesson(position.current.lessonId) } }
      : {}),
  };
}

function actionView(state: AppState): ActionView | undefined {
  if (!state.onboardingCompleted) return undefined;
  const language = state.preferences.language;
  const position = getJourneyPosition(getDayViews(language), state.progress);
  const lesson = position.current?.lessonId ? getLesson(position.current.lessonId) : undefined;
  if (!lesson) return undefined;
  const text = getLessonText(lesson, language);
  const live = text.steps[2];
  return {
    day: lesson.day,
    lessonTitle: text.title,
    title: live.action.title,
    description: live.action.description,
    reference: formatReference(lesson.passage, language),
    link: links.lesson(lesson.id),
  };
}

function widgetLabels(strings: Strings): WidgetLabels {
  return { ...strings.widgets.labels, brand: strings.brand.name };
}

/** Builds every widget's data for the next TIMELINE_DAYS local days, starting today. */
export function buildWidgetBundle(state: AppState, now: Date, strings: Strings): WidgetBundle {
  const labels = widgetLabels(strings);
  const progress = progressView(state);
  const action = actionView(state);
  const showProgressOnLockScreen = state.preferences.lockScreenProgress && progress.state !== 'new';
  const withAction = action ? { action } : {};

  const daily: TimelineEntry<DailyInspirationWidgetData>[] = [];
  const dashboard: TimelineEntry<DashboardWidgetData>[] = [];
  const lockScreen: TimelineEntry<LockScreenWidgetData>[] = [];
  for (let offset = 0; offset < TIMELINE_DAYS; offset++) {
    const date = startOfLocalDay(now, offset);
    const day = localDayNumber(date);
    const byTheme = Object.fromEntries(
      (['all', ...INSPIRATION_THEMES] as ThemeChoice[]).map((theme) => [theme, inspirationView(inspirationFor(day, theme), strings)]),
    ) as Record<ThemeChoice, InspirationView>;
    daily.push({ date, props: { v: WIDGET_DATA_VERSION, byTheme, ...withAction, labels } });
    dashboard.push({
      date,
      props: { v: WIDGET_DATA_VERSION, inspiration: byTheme.all, progress, ...withAction, link: action?.link ?? links.today(), labels },
    });
    lockScreen.push({
      date,
      props: {
        v: WIDGET_DATA_VERSION,
        inspiration: {
          text: byTheme.all.text,
          reference: byTheme.all.reference,
          theme: byTheme.all.themeLabel,
          link: byTheme.all.link,
        },
        ...(showProgressOnLockScreen
          ? { progress: { completed: progress.completed, total: progress.total, percent: progress.percent } }
          : {}),
        labels,
      },
    });
  }

  return {
    signature: JSON.stringify([WIDGET_DATA_VERSION, localDayNumber(now), state.preferences.language, progress, action, showProgressOnLockScreen]),
    daily,
    dashboard,
    lockScreen,
    progress: { v: WIDGET_DATA_VERSION, progress, link: links.journey(), labels },
    action: { v: WIDGET_DATA_VERSION, ...withAction, link: action?.link ?? links.journey(), labels },
  };
}

/** Integrity of the inspiration collection; an empty list means sound. */
export function validateInspirations(items: readonly Inspiration[] = INSPIRATIONS): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) errors.push(`duplicate inspiration ${item.id}`);
    ids.add(item.id);
    if (!item.text.trim() || !item.note.trim()) errors.push(`${item.id}: text and note are required`);
    if (/["“”„«»]/.test(item.text)) errors.push(`${item.id}: no quotation marks in text`);
    if (!INSPIRATION_THEMES.includes(item.theme)) errors.push(`${item.id}: unknown theme`);
    if (item.contentType === 'quotation' && (!item.source.translation || item.source.license === 'original-work')) {
      errors.push(`${item.id}: a quotation must name its translation and license`);
    }
    if (item.contentType === 'paraphrase' && item.source.license !== 'original-work') {
      errors.push(`${item.id}: a paraphrase is original work`);
    }
    if (item.review.state === 'APPROVED' && (!item.review.reviewedBy || !item.review.reviewedOn)) {
      errors.push(`${item.id}: APPROVED needs a reviewer and date`);
    }
  }
  return errors;
}
