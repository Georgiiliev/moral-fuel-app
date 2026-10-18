import * as Crypto from 'expo-crypto';
import { File, Paths } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

import { parseJournal, serializeJournal, type JournalEntry } from '@/features/journal/journal';

import { KEY_BYTES, NONCE_BYTES, keyFromText, keyToText, open, seal, type Sealed } from './crypto';

/**
 * Native journal storage. The entries are encrypted with a random key that never leaves the
 * device's secure storage (iOS Keychain, Android Keystore); only ciphertext is written to the
 * app's document folder. Nothing is ever written in plain text.
 */
export const journalPersists = true;

const KEY_NAME = 'moralfuel.journal.key.v1';
const journalFile = () => new File(Paths.document, 'journal.v1.json');

export type JournalLoad = { status: 'ready'; entries: JournalEntry[] } | { status: 'unreadable' };

async function readKey(): Promise<Uint8Array | null> {
  const text = await SecureStore.getItemAsync(KEY_NAME);
  return text ? keyFromText(text) : null;
}

async function keyForWriting(): Promise<Uint8Array> {
  const existing = await readKey();
  if (existing) return existing;
  const key = await Crypto.getRandomBytesAsync(KEY_BYTES);
  await SecureStore.setItemAsync(KEY_NAME, keyToText(key));
  return key;
}

export async function loadJournal(): Promise<JournalLoad> {
  const file = journalFile();
  if (!file.exists) return { status: 'ready', entries: [] };
  try {
    const key = await readKey();
    if (!key) return { status: 'unreadable' };
    const sealed = JSON.parse(await file.text()) as Sealed;
    return { status: 'ready', entries: parseJournal(open(key, sealed)) };
  } catch {
    // A file restored without its key, or a damaged file: never guess, never show garbage.
    return { status: 'unreadable' };
  }
}

export async function saveJournal(entries: JournalEntry[]): Promise<void> {
  const key = await keyForWriting();
  const sealed = seal(key, serializeJournal(entries), Crypto.getRandomBytes(NONCE_BYTES));
  const file = journalFile();
  if (!file.exists) file.create();
  await file.write(JSON.stringify(sealed));
}

/** Removes the encrypted file and its key. */
export async function eraseJournal(): Promise<void> {
  const file = journalFile();
  if (file.exists) file.delete();
  await SecureStore.deleteItemAsync(KEY_NAME);
}
