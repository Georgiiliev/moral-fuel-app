import type { BibleDataset } from '@/models/bible';

import {
  appBibleReferences,
  blocksInRange,
  chapterUrl,
  getChapter,
  getMissingReferences,
  getPassage,
  getPassages,
  hasPassage,
  validatePassage,
} from '../bible';
import { LESSONS } from '../index';

// Fixture text, deliberately not Bible text: it only exercises the lookup rules.
jest.mock('../bible/bgt.json', () => {
  const fixture: BibleDataset = {
    translation: 'BGT',
    importVersion: 1,
    chapters: [
      {
        translation: 'BGT',
        book: 'JAS',
        chapter: 1,
        verseCount: 10,
        status: 'VERIFIED',
        source: {
          url: 'https://www.debijbel.nl/bijbel/BGT/JAS.1',
          retrievedOn: '2026-10-18',
          via: 'saved-page',
          sha256: 'fixture',
          importVersion: 1,
        },
        blocks: [
          { kind: 'heading', text: 'Kop A' },
          {
            kind: 'paragraph',
            style: 'prose',
            verses: [
              { first: 1, last: 1, label: '1', text: 'Een.' },
              { first: 2, last: 2, label: '2', text: 'Twee.' },
            ],
          },
          { kind: 'heading', text: 'Kop B' },
          {
            kind: 'paragraph',
            style: 'prose',
            verses: [
              { first: 3, last: 3, label: '3', text: 'Drie.' },
              { first: 4, last: 6, label: '4-6', text: 'Vier tot zes.' },
            ],
          },
          { kind: 'paragraph', style: 'prose', verses: [{ first: 7, last: 10, label: '7-10', text: 'Zeven tot tien.' }] },
        ],
      },
      {
        translation: 'BGT',
        book: 'PSA',
        chapter: 13,
        verseCount: 4,
        status: 'IMPORTED',
        source: {
          url: 'https://www.debijbel.nl/bijbel/BGT/PSA.13',
          retrievedOn: '2026-10-18',
          via: 'saved-page',
          sha256: 'fixture',
          importVersion: 1,
        },
        // Verse 3 is missing on purpose.
        blocks: [
          {
            kind: 'paragraph',
            style: 'prose',
            verses: [
              { first: 1, last: 2, label: '1-2', text: 'Een en twee.' },
              { first: 4, last: 4, label: '4', text: 'Vier.' },
            ],
          },
        ],
      },
    ],
  };
  return fixture;
});

const verseLabels = (ref: Parameters<typeof getPassage>[0]) =>
  getPassage(ref).blocks.flatMap((block) => (block.kind === 'paragraph' ? block.verses.map((verse) => verse.label) : []));

describe('Bible content service', () => {
  it('builds the publisher URL from the book code and chapter', () => {
    expect(chapterUrl('JAS', 1)).toBe('https://www.debijbel.nl/bijbel/BGT/JAS.1');
    expect(chapterUrl('1CO', 13)).toBe('https://www.debijbel.nl/bijbel/BGT/1CO.13');
  });

  it('returns exactly the verses asked for, with the heading that opens them', () => {
    const passage = getPassage({ book: 'JAS', chapter: 1, verseStart: 1, verseEnd: 2 });
    expect(passage.status).toBe('VERIFIED');
    expect(passage.sourceUrl).toBe('https://www.debijbel.nl/bijbel/BGT/JAS.1');
    expect(passage.blocks).toEqual([
      { kind: 'heading', text: 'Kop A' },
      { kind: 'paragraph', style: 'prose', verses: [expect.objectContaining({ label: '1' }), expect.objectContaining({ label: '2' })] },
    ]);
  });

  it('drops a heading whose paragraph starts before the range', () => {
    const passage = getPassage({ book: 'JAS', chapter: 1, verseStart: 2 });
    expect(passage.blocks).toEqual([{ kind: 'paragraph', style: 'prose', verses: [expect.objectContaining({ label: '2' })] }]);
  });

  it('keeps a grouped verse whole when part of it is asked for', () => {
    expect(verseLabels({ book: 'JAS', chapter: 1, verseStart: 5 })).toEqual(['4-6']);
    expect(verseLabels({ book: 'JAS', chapter: 1, verseStart: 3, verseEnd: 8 })).toEqual(['3', '4-6', '7-10']);
  });

  it('shows a whole chapter for a reference without verses', () => {
    expect(verseLabels({ book: 'JAS', chapter: 1 })).toEqual(['1', '2', '3', '4-6', '7-10']);
    expect(blocksInRange(getChapter('JAS', 1)!.blocks, 1, 10).filter((block) => block.kind === 'heading')).toHaveLength(2);
  });

  it('marks a chapter that is not imported as missing, with its source link', () => {
    const passage = getPassage({ book: 'LUK', chapter: 15, verseStart: 11, verseEnd: 32 });
    expect(passage).toEqual({
      reference: { book: 'LUK', chapter: 15, verseStart: 11, verseEnd: 32 },
      status: 'MISSING',
      blocks: [],
      sourceUrl: 'https://www.debijbel.nl/bijbel/BGT/LUK.15',
    });
    expect(hasPassage(passage.reference)).toBe(false);
    expect(validatePassage(passage.reference)).toEqual(['LUK.15 is not imported']);
  });

  it('never shows a passage with a gap, and says which verses are missing', () => {
    const ref = { book: 'PSA', chapter: 13 } as const;
    expect(validatePassage(ref)).toEqual(['verses 3 are missing']);
    expect(getPassage(ref)).toMatchObject({ status: 'ERROR', blocks: [] });
  });

  it('rejects verses beyond the end of the chapter', () => {
    expect(validatePassage({ book: 'JAS', chapter: 1, verseStart: 9, verseEnd: 12 })).toEqual([
      'verses 9-12 fall outside JAS.1 (1-10)',
    ]);
    expect(hasPassage({ book: 'JAS', chapter: 1, verseStart: 9, verseEnd: 12 })).toBe(false);
  });

  it('resolves several references in order', () => {
    const passages = getPassages([
      { book: 'JAS', chapter: 1, verseStart: 3 },
      { book: 'LUK', chapter: 15 },
    ]);
    expect(passages.map((passage) => passage.status)).toEqual(['VERIFIED', 'MISSING']);
  });

  it('lists each lesson passage and related passage, and which of them are missing', () => {
    const references = appBibleReferences();
    const expected = LESSONS.reduce((sum, lesson) => sum + 1 + lesson.relatedPassages.length, 0);
    expect(references).toHaveLength(expected);
    expect(new Set(references.filter((ref) => ref.role === 'passage').map((ref) => ref.day)).size).toBe(30);
    expect(getMissingReferences().length).toBe(references.filter((ref) => !hasPassage(ref.reference)).length);
  });
});
