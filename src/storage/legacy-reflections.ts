import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { lessonEntry, setLessonReflection, type JournalEntry } from '@/features/journal/journal';

/**
 * Phase 1 kept one reflection per lesson in SecureStore, split over up to four keys. Phase 2 keeps
 * them in the encrypted journal. This moves them across once and then deletes the old keys.
 */
const CHUNKS = 4;
const DONE_KEY = 'moralfuel.migration.reflections-to-journal';
const keyFor = (lessonId: string, index: number) => `moralfuel.reflection.${lessonId}.${index}`;
const indexes = Array.from({ length: CHUNKS }, (_, i) => i);

export async function deleteLegacyReflection(lessonId: string): Promise<void> {
  await Promise.all(indexes.map((i) => SecureStore.deleteItemAsync(keyFor(lessonId, i))));
}

/** Returns the journal with the old reflections added (an entry already in the journal wins). */
export async function importLegacyReflections(
  entries: JournalEntry[],
  lessonIds: readonly string[],
  now: string,
  newId: () => string,
): Promise<{ entries: JournalEntry[]; imported: number; pending: boolean }> {
  if ((await AsyncStorage.getItem(DONE_KEY)) === 'done') return { entries, imported: 0, pending: false };
  let next = entries;
  let imported = 0;
  for (const lessonId of lessonIds) {
    const parts = await Promise.all(indexes.map((i) => SecureStore.getItemAsync(keyFor(lessonId, i))));
    const text = parts.map((part) => part ?? '').join('');
    if (text.trim() && !lessonEntry(next, lessonId)) {
      next = setLessonReflection(next, lessonId, text, now, newId);
      imported += 1;
    }
  }
  return { entries: next, imported, pending: true };
}

/** Called after the imported entries are safely saved in the journal. */
export async function finishLegacyImport(lessonIds: readonly string[]): Promise<void> {
  await Promise.all(lessonIds.map(deleteLegacyReflection));
  await AsyncStorage.setItem(DONE_KEY, 'done');
}

export async function resetLegacyImport(): Promise<void> {
  await AsyncStorage.removeItem(DONE_KEY);
}
