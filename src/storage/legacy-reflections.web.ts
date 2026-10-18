import type { JournalEntry } from '@/features/journal/journal';

/** Phase 1 never stored reflections on the web, so there is nothing to move. */
export async function deleteLegacyReflection(_lessonId: string): Promise<void> {}

export async function importLegacyReflections(
  entries: JournalEntry[],
  _lessonIds: readonly string[],
  _now: string,
  _newId: () => string,
): Promise<{ entries: JournalEntry[]; imported: number; pending: boolean }> {
  return { entries, imported: 0, pending: false };
}

export async function finishLegacyImport(_lessonIds: readonly string[]): Promise<void> {}

export async function resetLegacyImport(): Promise<void> {}
