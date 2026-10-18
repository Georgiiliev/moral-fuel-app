/* eslint-disable @typescript-eslint/no-require-imports -- jest.mock factories cannot use top-level imports */
import { fireEvent, render, screen } from '@testing-library/react-native';

import { formatReference, getLessonText, LESSONS } from '@/content';
import { BGT, getPassage } from '@/content/bible';
import { stringsFor } from '@/i18n/strings';

import { LearnStep } from '../learn-step';

jest.mock('expo-web-browser', () => ({ openBrowserAsync: jest.fn() }));
jest.mock('@/state/app-state', () => {
  const { createDefaultState } = require('@/storage/app-state-codec');
  const { stringsFor: strings } = require('@/i18n/strings');
  const state = createDefaultState();
  return {
    useAppState: () => ({ ready: true, state, storageProblem: false, actions: {} }),
    useStrings: () => strings('nl'),
  };
});
jest.mock('@/ui/motion', () => ({ FadeIn: ({ children }: { children: unknown }) => children, useReduceMotion: () => true }));
jest.mock('@/ui/icon', () => ({ Icon: () => null }));

const strings = stringsFor('nl');
const source = strings.bible.source(BGT.name, BGT.copyright);

// Runs against the bundled dataset: every reference opens to its full text or to an explanation.
describe.each(LESSONS.map((lesson) => [lesson.day, lesson] as const))('day %i', (_day, lesson) => {
  it('shows each passage as a reader that opens to text or an explanation', async () => {
    const text = getLessonText(lesson, 'nl');
    await render(
      <LearnStep
        title={text.title}
        passage={lesson.passage}
        related={lesson.relatedPassages}
        step={text.steps[0]}
        language="nl"
      />,
    );
    for (const reference of [lesson.passage, ...lesson.relatedPassages]) {
      const header = screen.getByLabelText(`${strings.bible.overline}: ${formatReference(reference, 'nl')}, ${BGT.name}`);
      await fireEvent.press(header);
      const shown = getPassage(reference).blocks.length > 0;
      expect(screen.queryAllByText(source).length > 0 || !shown).toBe(true);
      expect(screen.queryAllByText(strings.bible.missing).length > 0 || shown).toBe(true);
      await fireEvent.press(header);
    }
  });
});
