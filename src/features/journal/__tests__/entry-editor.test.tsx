import { fireEvent, render, screen } from '@testing-library/react-native';

import { EntryEditor } from '@/features/journal/entry-editor';
import { makeStore, nlStrings } from '@/test-utils/test-store';

const mockActions = {
  createEntry: jest.fn(() => 'new-id'),
  updateEntry: jest.fn(),
  deleteEntry: jest.fn(),
  setLessonReflection: jest.fn(),
  flush: jest.fn(),
  startOver: jest.fn(),
};
jest.mock('@/state/journal', () => ({
  useJournal: () => ({ status: 'ready', entries: [], persists: true, saveFailed: false, actions: mockActions }),
}));
jest.mock('@/state/app-state', () => ({
  useAppState: () => jest.requireActual<typeof import('@/test-utils/test-store')>('@/test-utils/test-store').makeStore(),
  useStrings: () => jest.requireActual<typeof import('@/i18n/strings')>('@/i18n/strings').stringsFor('nl'),
}));
jest.mock('expo-router', () => ({ useRouter: () => ({ back: jest.fn(), canGoBack: () => true, replace: jest.fn(), push: jest.fn() }) }));

beforeEach(() => jest.clearAllMocks());

describe('EntryEditor', () => {
  it('creates one entry however fast the first characters arrive', async () => {
    makeStore();
    await render(<EntryEditor id="new" />);
    const input = screen.getByLabelText(nlStrings.journal.editorLabel);
    await fireEvent.changeText(input, 'D');
    await fireEvent.changeText(input, 'Da');
    await fireEvent.changeText(input, 'Dan');
    expect(mockActions.createEntry).toHaveBeenCalledTimes(1);
    expect(mockActions.updateEntry).toHaveBeenLastCalledWith('new-id', 'Dan');
  });

  it('writes a lesson reflection through the lesson, so a lesson never gets two', async () => {
    await render(<EntryEditor id="new" lessonId="day-01-why-believe" />);
    await fireEvent.changeText(screen.getByLabelText(nlStrings.journal.editorLabel), 'Mijn vraag');
    expect(mockActions.setLessonReflection).toHaveBeenCalledWith('day-01-why-believe', 'Mijn vraag');
    expect(mockActions.createEntry).not.toHaveBeenCalled();
  });
});
