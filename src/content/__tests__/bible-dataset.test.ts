import type { BibleDataset } from '@/models/bible';
import { BIBLE_BOOKS } from '@/models/content';

import { appBibleReferences, BGT, chapterUrl, getMissingReferences, getPassage } from '../bible';
import bundled from '../bible/bgt.json';

// Checks the bundled dataset itself; the text is compared with its source pages by npm run bible:validate.
const dataset = bundled as BibleDataset;
const { chapters } = dataset;

describe('bundled BGT dataset', () => {
  it('names the BGT and its publisher', () => {
    expect(dataset.translation).toBe('BGT');
    expect(BGT).toEqual({
      id: 'BGT',
      name: 'Bijbel in Gewone Taal',
      publisher: 'Nederlands-Vlaams Bijbelgenootschap',
      copyright: '© Nederlands-Vlaams Bijbelgenootschap 2014',
      website: 'https://www.debijbel.nl',
    });
  });

  it('holds each chapter once, in canonical order, with its own source page', () => {
    const keys = chapters.map((chapter) => `${chapter.book}.${chapter.chapter}`);
    expect(new Set(keys).size).toBe(keys.length);
    const order = chapters.map((chapter) => BIBLE_BOOKS.indexOf(chapter.book) * 1000 + chapter.chapter);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    for (const chapter of chapters) {
      expect(chapter.translation).toBe('BGT');
      expect(chapter.source.url).toBe(chapterUrl(chapter.book, chapter.chapter));
      expect(chapter.source.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(chapter.status).toBe('VERIFIED');
    }
  });

  it('keeps only chapters the lessons use', () => {
    const used = new Set(appBibleReferences().map(({ reference }) => `${reference.book}.${reference.chapter}`));
    expect(chapters.every((chapter) => used.has(`${chapter.book}.${chapter.chapter}`))).toBe(true);
  });

  it('has clean text, markers that match their verses, and no verse marked twice', () => {
    for (const chapter of chapters) {
      const marked = new Set<number>();
      for (const block of chapter.blocks) {
        if (block.kind === 'heading') expect(block.text.trim()).toBe(block.text);
        if (block.kind !== 'paragraph') continue;
        for (const verse of block.verses) {
          expect(verse.text.length).toBeGreaterThan(0);
          expect(verse.text).not.toMatch(/<|>|&[a-z#0-9]+;|\s{2}/);
          expect(verse.last).toBeLessThanOrEqual(chapter.verseCount);
          if (!verse.label) continue;
          expect(verse.label).toBe(verse.first === verse.last ? `${verse.first}` : `${verse.first}-${verse.last}`);
          for (let n = verse.first; n <= verse.last; n++) {
            expect(marked.has(n)).toBe(false);
            marked.add(n);
          }
        }
      }
    }
  });

  it('shows every lesson reference in full, offline, from the bundle', () => {
    expect(getMissingReferences()).toEqual([]);
    for (const { reference } of appBibleReferences()) {
      const passage = getPassage(reference);
      expect(passage.status).toBe('VERIFIED');
      expect(passage.blocks.some((block) => block.kind === 'paragraph')).toBe(true);
    }
  });
});
