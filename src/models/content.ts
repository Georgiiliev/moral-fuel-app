/**
 * Content models. Content lives in src/content as plain typed data so it can later be
 * served by a CMS without touching screens.
 */

export const LANGUAGES = ['nl', 'en'] as const;
export type LanguageCode = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: LanguageCode = 'nl';

/** Text in the default language (Dutch), with optional translations. */
export type LocalizedContent<T = string> = { nl: T } & Partial<
  Record<Exclude<LanguageCode, 'nl'>, T>
>;

export const REVIEW_STATES = ['EDITORIAL_DRAFT', 'IN_REVIEW', 'APPROVED'] as const;
export type ReviewState = (typeof REVIEW_STATES)[number];

/** Who wrote a piece of content and whether a qualified human reviewer has approved it. */
export interface ContentReviewStatus {
  state: ReviewState;
  authoredBy: string;
  authoredOn: string; // ISO date
  reviewedBy?: string;
  reviewedOn?: string; // ISO date
  notes?: string;
}

/** USFM book codes, Protestant canon order. */
export const BIBLE_BOOKS = [
  'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV',
] as const;
export type BibleBookId = (typeof BIBLE_BOOKS)[number];

/** A single-chapter reference. Without verses it means the whole chapter (e.g. a psalm). Psalm verses follow Dutch (NBV21) numbering. */
export interface BibleReference {
  book: BibleBookId;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
}

export const TOPICS = [
  'faith-basics',
  'jesus',
  'gospel',
  'grace',
  'forgiveness',
  'prayer',
  'habits',
  'relationships',
  'patience',
  'trust',
  'doubt',
  'hope',
  'service',
  'bible',
  'community',
  'emotions',
  'integrity',
  'gratitude',
  'money',
  'reflection',
] as const;
export type TopicId = (typeof TOPICS)[number];

export interface ReflectionPrompt {
  question: string;
  hint?: string;
}

export interface DailyAction {
  title: string;
  description: string;
}

/** Step 1: what the passage says, how it is explained, and an everyday example. Kept apart on purpose. */
export interface LearnStep {
  kind: 'learn';
  bigIdea: string;
  /** Original summary of the passage. Never a quotation from a Bible translation. */
  passageSummary: string;
  /** The setting of the passage: who, when, where and what comes before. */
  context: string;
  /** Beginner-friendly interpretation, kept apart from what the text says. */
  explanation: string[];
  example: string;
  /** Short neutral note where Christian traditions differ materially. */
  traditionNote?: string;
  /** Safety note where a topic touches abuse, grief or mental health. */
  careNote?: string;
}

export interface ReflectStep {
  kind: 'reflect';
  prompt: ReflectionPrompt;
}

export interface LiveStep {
  kind: 'live';
  action: DailyAction;
  prayer?: string;
}

export type LearningStep = LearnStep | ReflectStep | LiveStep;

export interface LessonText {
  title: string;
  summary: string;
  objective: string;
  steps: [LearnStep, ReflectStep, LiveStep];
}

export interface LessonSource {
  /** The wider passage read to check the reference's context. */
  contextChecked: BibleReference;
  /** Lessons summarise Scripture in original prose and quote no translation. */
  bibleText: 'summary-only';
  author: string;
}

export interface Lesson {
  id: string;
  schemaVersion: 1;
  contentVersion: string;
  day: number;
  sectionId: string;
  level: 'beginner';
  topics: TopicId[];
  readingMinutes: number;
  passage: BibleReference;
  relatedPassages: BibleReference[];
  source: LessonSource;
  review: ContentReviewStatus;
  text: LocalizedContent<LessonText>;
}

export interface JourneySection {
  id: string;
  order: number;
  dayStart: number;
  dayEnd: number;
  text: LocalizedContent<{ title: string; description: string }>;
}

export interface PlannedDayText {
  title: string;
  summary: string;
  objective: string;
}

/** A journey day either points at a written lesson or is planned and not yet available. */
export type JourneyDay =
  | { day: number; sectionId: string; availability: 'available'; lessonId: string }
  | {
      day: number;
      sectionId: string;
      availability: 'coming-soon';
      editorialState: 'PLANNED';
      topics: TopicId[];
      text: LocalizedContent<PlannedDayText>;
    };

export interface Journey {
  id: string;
  version: string;
  totalDays: number;
  sections: JourneySection[];
  days: JourneyDay[];
}
