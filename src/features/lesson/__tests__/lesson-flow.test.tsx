/* eslint-disable @typescript-eslint/no-require-imports -- jest.mock factories cannot use top-level imports */
import { fireEvent, render, screen } from '@testing-library/react-native';

import { getLesson } from '@/content';
import { stringsFor } from '@/i18n/strings';

import { LessonFlow } from '../lesson-flow';

const mockActions = {
  openLesson: jest.fn(),
  setLessonStep: jest.fn(),
  completeLesson: jest.fn(),
};
const mockRouter = { back: jest.fn(), replace: jest.fn(), canGoBack: jest.fn(() => true) };

jest.mock('expo-router', () => ({ useRouter: () => mockRouter }));
jest.mock('expo-haptics', () => ({
  notificationAsync: jest.fn(() => Promise.resolve()),
  NotificationFeedbackType: { Success: 'success' },
}));
jest.mock('@/state/app-state', () => {
  const { createDefaultState } = require('@/storage/app-state-codec');
  const { stringsFor: strings } = require('@/i18n/strings');
  const state = createDefaultState();
  return {
    useAppState: () => ({ ready: true, state, storageProblem: false, actions: mockActions }),
    useStrings: () => strings('nl'),
  };
});
const mockSetLessonReflection = jest.fn();
jest.mock('@/state/journal', () => ({
  useJournal: () => ({
    status: 'ready',
    entries: [],
    persists: true,
    saveFailed: false,
    actions: { setLessonReflection: mockSetLessonReflection, flush: jest.fn() },
  }),
}));
jest.mock('@/ui/motion', () => ({ FadeIn: ({ children }: { children: unknown }) => children, useReduceMotion: () => true }));
jest.mock('@/ui/icon', () => ({ Icon: () => null }));
const strings = stringsFor('nl');
const lesson = getLesson('day-01-why-believe')!;

describe('LessonFlow', () => {
  beforeEach(() => jest.clearAllMocks());

  it('opens the lesson, walks learn → reflect → live and completes without any reflection', async () => {
    await render(<LessonFlow lesson={lesson} />);
    expect(mockActions.openLesson).toHaveBeenCalledWith(lesson.id);

    // Learn: previous is hidden on the first step.
    expect(screen.getByText(strings.lesson.bigIdea)).toBeTruthy();
    expect(screen.queryByLabelText(strings.lesson.previous)).toBeNull();
    expect(screen.getByLabelText(`${strings.common.stepOf(1, 3)}: Leer`)).toBeTruthy();

    // Reflect: nothing is typed, and Next still works.
    await fireEvent.press(screen.getByLabelText(strings.lesson.next));
    expect(mockActions.setLessonStep).toHaveBeenLastCalledWith(lesson.id, 1);
    expect(screen.getByLabelText(strings.lesson.reflectLabel)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(strings.lesson.next));
    expect(mockActions.setLessonStep).toHaveBeenLastCalledWith(lesson.id, 2);

    // Live: the optional prayer is labelled, and finishing completes the lesson.
    expect(screen.getByText(strings.lesson.finishNote)).toBeTruthy();
    expect(mockActions.completeLesson).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByLabelText(strings.lesson.finish));
    expect(mockActions.completeLesson).toHaveBeenCalledWith(lesson.id);
    expect(mockSetLessonReflection).not.toHaveBeenCalled();

    // Completion view.
    expect(screen.getByText(strings.lesson.doneTitle)).toBeTruthy();
    expect(screen.getByText(strings.lesson.doneBody(lesson.day))).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(strings.lesson.doneToday));
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('lets the reader review the lesson again after finishing', async () => {
    await render(<LessonFlow lesson={lesson} />);
    await fireEvent.press(screen.getByLabelText(strings.lesson.next));
    await fireEvent.press(screen.getByLabelText(strings.lesson.next));
    await fireEvent.press(screen.getByLabelText(strings.lesson.finish));
    await fireEvent.press(screen.getByLabelText(strings.lesson.doneReview));
    expect(screen.getByText(strings.lesson.bigIdea)).toBeTruthy();
  });
});
