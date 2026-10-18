import type { JournalEntry } from '@/features/journal/journal';

import type { JournalLoad } from './journal-store';

/**
 * The web has no secure key storage, so the journal is never written to the browser: entries live
 * in memory and disappear when the tab closes. The journal screen says so.
 */
export const journalPersists = false;

let memory: JournalEntry[] = [];

export async function loadJournal(): Promise<JournalLoad> {
  return { status: 'ready', entries: memory };
}

export async function saveJournal(entries: JournalEntry[]): Promise<void> {
  memory = entries;
}

export async function eraseJournal(): Promise<void> {
  memory = [];
}
