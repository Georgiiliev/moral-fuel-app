/* global jest */

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// An in-memory stand-in for the device keychain / keystore.
jest.mock('expo-secure-store', () => {
  const store = new Map();
  return {
    __store: store,
    getItemAsync: jest.fn(async (key) => (store.has(key) ? store.get(key) : null)),
    setItemAsync: jest.fn(async (key, value) => {
      store.set(key, value);
    }),
    deleteItemAsync: jest.fn(async (key) => {
      store.delete(key);
    }),
  };
});

// Reanimated 4's bundled mock needs a native worklets runtime; the app only uses these parts.
jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  const animation = { duration: () => animation, delay: () => animation };
  return { __esModule: true, default: { View }, FadeInDown: animation, useReducedMotion: () => false };
});

// Secure random numbers from Node in tests.
jest.mock('expo-crypto', () => {
  const nodeCrypto = require('crypto');
  return {
    getRandomBytes: (n) => new Uint8Array(nodeCrypto.randomBytes(n)),
    getRandomBytesAsync: async (n) => new Uint8Array(nodeCrypto.randomBytes(n)),
    randomUUID: () => nodeCrypto.randomUUID(),
  };
});

// An in-memory document folder.
jest.mock('expo-file-system', () => {
  const files = new Map();
  class File {
    constructor(dir, name) {
      this.uri = `${dir.uri}/${name}`;
    }
    get exists() {
      return files.has(this.uri);
    }
    create() {
      files.set(this.uri, '');
    }
    async write(text) {
      files.set(this.uri, text);
    }
    async text() {
      return files.get(this.uri);
    }
    delete() {
      files.delete(this.uri);
    }
  }
  return { __files: files, File, Paths: { document: { uri: 'file:///document' } } };
});

// Zero insets and a working provider for every component test.
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);
