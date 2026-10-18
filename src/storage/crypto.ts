import { xchacha20poly1305 } from '@noble/ciphers/chacha.js';
import { bytesToHex, bytesToUtf8, hexToBytes, utf8ToBytes } from '@noble/ciphers/utils.js';

/**
 * Authenticated encryption for private text: XChaCha20-Poly1305 from @noble/ciphers (audited,
 * pure JavaScript, works in Expo Go). A changed or truncated file fails to open instead of
 * returning garbage.
 */
export const KEY_BYTES = 32;
export const NONCE_BYTES = 24;

export interface Sealed {
  v: 1;
  nonce: string; // hex
  data: string; // hex: ciphertext with its authentication tag
}

export function seal(key: Uint8Array, plaintext: string, nonce: Uint8Array): Sealed {
  const data = xchacha20poly1305(key, nonce).encrypt(utf8ToBytes(plaintext));
  return { v: 1, nonce: bytesToHex(nonce), data: bytesToHex(data) };
}

/** Throws when the key is wrong or the data was changed. */
export function open(key: Uint8Array, sealed: Sealed): string {
  if (sealed?.v !== 1 || typeof sealed.nonce !== 'string' || typeof sealed.data !== 'string') {
    throw new Error('Unknown sealed format');
  }
  return bytesToUtf8(xchacha20poly1305(key, hexToBytes(sealed.nonce)).decrypt(hexToBytes(sealed.data)));
}

export const keyToText = bytesToHex;
export const keyFromText = hexToBytes;
