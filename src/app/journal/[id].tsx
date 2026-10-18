import { useLocalSearchParams } from 'expo-router';

import { EntryEditor } from '@/features/journal/entry-editor';

export default function JournalEntryRoute() {
  const { id, lessonId } = useLocalSearchParams<{ id: string; lessonId?: string }>();
  return <EntryEditor key={id} id={id ?? 'new'} lessonId={lessonId} />;
}
