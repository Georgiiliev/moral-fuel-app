import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { AppState as NativeAppState, Text } from 'react-native';

import { getDayViews } from '@/content';
import { completeLesson } from '@/features/progress/progress';
import { useWidgetSync } from '@/features/widgets/use-widget-sync';
import { WidgetGalleryScreen } from '@/features/widgets/widget-gallery-screen';
import type { AppState } from '@/models/user';
import { makeStore, nlStrings } from '@/test-utils/test-store';

const mockPublish = jest.fn();
jest.mock('@/features/widgets/publish', () => ({
  widgetsSupported: true,
  publishWidgetBundle: (bundle: unknown) => mockPublish(bundle),
}));

let mockStore = makeStore();
jest.mock('@/state/app-state', () => ({
  useAppState: () => mockStore,
  useStrings: () => jest.requireActual<typeof import('@/i18n/strings')>('@/i18n/strings').stringsFor('nl'),
}));
jest.mock('expo-router', () => ({ useRouter: () => ({ back: jest.fn(), canGoBack: () => true, replace: jest.fn() }) }));

const days = getDayViews('nl');
const T = '2026-10-01T08:00:00.000Z';

function Probe() {
  useWidgetSync();
  return <Text>probe</Text>;
}

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 9, 18, 9, 0));
  mockPublish.mockClear();
  mockStore = makeStore();
});
afterEach(() => jest.useRealTimers());

const settle = () => act(() => jest.advanceTimersByTime(1000));

describe('widget sync', () => {
  it('publishes once the app state is ready, and not again while nothing changed', async () => {
    const view = await render(<Probe />);
    await settle();
    expect(mockPublish).toHaveBeenCalledTimes(1);
    mockStore = { ...mockStore };
    await view.rerender(<Probe />);
    await settle();
    expect(mockPublish).toHaveBeenCalledTimes(1);
  });

  it('publishes again after a lesson is completed, with the new progress', async () => {
    const view = await render(<Probe />);
    await settle();
    const state: AppState = { ...mockStore.state, progress: completeLesson({}, days[0].lessonId!, T) };
    mockStore = { ...mockStore, state };
    await view.rerender(<Probe />);
    await settle();
    expect(mockPublish).toHaveBeenCalledTimes(2);
    expect(mockPublish.mock.calls[1][0].progress.progress.completed).toBe(1);
  });

  it('publishes after an erase, so old progress disappears from widgets', async () => {
    mockStore = makeStore({ progress: completeLesson({}, days[0].lessonId!, T) });
    const view = await render(<Probe />);
    await settle();
    mockStore = makeStore({ onboardingCompleted: false, progress: {} });
    await view.rerender(<Probe />);
    await settle();
    expect(mockPublish.mock.calls.at(-1)[0].progress.progress).toMatchObject({ state: 'new', completed: 0 });
  });

  it('picks up a new day when the app comes back to the foreground', async () => {
    const listeners: ((state: string) => void)[] = [];
    jest.spyOn(NativeAppState, 'addEventListener').mockImplementation((_type, listener) => {
      listeners.push(listener as (state: string) => void);
      return { remove: jest.fn() } as never;
    });
    await render(<Probe />);
    await settle();
    jest.setSystemTime(new Date(2026, 9, 19, 8, 0));
    await act(() => listeners.forEach((listener) => listener('active')));
    expect(mockPublish).toHaveBeenCalledTimes(2);
  });

  it('does nothing until the stored state has loaded', async () => {
    mockStore = { ...makeStore(), ready: false };
    await render(<Probe />);
    await settle();
    expect(mockPublish).not.toHaveBeenCalled();
  });
});

describe('widget gallery', () => {
  it('labels previews as previews and offers no fake add button', async () => {
    await render(<WidgetGalleryScreen />);
    expect(screen.getAllByText(nlStrings.widgetGallery.preview).length).toBe(5);
    expect(screen.queryByRole('button', { name: /toevoeg|voeg .*toe|add/i })).toBeNull();
  });

  it('keeps Lock Screen progress off until the user switches it on', async () => {
    await render(<WidgetGalleryScreen />);
    const toggle = screen.getByLabelText(nlStrings.widgetGallery.privacySwitch);
    expect(toggle.props.value).toBe(false);
    await fireEvent(toggle, 'valueChange', true);
    expect(mockStore.actions.updatePreferences).toHaveBeenCalledWith({ lockScreenProgress: true });
  });
});
