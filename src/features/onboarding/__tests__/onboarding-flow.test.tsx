import { fireEvent, render, screen } from '@testing-library/react-native';

import { OnboardingFlow } from '@/features/onboarding/onboarding-flow';
import { REMINDER_OFF } from '@/features/preferences/preferences';
import { nl } from '@/i18n/nl';

const mockCompleteOnboarding = jest.fn();
const mockRequestPermission = jest.fn();

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn(), back: jest.fn() }) }));

jest.mock('@/features/reminders/reminders', () => ({
  remindersSupported: true,
  requestReminderPermission: (...args: unknown[]) => mockRequestPermission(...args),
  hasReminderPermission: jest.fn(),
}));

jest.mock('@/state/app-state', () => {
  const { nl: strings } = jest.requireActual('@/i18n/nl');
  return {
    useStrings: () => strings,
    useAppState: () => ({
      state: { preferences: { language: 'nl', reduceMotion: true }, progress: {}, onboardingCompleted: false },
      storageProblem: false,
      actions: { completeOnboarding: mockCompleteOnboarding },
    }),
  };
});

jest.mock('react-native-reanimated', () => {
  const { View } = jest.requireActual('react-native');
  return { __esModule: true, default: { View }, FadeInDown: { duration: () => ({ delay: () => ({}) }) }, useReducedMotion: () => true };
});

jest.mock('expo-symbols', () => ({ SymbolView: () => null }));

describe('OnboardingFlow', () => {
  beforeEach(() => jest.clearAllMocks());

  it('walks all five steps, skipping interest and time, and saves empty answers with the reminder off', async () => {
    await render(<OnboardingFlow />);

    expect(screen.getByText(nl.common.stepOf(1, 5))).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(nl.onboarding.welcome.cta));

    expect(screen.getByText(nl.common.stepOf(2, 5))).toBeTruthy();
    expect(screen.getByText(nl.onboarding.interest.title)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(nl.common.skip));

    expect(screen.getByText(nl.onboarding.time.title)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(nl.common.skip));

    expect(screen.getByText(nl.onboarding.reminder.title)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(nl.common.continue));
    expect(mockRequestPermission).not.toHaveBeenCalled();

    expect(screen.getByText(nl.onboarding.start.title)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(nl.onboarding.start.cta));

    expect(mockCompleteOnboarding).toHaveBeenCalledWith({
      interest: null,
      dailyMinutes: null,
      reminder: REMINDER_OFF,
    });
  });

  it('goes back one step and keeps the reminder off when permission is refused', async () => {
    mockRequestPermission.mockResolvedValue(false);
    await render(<OnboardingFlow />);
    await fireEvent.press(screen.getByLabelText(nl.onboarding.welcome.cta));
    await fireEvent.press(screen.getByLabelText(nl.common.skip));
    await fireEvent.press(screen.getByLabelText(nl.common.back));
    expect(screen.getByText(nl.onboarding.interest.title)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(nl.common.skip));
    await fireEvent.press(screen.getByLabelText(nl.common.skip));

    await fireEvent.press(screen.getByLabelText(nl.reminderTimes.morning));
    await fireEvent.press(screen.getByLabelText(nl.common.continue));

    expect(await screen.findByText(nl.onboarding.reminder.denied)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(nl.common.continue));
    await fireEvent.press(screen.getByLabelText(nl.onboarding.start.cta));
    expect(mockCompleteOnboarding).toHaveBeenCalledWith(expect.objectContaining({ reminder: REMINDER_OFF }));
  });
});
