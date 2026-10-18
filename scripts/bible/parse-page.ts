/**
 * Reads a debijbel.nl chapter page (server-rendered, or saved from a browser with "Webpage,
 * Complete") into blocks. Structure observed on the BGT pages, October 2026:
 *
 *   ibep-render-bible-content > div > one element per block:
 *     bible-ms > h2.ms, bible-s > h4.s   headings (major section, section)
 *     bible-p > p.p                      prose paragraph
 *     ibep-bible-passage (bare)          text that ends a paragraph begun in the previous chapter (GAL.5:1)
 *     bible-q > p.q                      poetry line
 *     bible-b > p.b                      stanza break
 *     bible-cl > h3.cl                   psalm label ("Psalm 13"), repeats the chapter title
 *   inside a paragraph, in order:
 *     sub.v                              verse marker as printed ("7" or "28-30")
 *     span.verse.BGT.JAS.1.7[.BGT.JAS.1.8]  the verse text; one class per verse it holds;
 *                                        a span without a marker before it runs on from the line above
 *   .bible-copyright                     "Bijbel in Gewone Taal © Nederlands-Vlaams Bijbelgenootschap"
 *
 * Anything else inside the content fails the page, so a change on the site is noticed, never guessed.
 */
import { parse, type HTMLElement } from 'node-html-parser';

import type { BibleTextBlock, BibleVerseText } from '@/models/bible';
import { BIBLE_BOOKS, type BibleBookId } from '@/models/content';

export interface ParsedChapterPage {
  translation: 'BGT';
  book: BibleBookId;
  chapter: number;
  verseCount: number;
  blocks: BibleTextBlock[];
}

const VERSE_ID = /^BGT\.([1-3]?[A-Z]{2,3})\.(\d+)\.(\d+)$/;
const clean = (text: string) => text.replace(/\s+/g, ' ').trim();

function contentOf(html: string): { root: HTMLElement; content: HTMLElement } {
  const root = parse(html);
  const content = root.querySelector('ibep-render-bible-content > div');
  if (!content) throw new Error('no chapter text found (ibep-render-bible-content is missing)');
  return { root, content };
}

/** The verses a span holds, from its BGT.BOOK.CHAPTER.VERSE classes. */
function verseIds(span: HTMLElement) {
  const ids = span.classList.value.flatMap((name) => {
    const match = VERSE_ID.exec(name);
    return match ? [{ book: match[1], chapter: Number(match[2]), verse: Number(match[3]) }] : [];
  });
  if (ids.length === 0) throw new Error(`verse without a BGT id: "${clean(span.text).slice(0, 40)}"`);
  return ids;
}

function readParagraph(element: HTMLElement, style: 'prose' | 'poetry', chapter: { book: string; chapter: number }) {
  const verses: BibleVerseText[] = [];
  let label: string | undefined;
  for (const node of element.querySelectorAll('sub.v, span.verse')) {
    if (node.tagName === 'SUB') {
      label = clean(node.text);
      continue;
    }
    const ids = verseIds(node);
    if (ids.some((id) => id.book !== chapter.book || id.chapter !== chapter.chapter)) {
      throw new Error(`verse ${ids[0].book}.${ids[0].chapter}.${ids[0].verse} is not in ${chapter.book}.${chapter.chapter}`);
    }
    const first = Math.min(...ids.map((id) => id.verse));
    const last = Math.max(...ids.map((id) => id.verse));
    if (label !== undefined && label !== (first === last ? `${first}` : `${first}-${last}`)) {
      throw new Error(`marker "${label}" does not match verses ${first}-${last}`);
    }
    verses.push({ first, last, ...(label !== undefined ? { label } : {}), text: clean(node.text) });
    label = undefined;
  }
  if (verses.length === 0) throw new Error(`empty ${style} paragraph`);
  return { kind: 'paragraph' as const, style, verses };
}

export function parseChapterPage(html: string): ParsedChapterPage {
  const { root, content } = contentOf(html);
  const copyright = clean(root.querySelector('.bible-copyright')?.text ?? '');
  if (!copyright.includes('Bijbel in Gewone Taal')) throw new Error(`not a BGT page (copyright line: "${copyright}")`);

  const first = content.querySelector('span.verse');
  const id = first && VERSE_ID.exec(first.classList.value.find((name) => VERSE_ID.test(name)) ?? '');
  if (!id) throw new Error('no BGT verse found');
  const book = id[1] as BibleBookId;
  if (!BIBLE_BOOKS.includes(book)) throw new Error(`unknown book ${id[1]}`);
  const chapter = { book, chapter: Number(id[2]) };

  const blocks: BibleTextBlock[] = content.childNodes
    .filter((node): node is HTMLElement => node.nodeType === 1)
    .flatMap((element): BibleTextBlock[] => {
      switch (element.tagName) {
        case 'BIBLE-MS':
        case 'BIBLE-S':
          return [{ kind: 'heading', text: clean(element.text) }];
        case 'BIBLE-P':
        case 'IBEP-BIBLE-PASSAGE':
          return [readParagraph(element, 'prose', chapter)];
        case 'BIBLE-Q':
          return [readParagraph(element, 'poetry', chapter)];
        case 'BIBLE-B':
          return [{ kind: 'break' }];
        case 'BIBLE-CL':
          return [];
        default:
          throw new Error(`unexpected element <${element.tagName.toLowerCase()}> in the chapter text`);
      }
    });

  const verseCount = Math.max(
    ...blocks.flatMap((block) => (block.kind === 'paragraph' ? block.verses.map((verse) => verse.last) : [0])),
  );
  return { translation: 'BGT', ...chapter, verseCount, blocks };
}

/** The chapter's visible text with all markup removed, read without the block parser. */
export function pagePlainText(html: string): string {
  const start = html.indexOf('<ibep-render-bible-content');
  const end = html.indexOf('</ibep-render-bible-content>');
  if (start < 0 || end < 0) return '';
  return clean(html.slice(start, end).replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' '));
}
