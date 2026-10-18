import AsyncStorage from '@react-native-async-storage/async-storage';

import { LESSONS } from '@/content';
import type { AppState } from '@/models/user';

import { parseAppState, serializeAppState } from './app-state-codec';

const STATE_KEY = 'moralfuel.state.v1';
const knownLessonIds = new Set(LESSONS.map((lesson) => lesson.id));

export async function loadAppState(): Promise<AppState> {
  return parseAppState(await AsyncStorage.getItem(STATE_KEY), knownLessonIds);
}

export async function saveAppState(state: AppState): Promise<void> {
  await AsyncStorage.setItem(STATE_KEY, serializeAppState(state));
}

export async function clearAppState(): Promise<void> {
  await AsyncStorage.removeItem(STATE_KEY);
}
