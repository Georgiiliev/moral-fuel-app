import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

import { addEntry } from '@/features/journal/journal';
import { KEY_BYTES, NONCE_BYTES, open, seal } from '@/storage/crypto';
import { eraseJournal, loadJournal, saveJournal } from '@/storage/journal-store';

const files = (FileSystem as unknown as { __files: Map<string, string> }).__files;
const keychain = (SecureStore as unknown as { __store: Map<string, string> }).__store;
const T = '2026-10-17T08:00:00.000Z';
const secret = 'Ik worstel met vergeven van mijn broer.';

beforeEach(() => {
  files.clear();
  keychain.clear();
});

describe('crypto', () => {
  const key = new Uint8Array(KEY_BYTES).fill(7);
  const nonce = new Uint8Array(NONCE_BYTES).fill(1);

  it('round-trips text, including accents and emoji', () => {
    expect(open(key, seal(key, 'Geloof, hoop en liefde ✨ – ë', nonce))).toBe('Geloof, hoop en liefde ✨ – ë');
  });

  it('refuses a changed ciphertext or a wrong key', () => {
    const sealed = seal(key, 'geheim', nonce);
    const tampered = { ...sealed, data: (sealed.data[0] === 'a' ? 'b' : 'a') + sealed.data.slice(1) };
    expect(() => open(key, tampered)).toThrow();
    expect(() => open(new Uint8Array(KEY_BYTES).fill(8), sealed)).toThrow();
  });
});

describe('journal store', () => {
  it('starts empty', async () => {
    expect(await loadJournal()).toEqual({ status: 'ready', entries: [] });
  });

  it('saves only ciphertext and reads the entries back', async () => {
    const entries = addEntry([], { id: 'a', createdAt: T, body: secret });
    await saveJournal(entries);
    const [stored] = [...files.values()];
    expect(stored).not.toContain('vergeven');
    expect(stored).not.toContain(secret);
    expect(keychain.size).toBe(1);
    expect(await loadJournal()).toEqual({ status: 'ready', entries });
  });

  it('reports an unreadable journal when the key is gone, instead of guessing', async () => {
    await saveJournal(addEntry([], { id: 'a', createdAt: T, body: secret }));
    keychain.clear();
    expect(await loadJournal()).toEqual({ status: 'unreadable' });
  });

  it('reports an unreadable journal when the file is damaged', async () => {
    await saveJournal(addEntry([], { id: 'a', createdAt: T, body: secret }));
    const [uri] = [...files.keys()];
    files.set(uri, '{"v":1,"nonce":"00","da');
    expect(await loadJournal()).toEqual({ status: 'unreadable' });
  });

  it('erases the file and the key', async () => {
    await saveJournal(addEntry([], { id: 'a', createdAt: T, body: secret }));
    await eraseJournal();
    expect(files.size).toBe(0);
    expect(keychain.size).toBe(0);
    expect(await loadJournal()).toEqual({ status: 'ready', entries: [] });
  });
});
