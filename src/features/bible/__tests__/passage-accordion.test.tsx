/* eslint-disable @typescript-eslint/no-require-imports -- jest.mock factories cannot use top-level imports */
import { fireEvent, render, screen } from '@testing-library/react-native';

import { BGT } from '@/content/bible';
import { stringsFor } from '@/i18n/strings';

import { BiblePassageAccordion } from '../passage-accordion';

const mockActions = { completeLesson: jest.fn(), setLessonStep: jest.fn(), openLesson: jest.fn() };
const mockOpenBrowser = jest.fn();

jest.mock('expo-web-browser', () => ({ openBrowserAsync: (url: string) => mockOpenBrowser(url) }));
jest.mock('@/state/app-state', () => {
  const { createDefaultState } = require('@/storage/app-state-codec');
  const { stringsFor: strings } = require('@/i18n/strings');
  const state = createDefaultState();
  return {
    useAppState: () => ({ ready: true, state, storageProblem: false, actions: mockActions }),
    useStrings: () => strings('nl'),
  };
});
jest.mock('@/ui/motion', () => ({ FadeIn: ({ children }: { children: unknown }) => children, useReduceMotion: () => true }));
jest.mock('@/ui/icon', () => ({ Icon: () => null }));
// Fixture text, deliberately not Bible text.
jest.mock('@/content/bible/bgt.json', () => ({
  translation: 'BGT',
  importVersion: 1,
  chapters: [
    {
      translation: 'BGT',
      book: 'JAS',
      chapter: 1,
      verseCount: 3,
      status: 'VERIFIED',
      source: { url: '', retrievedOn: '2026-10-18', via: 'saved-page', sha256: 'fixture', importVersion: 1 },
      blocks: [
        { kind: 'heading', text: 'Testkop' },
        {
          kind: 'paragraph',
          style: 'prose',
          verses: [
            { first: 1, last: 1, label: '1', text: 'Eerste testzin.' },
            { first: 2, last: 3, label: '2-3', text: 'Tweede testzin.' },
          ],
        },
      ],
    },
  ],
}));

const strings = stringsFor('nl');
const header = (label: string) => screen.getByLabelText(`${strings.bible.overline}: ${label}, ${BGT.name}`);

describe('BiblePassageAccordion', () => {
  beforeEach(() => jest.clearAllMocks());

  it('opens on a tap of the header and closes on the next, recording nothing', async () => {
    await render(<BiblePassageAccordion reference={{ book: 'JAS', chapter: 1, verseStart: 1, verseEnd: 3 }} />);
    expect(screen.getByRole('button', { name: `${strings.bible.overline}: Jakobus 1:1–3, ${BGT.name}`, expanded: false })).toBeTruthy();
    expect(screen.queryByText(/Eerste testzin/)).toBeNull();

    await fireEvent.press(header('Jakobus 1:1–3'));
    expect(screen.getByRole('button', { name: `${strings.bible.overline}: Jakobus 1:1–3, ${BGT.name}`, expanded: true })).toBeTruthy();
    expect(screen.getByText('Testkop')).toBeTruthy();
    expect(screen.getByText(/Eerste testzin/)).toBeTruthy();
    expect(screen.getByLabelText(strings.bible.verse('2-3'))).toBeTruthy();
    expect(screen.getByText(strings.bible.source(BGT.name, BGT.copyright))).toBeTruthy();

    await fireEvent.press(header('Jakobus 1:1–3'));
    expect(screen.queryByText(/Eerste testzin/)).toBeNull();
    expect(Object.values(mockActions).every((action) => action.mock.calls.length === 0)).toBe(true);
  });

  it('explains a missing passage and links to the publisher instead of opening empty', async () => {
    await render(<BiblePassageAccordion reference={{ book: 'LUK', chapter: 15, verseStart: 11, verseEnd: 32 }} />);
    await fireEvent.press(header('Lucas 15:11–32'));
    expect(screen.getByText(strings.bible.missing)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(strings.bible.openSource));
    expect(mockOpenBrowser).toHaveBeenCalledWith('https://www.debijbel.nl/bijbel/BGT/LUK.15');
  });
});
