/**
 * Bible text as the publisher prints it. Text is imported from the publisher's own pages by
 * scripts/bible and bundled with the app; nothing here is written or reworded by us.
 */
import type { BibleBookId, BibleReference } from './content';

export const BIBLE_TEXT_STATUSES = ['IMPORTED', 'VERIFIED', 'MISSING', 'NEEDS_REVIEW', 'ERROR'] as const;
export type BibleTextStatus = (typeof BIBLE_TEXT_STATUSES)[number];

export interface BibleTranslationMetadata {
  id: 'BGT';
  name: string;
  publisher: string;
  copyright: string;
  website: string;
}

/** One verse, or a group the source prints under one marker such as "7-8", or part of either. */
export interface BibleVerseText {
  first: number;
  last: number;
  /** The marker exactly as the source prints it; absent where a verse runs on from the previous line. */
  label?: string;
  text: string;
}

/** Prose paragraphs and poetry lines as the source sets them; a break is the source's stanza break. */
export type BibleTextBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; style: 'prose' | 'poetry'; verses: BibleVerseText[] }
  | { kind: 'break' };

export interface BibleSourceMetadata {
  url: string;
  /** ISO date the page was fetched or saved. */
  retrievedOn: string;
  via: 'fetch' | 'saved-page';
  /** SHA-256 of the source file, so validation can re-read exactly what was imported. */
  sha256: string;
  importVersion: number;
}

/** The part of a chapter the app needs, in the source's own blocks. */
export interface BibleChapterText {
  translation: 'BGT';
  book: BibleBookId;
  chapter: number;
  /** The last verse number in the source chapter, also when only part of it is kept. */
  verseCount: number;
  blocks: BibleTextBlock[];
  source: BibleSourceMetadata;
  status: Extract<BibleTextStatus, 'IMPORTED' | 'VERIFIED' | 'NEEDS_REVIEW'>;
  notes?: string[];
}

export interface BibleDataset {
  translation: 'BGT';
  importVersion: number;
  chapters: BibleChapterText[];
}

/** A reference resolved against the bundled text: the blocks to show, or why there are none. */
export interface BiblePassage {
  reference: BibleReference;
  status: BibleTextStatus;
  blocks: BibleTextBlock[];
  sourceUrl: string;
}
