import { createContext, use, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react';

import { LESSONS } from '@/content';
import type { OnboardingAnswers } from '@/features/preferences/preferences';
import { REMINDER_OFF } from '@/features/preferences/preferences';
import { syncReminder } from '@/features/reminders/reminders';
import { stringsFor } from '@/i18n/strings';
import type { AppState, UserPreferences } from '@/models/user';
import { createDefaultState } from '@/storage/app-state-codec';
import { clearAppState, loadAppState, saveAppState } from '@/storage/app-state-storage';
import { eraseJournal } from '@/storage/journal-store';
import { deleteLegacyReflection, resetLegacyImport } from '@/storage/legacy-reflections';

import { appReducer } from './app-state-reducer';

interface AppStore {
  ready: boolean;
  state: AppState;
  /** True when the device storage failed; progress may not survive a restart. */
  storageProblem: boolean;
  /** Goes up each time all data is erased, so stores outside this provider reload. */
  dataEpoch: number;
  actions: {
    completeOnboarding: (answers: OnboardingAnswers) => void;
    restartOnboarding: () => void;
    updatePreferences: (patch: Partial<UserPreferences>) => void;
    openLesson: (lessonId: string) => void;
    setLessonStep: (lessonId: string, stepIndex: number) => void;
    completeLesson: (lessonId: string) => void;
    eraseAllData: () => Promise<void>;
  };
}

const AppStateContext = createContext<AppStore | null>(null);

const now = () => new Date().toISOString();

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, createDefaultState);
  const [ready, setReady] = useState(false);
  const [storageProblem, setStorageProblem] = useState(false);
  const [dataEpoch, setDataEpoch] = useState(0);
  const skipNextSave = useRef(true);

  useEffect(() => {
    loadAppState()
      .then((stored) => dispatch({ type: 'hydrated', state: stored }))
      .catch(() => setStorageProblem(true))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    saveAppState(state).then(
      () => setStorageProblem(false),
      () => setStorageProblem(true),
    );
  }, [ready, state]);

  const { enabled, hour, minute } = state.preferences.reminder;
  const language = state.preferences.language;
  useEffect(() => {
    if (!ready) return;
    syncReminder({ enabled, hour, minute }, stringsFor(language).reminderMessage)
      .then((scheduled) => {
        // Permission was withdrawn in the system settings: never show a reminder as on when it is not.
        if (!scheduled) dispatch({ type: 'preferences-updated', patch: { reminder: REMINDER_OFF } });
      })
      .catch(() => {});
  }, [ready, enabled, hour, minute, language]);

  const actions = useMemo<AppStore['actions']>(
    () => ({
      completeOnboarding: (answers) => dispatch({ type: 'onboarding-completed', answers }),
      restartOnboarding: () => dispatch({ type: 'onboarding-restarted' }),
      updatePreferences: (patch) => dispatch({ type: 'preferences-updated', patch }),
      openLesson: (lessonId) => dispatch({ type: 'lesson-opened', lessonId, now: now() }),
      setLessonStep: (lessonId, stepIndex) => dispatch({ type: 'lesson-step', lessonId, stepIndex, now: now() }),
      completeLesson: (lessonId) => dispatch({ type: 'lesson-completed', lessonId, now: now() }),
      eraseAllData: async () => {
        await Promise.all([
          clearAppState(),
          eraseJournal(),
          resetLegacyImport(),
          ...LESSONS.map((lesson) => deleteLegacyReflection(lesson.id)),
        ]);
        skipNextSave.current = true; // nothing is written back after an erase
        dispatch({ type: 'reset' });
        setDataEpoch((epoch) => epoch + 1);
      },
    }),
    [],
  );

  const store = useMemo(
    () => ({ ready, state, storageProblem, dataEpoch, actions }),
    [ready, state, storageProblem, dataEpoch, actions],
  );
  return <AppStateContext value={store}>{children}</AppStateContext>;
}

export function useAppState(): AppStore {
  const store = use(AppStateContext);
  if (!store) throw new Error('useAppState must be used inside AppStateProvider');
  return store;
}

export function useStrings() {
  return stringsFor(useAppState().state.preferences.language);
}
