import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { addEntry } from '@/features/journal/journal';
import { finishLegacyImport, importLegacyReflections } from '@/storage/legacy-reflections';

const keychain = (SecureStore as unknown as { __store: Map<string, string> }).__store;
const T = '2026-10-17T08:00:00.000Z';
const ids = ['day-01-why-believe', 'day-04-grace-forgiveness'];
let n = 0;
const newId = () => `new-${++n}`;

beforeEach(async () => {
  keychain.clear();
  await AsyncStorage.clear();
});

describe('moving Phase 1 reflections into the journal', () => {
  it('imports split reflections once, then removes the old keys', async () => {
    keychain.set('moralfuel.reflection.day-01-why-believe.0', 'Mijn vraag is ');
    keychain.set('moralfuel.reflection.day-01-why-believe.1', 'of God luistert.');
    const first = await importLegacyReflections([], ids, T, newId);
    expect(first).toMatchObject({ imported: 1, pending: true });
    expect(first.entries[0]).toMatchObject({ lessonId: 'day-01-why-believe', body: 'Mijn vraag is of God luistert.' });

    await finishLegacyImport(ids);
    expect(keychain.size).toBe(0);
    expect(await importLegacyReflections(first.entries, ids, T, newId)).toMatchObject({ imported: 0, pending: false });
  });

  it('never overwrites a reflection that is already in the journal', async () => {
    keychain.set('moralfuel.reflection.day-04-grace-forgiveness.0', 'oud');
    const journal = addEntry([], { id: 'x', createdAt: T, body: 'nieuw', lessonId: 'day-04-grace-forgiveness' });
    const result = await importLegacyReflections(journal, ids, T, newId);
    expect(result.imported).toBe(0);
    expect(result.entries).toEqual(journal);
  });
});
