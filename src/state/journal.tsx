import * as Crypto from 'expo-crypto';
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AppState as NativeAppState } from 'react-native';

import { LESSONS } from '@/content';
import * as Journal from '@/features/journal/journal';
import type { JournalEntry } from '@/features/journal/journal';
import { eraseJournal, journalPersists, loadJournal, saveJournal } from '@/storage/journal-store';
import { finishLegacyImport, importLegacyReflections } from '@/storage/legacy-reflections';

import { useAppState } from './app-state';

export type JournalStatus = 'loading' | 'ready' | 'unreadable';

interface JournalStore {
  status: JournalStatus;
  entries: JournalEntry[];
  /** False on the web: entries live only as long as the tab. */
  persists: boolean;
  saveFailed: boolean;
  actions: {
    createEntry: (body: string) => string;
    updateEntry: (id: string, body: string) => void;
    deleteEntry: (id: string) => void;
    setLessonReflection: (lessonId: string, body: string) => void;
    /** Writes pending changes now, e.g. when an editor closes. */
    flush: () => void;
    /** Throws away a journal that can no longer be decrypted and starts an empty one. */
    startOver: () => Promise<void>;
  };
}

const JournalContext = createContext<JournalStore | null>(null);
const SAVE_DELAY_MS = 500;
const now = () => new Date().toISOString();
const lessonIds = LESSONS.map((lesson) => lesson.id);

/**
 * Holds the decrypted journal in memory and is the only writer of the journal store. Writes are
 * debounced, run one after another, and are flushed when the app goes to the background.
 */
export function JournalProvider({ children }: { children: ReactNode }) {
  const { dataEpoch } = useAppState();
  // Status of the load that belongs to the current data epoch; an older one means loading again.
  const [loaded, setLoaded] = useState<{ epoch: number; status: Exclude<JournalStatus, 'loading'> } | null>(null);
  const status: JournalStatus = loaded?.epoch === dataEpoch ? loaded.status : 'loading';
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [saveFailed, setSaveFailed] = useState(false);
  const latest = useRef<JournalEntry[]>([]);
  const dirty = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const queue = useRef<Promise<void>>(Promise.resolve());

  const flush = useCallback(() => {
    clearTimeout(timer.current);
    if (!dirty.current) return;
    dirty.current = false;
    const snapshot = latest.current;
    queue.current = queue.current
      .then(() => saveJournal(snapshot))
      .then(
        () => setSaveFailed(false),
        () => setSaveFailed(true),
      );
  }, []);

  const change = useCallback(
    (update: (current: JournalEntry[]) => JournalEntry[]) => {
      latest.current = update(latest.current);
      dirty.current = true;
      setEntries(latest.current);
      clearTimeout(timer.current);
      timer.current = setTimeout(flush, SAVE_DELAY_MS);
    },
    [flush],
  );

  useEffect(() => {
    let active = true;
    (async () => {
      const stored = await loadJournal();
      if (!active) return;
      if (stored.status === 'unreadable') {
        setLoaded({ epoch: dataEpoch, status: 'unreadable' });
        return;
      }
      const { entries: withImported, imported, pending } = await importLegacyReflections(
        stored.entries,
        lessonIds,
        now(),
        Crypto.randomUUID,
      );
      if (imported > 0) await saveJournal(withImported);
      if (pending) await finishLegacyImport(lessonIds);
      if (!active) return;
      latest.current = withImported;
      setEntries(withImported);
      setLoaded({ epoch: dataEpoch, status: 'ready' });
    })().catch(() => active && setLoaded({ epoch: dataEpoch, status: 'unreadable' }));
    return () => {
      active = false;
    };
  }, [dataEpoch]);

  useEffect(() => {
    const subscription = NativeAppState.addEventListener('change', (next) => {
      if (next !== 'active') flush();
    });
    return () => {
      subscription.remove();
      flush();
    };
  }, [flush]);

  const actions = useMemo<JournalStore['actions']>(
    () => ({
      createEntry: (body) => {
        const id = Crypto.randomUUID();
        change((current) => Journal.addEntry(current, { id, createdAt: now(), body }));
        return id;
      },
      updateEntry: (id, body) => change((current) => Journal.updateEntry(current, id, body, now())),
      deleteEntry: (id) => change((current) => Journal.deleteEntry(current, id)),
      setLessonReflection: (lessonId, body) =>
        change((current) => Journal.setLessonReflection(current, lessonId, body, now(), Crypto.randomUUID)),
      flush,
      startOver: async () => {
        await eraseJournal();
        latest.current = [];
        dirty.current = false;
        setEntries([]);
        setLoaded({ epoch: dataEpoch, status: 'ready' });
      },
    }),
    [change, flush, dataEpoch],
  );

  const store = useMemo(
    () => ({ status, entries, persists: journalPersists, saveFailed, actions }),
    [status, entries, saveFailed, actions],
  );
  return <JournalContext value={store}>{children}</JournalContext>;
}

export function useJournal(): JournalStore {
  const store = use(JournalContext);
  if (!store) throw new Error('useJournal must be used inside JournalProvider');
  return store;
}
