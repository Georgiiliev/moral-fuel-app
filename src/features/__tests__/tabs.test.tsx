import { fireEvent, render, screen } from '@testing-library/react-native';

import { getDayViews } from '@/content';
import { DayRow } from '@/features/journey/day-row';
import { TodayScreen } from '@/features/today/today-screen';

import { makeStore, nlStrings, plannedDay } from '@/test-utils/test-store';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, navigate: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

let mockStore = makeStore();
jest.mock('@/state/app-state', () => ({
  useAppState: () => mockStore,
  useStrings: () => jest.requireActual<typeof import('@/i18n/strings')>('@/i18n/strings').stringsFor('nl'),
}));

const days = getDayViews('nl');

beforeEach(() => {
  mockPush.mockClear();
  mockStore = makeStore();
});

describe('Today', () => {
  it('shows the first lesson from the real content and opens it', async () => {
    await render(<TodayScreen />);
    expect(screen.getByText(days[0].title)).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: nlStrings.today.start }));
    expect(mockPush).toHaveBeenCalledWith({ pathname: '/lesson/[id]', params: { id: days[0].lessonId } });
  });

  it('offers to resume an unfinished lesson at its step', async () => {
    mockStore = makeStore({
      progress: {
        [days[2].lessonId!]: {
          lessonId: days[2].lessonId!,
          status: 'in-progress',
          stepIndex: 1,
          startedAt: '2026-10-01T08:00:00.000Z',
          updatedAt: '2026-10-01T08:00:00.000Z',
        },
      },
    });
    await render(<TodayScreen />);
    expect(screen.getByText(days[2].title)).toBeTruthy();
    expect(screen.getByRole('button', { name: nlStrings.today.resume(2) })).toBeTruthy();
  });
});

describe('DayRow', () => {
  it('opens an available lesson', async () => {
    await render(<DayRow day={days[3]} />);
    await fireEvent.press(screen.getByRole('button', { name: new RegExp(days[3].title) }));
    expect(mockPush).toHaveBeenCalledWith({ pathname: '/lesson/[id]', params: { id: days[3].lessonId } });
  });

  it('never opens a planned day, but can show its objective', async () => {
    await render(<DayRow day={plannedDay} />);
    expect(screen.queryByRole('button', { name: new RegExp(`^${nlStrings.common.day(31)}`) })).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: new RegExp(nlStrings.journey.showObjective) }));
    expect(screen.getByText(plannedDay.objective)).toBeTruthy();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
