import type {
  BibleChapterText,
  BibleDataset,
  BiblePassage,
  BibleTextBlock,
  BibleTranslationMetadata,
} from '@/models/bible';
import type { BibleBookId, BibleReference } from '@/models/content';

import dataset from './bible/bgt.json';
import { LESSONS } from './index';

export const BGT: BibleTranslationMetadata = {
  id: 'BGT',
  name: 'Bijbel in Gewone Taal',
  publisher: 'Nederlands-Vlaams Bijbelgenootschap',
  copyright: '© Nederlands-Vlaams Bijbelgenootschap 2014',
  website: 'https://www.debijbel.nl',
};

const DATASET = dataset as BibleDataset;

export function getTranslationMetadata(): BibleTranslationMetadata {
  return BGT;
}

/** The publisher's reading page for a chapter, e.g. https://www.debijbel.nl/bijbel/BGT/JAS.1 */
export function chapterUrl(book: BibleBookId, chapter: number): string {
  return `${BGT.website}/bijbel/BGT/${book}.${chapter}`;
}

const chapterKey = (book: BibleBookId, chapter: number) => `${book}.${chapter}`;

const chaptersByKey = new Map(
  DATASET.chapters.map((chapter) => [chapterKey(chapter.book, chapter.chapter), chapter]),
);

export function getChapter(book: BibleBookId, chapter: number): BibleChapterText | undefined {
  return chaptersByKey.get(chapterKey(book, chapter));
}

/** The verses a reference asks for; a whole-chapter reference needs the chapter's verse count. */
export function verseSpan(ref: BibleReference, verseCount: number): { first: number; last: number } {
  if (ref.verseStart === undefined) return { first: 1, last: verseCount };
  return { first: ref.verseStart, last: ref.verseEnd ?? ref.verseStart };
}

/**
 * The blocks that hold verses first..last, in source order. A verse group the source prints under
 * one marker is kept whole when any of its verses is asked for; a heading is kept when the
 * paragraph after it starts inside the range, a stanza break only between kept lines.
 */
export function blocksInRange(blocks: readonly BibleTextBlock[], first: number, last: number): BibleTextBlock[] {
  const result: BibleTextBlock[] = [];
  let pending: BibleTextBlock[] = [];
  for (const block of blocks) {
    if (block.kind !== 'paragraph') {
      pending.push(block);
      continue;
    }
    const verses = block.verses.filter((verse) => verse.last >= first && verse.first <= last);
    if (verses.length > 0) {
      const opensInRange = block.verses[0].first >= first;
      result.push(...pending.filter((item) => (item.kind === 'heading' ? opensInRange : result.length > 0)));
      result.push({ ...block, verses });
    }
    pending = [];
  }
  return result;
}

/** Verse numbers in first..last that no block holds. */
export function uncoveredVerses(blocks: readonly BibleTextBlock[], first: number, last: number): number[] {
  const held = new Set<number>();
  for (const block of blocks) {
    if (block.kind !== 'paragraph') continue;
    for (const verse of block.verses) for (let n = verse.first; n <= verse.last; n++) held.add(n);
  }
  const missing: number[] = [];
  for (let n = first; n <= last; n++) if (!held.has(n)) missing.push(n);
  return missing;
}

/** Problems that keep a reference from showing its full text; empty when it can be shown. */
export function validatePassage(ref: BibleReference): string[] {
  const chapter = getChapter(ref.book, ref.chapter);
  if (!chapter) return [`${chapterKey(ref.book, ref.chapter)} is not imported`];
  const { first, last } = verseSpan(ref, chapter.verseCount);
  if (first < 1 || last < first || last > chapter.verseCount) {
    return [`verses ${first}-${last} fall outside ${chapterKey(ref.book, ref.chapter)} (1-${chapter.verseCount})`];
  }
  const missing = uncoveredVerses(blocksInRange(chapter.blocks, first, last), first, last);
  return missing.length > 0 ? [`verses ${missing.join(', ')} are missing`] : [];
}

/** The full text of a reference, or an empty passage that says why it cannot be shown. */
export function getPassage(ref: BibleReference): BiblePassage {
  const sourceUrl = chapterUrl(ref.book, ref.chapter);
  const chapter = getChapter(ref.book, ref.chapter);
  if (!chapter) return { reference: ref, status: 'MISSING', blocks: [], sourceUrl };
  if (validatePassage(ref).length > 0) return { reference: ref, status: 'ERROR', blocks: [], sourceUrl };
  const { first, last } = verseSpan(ref, chapter.verseCount);
  return { reference: ref, status: chapter.status, blocks: blocksInRange(chapter.blocks, first, last), sourceUrl };
}

export function getPassages(refs: readonly BibleReference[]): BiblePassage[] {
  return refs.map(getPassage);
}

export function hasPassage(ref: BibleReference): boolean {
  return getPassage(ref).blocks.length > 0;
}

export interface AppBibleReference {
  lessonId: string;
  day: number;
  role: 'passage' | 'related';
  reference: BibleReference;
}

/** Every reference a reader can open in the app: each lesson's passage and its related passages. */
export function appBibleReferences(): AppBibleReference[] {
  return LESSONS.flatMap((lesson) => [
    { lessonId: lesson.id, day: lesson.day, role: 'passage' as const, reference: lesson.passage },
    ...lesson.relatedPassages.map((reference) => ({
      lessonId: lesson.id,
      day: lesson.day,
      role: 'related' as const,
      reference,
    })),
  ]);
}

export function getMissingReferences(): AppBibleReference[] {
  return appBibleReferences().filter(({ reference }) => !hasPassage(reference));
}
