import type { JournalEntry } from './journal';

/** Plain text of the whole journal, oldest first, for a user-initiated share. */
export function buildJournalExport(
  entries: JournalEntry[],
  header: string,
  heading: (entry: JournalEntry) => string,
): string {
  const body = [...entries]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((entry) => `${heading(entry)}\n\n${entry.body.trim()}`)
    .join('\n\n———\n\n');
  return `${header}\n\n${body}\n`;
}
