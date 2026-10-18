import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { stringsFor } from '@/i18n/strings';
import { confirm } from '@/ui/confirm';

import { YouScreen } from '../you-screen';

const mockActions = {
  completeOnboarding: jest.fn(),
  restartOnboarding: jest.fn(),
  updatePreferences: jest.fn(),
  openLesson: jest.fn(),
  setLessonStep: jest.fn(),
  completeLesson: jest.fn(),
  eraseAllData: jest.fn(),
};

jest.mock('@/state/app-state', () => {
  const { stringsFor: strings } = jest.requireActual('@/i18n/strings');
  const { createDefaultState: createState } = jest.requireActual('@/storage/app-state-codec');
  return {
    useAppState: () => ({ ready: true, state: createState(), storageProblem: false, actions: mockActions }),
    useStrings: () => strings('nl'),
  };
});
jest.mock('@/ui/confirm', () => ({ confirm: jest.fn() }));
jest.mock('@/ui/icon', () => ({ Icon: () => null }));
jest.mock('@/ui/screen', () => {
  const { View } = jest.requireActual('react-native');
  return { Screen: ({ children }: { children: unknown }) => <View>{children as never}</View> };
});
jest.mock('@/ui/motion', () => {
  const { View } = jest.requireActual('react-native');
  return { FadeIn: ({ children }: { children: unknown }) => <View>{children as never}</View> };
});
jest.mock('expo-router', () => ({ useFocusEffect: jest.fn(), useRouter: () => ({ push: jest.fn() }) }));
jest.mock('@/features/reminders/reminders', () => ({
  remindersSupported: false,
  hasReminderPermission: jest.fn(async () => false),
  requestReminderPermission: jest.fn(async () => false),
}));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.2.3' } } }));

const confirmMock = confirm as jest.MockedFunction<typeof confirm>;
const you = stringsFor('nl').you;

beforeEach(() => jest.clearAllMocks());

describe('YouScreen', () => {
  it('shows defaults, the version and no fake account', async () => {
    await render(<YouScreen />);
    expect(screen.getByText(you.title)).toBeTruthy();
    expect(screen.getAllByText(stringsFor('nl').common.notChosen)).toHaveLength(2);
    expect(screen.getByText(you.noneCompleted)).toBeTruthy();
    expect(screen.getByText(you.reminderUnsupported)).toBeTruthy();
    expect(screen.getByText(you.version('1.2.3'))).toBeTruthy();
  });

  it('erases all data only after confirmation', async () => {
    confirmMock.mockResolvedValueOnce(false);
    await render(<YouScreen />);
    await fireEvent.press(screen.getByRole('button', { name: you.erase }));
    await waitFor(() => expect(confirmMock).toHaveBeenCalledTimes(1));
    expect(mockActions.eraseAllData).not.toHaveBeenCalled();

    confirmMock.mockResolvedValueOnce(true);
    mockActions.eraseAllData.mockResolvedValueOnce(undefined);
    await fireEvent.press(screen.getByRole('button', { name: you.erase }));
    await waitFor(() => expect(mockActions.eraseAllData).toHaveBeenCalledTimes(1));
    expect(confirmMock).toHaveBeenLastCalledWith(expect.objectContaining({ destructive: true }));
    expect(screen.queryByText(you.eraseFailed)).toBeNull();
  });

  it('shows an error when erasing fails', async () => {
    confirmMock.mockResolvedValueOnce(true);
    mockActions.eraseAllData.mockRejectedValueOnce(new Error('disk'));
    await render(<YouScreen />);
    await fireEvent.press(screen.getByRole('button', { name: you.erase }));
    expect(await screen.findByText(you.eraseFailed)).toBeTruthy();
  });

  it('restarts onboarding only after confirmation', async () => {
    confirmMock.mockResolvedValueOnce(false);
    await render(<YouScreen />);
    await fireEvent.press(screen.getByRole('button', { name: you.restart }));
    await waitFor(() => expect(confirmMock).toHaveBeenCalledTimes(1));
    expect(mockActions.restartOnboarding).not.toHaveBeenCalled();

    confirmMock.mockResolvedValueOnce(true);
    await fireEvent.press(screen.getByRole('button', { name: you.restart }));
    await waitFor(() => expect(mockActions.restartOnboarding).toHaveBeenCalledTimes(1));
  });
});
