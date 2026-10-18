import { pagePlainText, parseChapterPage } from '../parse-page';

// The markup of a debijbel.nl chapter page, with placeholder text instead of Bible text.
const verse = (ids: string, text: string) =>
  `<span class="verse relative text-grayMedium ${ids}" id="${ids.split(' ')[0]}"><ibep-verse-text-renderer><span>${text}</span></ibep-verse-text-renderer></span>`;
const marker = (label: string) => `<bible-v><sub class="v text-grayLight">${label}</sub></bible-v>`;
const page = (blocks: string, copyright = 'Bijbel in Gewone Taal © Nederlands-Vlaams Bijbelgenootschap') => `
  <html><body><ibep-bible-chapter data-bible-chapter-container=""><h1 class="bible-chapter-title">Psalm 9</h1>
  <ibep-render-bible-content><div style="direction: ltr;">${blocks}</div></ibep-render-bible-content></ibep-bible-chapter>
  <div class="bible-copyright"><a href="https://www.debijbel.nl/bgt">${copyright}</a></div></body></html>`;

const CHAPTER = page(`
  <bible-cl><h3 class="cl"><ibep-bible-passage><div><span>Psalm 9</span></div></ibep-bible-passage></h3></bible-cl>
  <bible-ms><h2 class="ms"><ibep-bible-passage><div><span>Hoofdkop</span></div></ibep-bible-passage></h2></bible-ms>
  <bible-s><h4 class="s"><ibep-bible-passage><div><span>Kop</span></div></ibep-bible-passage></h4></bible-s>
  <bible-p><p class="p"><ibep-bible-passage><div>${marker('1')}${verse('BGT.PSA.9.1', 'Zin  een.')}${marker('2-3')}${verse('BGT.PSA.9.2 BGT.PSA.9.3', 'Zin twee en drie,')}</div></ibep-bible-passage></p></bible-p>
  <bible-q><p class="q"><ibep-bible-passage><div>${verse('BGT.PSA.9.3', '‘loopt door’.')}</div></ibep-bible-passage></p></bible-q>
  <bible-b><p class="b"></p></bible-b>
  <bible-q><p class="q"><ibep-bible-passage><div>${marker('4')}${verse('BGT.PSA.9.4', 'Regel vier.')}</div></ibep-bible-passage></p></bible-q>`);

describe('parseChapterPage', () => {
  it('reads headings, prose, poetry, stanza breaks, grouped markers and run-on lines', () => {
    expect(parseChapterPage(CHAPTER)).toEqual({
      translation: 'BGT',
      book: 'PSA',
      chapter: 9,
      verseCount: 4,
      blocks: [
        { kind: 'heading', text: 'Hoofdkop' },
        { kind: 'heading', text: 'Kop' },
        {
          kind: 'paragraph',
          style: 'prose',
          verses: [
            { first: 1, last: 1, label: '1', text: 'Zin een.' },
            { first: 2, last: 3, label: '2-3', text: 'Zin twee en drie,' },
          ],
        },
        { kind: 'paragraph', style: 'poetry', verses: [{ first: 3, last: 3, text: '‘loopt door’.' }] },
        { kind: 'break' },
        { kind: 'paragraph', style: 'poetry', verses: [{ first: 4, last: 4, label: '4', text: 'Regel vier.' }] },
      ],
    });
  });

  it('refuses a page of another translation', () => {
    expect(() => parseChapterPage(page(`<bible-p><p class="p">${verse('BGT.PSA.9.1', 'x')}</p></bible-p>`, 'NBV21'))).toThrow(
      'not a BGT page',
    );
  });

  it('refuses markup it does not know instead of guessing', () => {
    expect(() => parseChapterPage(page(`<bible-p><p class="p">${verse('BGT.PSA.9.1', 'x')}</p></bible-p><bible-f>note</bible-f>`))).toThrow(
      'unexpected element <bible-f>',
    );
  });

  it('refuses a marker that does not match its verses, and a verse from another chapter', () => {
    expect(() => parseChapterPage(page(`<bible-p><p class="p">${marker('2')}${verse('BGT.PSA.9.1', 'x')}</p></bible-p>`))).toThrow(
      'marker "2" does not match verses 1-1',
    );
    expect(() =>
      parseChapterPage(page(`<bible-p><p class="p">${verse('BGT.PSA.9.1', 'x')}${verse('BGT.PSA.10.1', 'y')}</p></bible-p>`)),
    ).toThrow('is not in PSA.9');
  });

  it('reads the plain text independently of the block parser', () => {
    expect(pagePlainText(CHAPTER)).toBe('Psalm 9 Hoofdkop Kop 1 Zin een. 2-3 Zin twee en drie, ‘loopt door’. 4 Regel vier.');
  });
});
