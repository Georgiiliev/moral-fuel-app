import { useCallback } from 'react';

import { lessonEntry } from '@/features/journal/journal';
import { useJournal } from '@/state/journal';

/**
 * One lesson's optional written answer, kept as that lesson's entry in the encrypted journal.
 * The journal saves shortly after typing stops and again when the step or app is left.
 */
export function useReflection(lessonId: string) {
  const { status, entries, saveFailed, actions } = useJournal();
  const text = lessonEntry(entries, lessonId)?.body ?? '';
  const change = useCallback((value: string) => actions.setLessonReflection(lessonId, value), [actions, lessonId]);
  const clear = useCallback(() => actions.setLessonReflection(lessonId, ''), [actions, lessonId]);
  return { text, status, saveFailed, change, clear, flush: actions.flush };
}
