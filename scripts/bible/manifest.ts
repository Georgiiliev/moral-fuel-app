import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { formatReference, getLesson } from '@/content';
import { appBibleReferences, chapterUrl, getChapter, getPassage } from '@/content/bible';
import { BIBLE_BOOK_NAMES } from '@/content/taxonomy';
import type { BibleBookId } from '@/models/content';

export const PROJECT_ROOT = join(__dirname, '..', '..');
export const MANIFEST_PATH = join(PROJECT_ROOT, 'BGT_REFERENCE_MANIFEST.json');

export interface ManifestChapter {
  book: BibleBookId;
  chapter: number;
  url: string;
  /** The verses the app needs from this chapter; null means the whole chapter. */
  first: number;
  last: number | null;
}

/** Every reference the app shows, each with where it is used and how far its text is. */
export function buildManifest() {
  const references = appBibleReferences().map(({ lessonId, day, role, reference }) => ({
    lessonId,
    lessonTitle: getLesson(lessonId)!.text.nl.title,
    day,
    role,
    label: formatReference(reference, 'nl'),
    book: BIBLE_BOOK_NAMES[reference.book].nl,
    bookId: reference.book,
    chapter: reference.chapter,
    verseStart: reference.verseStart ?? null,
    verseEnd: reference.verseEnd ?? reference.verseStart ?? null,
    url: chapterUrl(reference.book, reference.chapter),
    available: getChapter(reference.book, reference.chapter) !== undefined,
    status: getPassage(reference).status,
  }));

  const chapters = new Map<string, ManifestChapter>();
  for (const ref of references) {
    const key = `${ref.bookId}.${ref.chapter}`;
    const known = chapters.get(key);
    const first = ref.verseStart ?? 1;
    const last = ref.verseStart === null ? null : ref.verseEnd;
    if (!known) {
      chapters.set(key, { book: ref.bookId, chapter: ref.chapter, url: ref.url, first, last });
      continue;
    }
    known.first = Math.min(known.first, first);
    known.last = known.last === null || last === null ? null : Math.max(known.last, last);
  }

  return {
    translation: 'BGT',
    generatedBy: 'npm run bible:manifest',
    uniqueReferences: new Set(references.map((ref) => `${ref.bookId}.${ref.chapter}:${ref.verseStart}-${ref.verseEnd}`)).size,
    chapters: [...chapters.values()],
    references,
  };
}

export type Manifest = ReturnType<typeof buildManifest>;

if (require.main === module) {
  const manifest = buildManifest();
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `${manifest.references.length} references (${manifest.uniqueReferences} unique) in ${manifest.chapters.length} chapters -> BGT_REFERENCE_MANIFEST.json`,
  );
}
