import { normalize } from '@/features/explore/search';

/** Longest journal entry, in characters. */
export const JOURNAL_ENTRY_MAX_LENGTH = 5000;

export interface JournalEntry {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  /** Set when the entry is the reflection written in a lesson; one per lesson. */
  lessonId?: string;
}

const byNewest = (a: JournalEntry, b: JournalEntry) => b.createdAt.localeCompare(a.createdAt);

export function addEntry(entries: JournalEntry[], entry: Omit<JournalEntry, 'updatedAt'>): JournalEntry[] {
  const body = entry.body.slice(0, JOURNAL_ENTRY_MAX_LENGTH);
  return [{ ...entry, body, updatedAt: entry.createdAt }, ...entries].sort(byNewest);
}

export function updateEntry(entries: JournalEntry[], id: string, body: string, now: string): JournalEntry[] {
  return entries.map((e) => (e.id === id ? { ...e, body: body.slice(0, JOURNAL_ENTRY_MAX_LENGTH), updatedAt: now } : e));
}

export function deleteEntry(entries: JournalEntry[], id: string): JournalEntry[] {
  return entries.filter((e) => e.id !== id);
}

export const lessonEntry = (entries: JournalEntry[], lessonId: string) =>
  entries.find((e) => e.lessonId === lessonId);

/**
 * Writes the reflection of a lesson: creates its entry, updates it, or removes it when the text is
 * cleared, so a lesson never has two reflections and an empty answer leaves nothing behind.
 */
export function setLessonReflection(
  entries: JournalEntry[],
  lessonId: string,
  body: string,
  now: string,
  newId: () => string,
): JournalEntry[] {
  const existing = lessonEntry(entries, lessonId);
  if (!body.trim()) return existing ? deleteEntry(entries, existing.id) : entries;
  if (existing) return updateEntry(entries, existing.id, body, now);
  return addEntry(entries, { id: newId(), createdAt: now, body, lessonId });
}

/** Every word must occur in the entry; lesson titles count too, so "genade" finds day 4's reflection. */
export function searchEntries(
  entries: JournalEntry[],
  query: string,
  lessonTitle: (lessonId: string) => string | undefined,
): JournalEntry[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return entries;
  return entries.filter((entry) => {
    const text = normalize(`${entry.body} ${entry.lessonId ? (lessonTitle(entry.lessonId) ?? '') : ''}`);
    return words.every((word) => text.includes(word));
  });
}

/** Groups entries (already newest first) by their local calendar day. */
export function groupByDay(entries: JournalEntry[]): { day: string; entries: JournalEntry[] }[] {
  const groups: { day: string; entries: JournalEntry[] }[] = [];
  for (const entry of entries) {
    const day = localDay(entry.createdAt);
    const last = groups[groups.length - 1];
    if (last?.day === day) last.entries.push(entry);
    else groups.push({ day, entries: [entry] });
  }
  return groups;
}

export function localDay(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const isEntry = (value: unknown): value is JournalEntry => {
  const e = value as JournalEntry;
  return (
    typeof e === 'object' && e !== null &&
    typeof e.id === 'string' && typeof e.body === 'string' &&
    typeof e.createdAt === 'string' && !Number.isNaN(Date.parse(e.createdAt)) &&
    typeof e.updatedAt === 'string' &&
    (e.lessonId === undefined || typeof e.lessonId === 'string')
  );
};

export const JOURNAL_VERSION = 1;

/** Reads decrypted journal JSON, keeping every valid entry and dropping broken ones. */
export function parseJournal(json: string): JournalEntry[] {
  const data = JSON.parse(json) as { version?: number; entries?: unknown[] };
  if (data.version !== JOURNAL_VERSION || !Array.isArray(data.entries)) throw new Error('Unknown journal format');
  const seen = new Set<string>();
  return data.entries.filter((e): e is JournalEntry => isEntry(e) && !seen.has(e.id) && !!seen.add(e.id)).sort(byNewest);
}

export const serializeJournal = (entries: JournalEntry[]) => JSON.stringify({ version: JOURNAL_VERSION, entries });
