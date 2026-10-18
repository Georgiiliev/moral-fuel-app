import { useLocalSearchParams } from 'expo-router';

import { BibleReaderScreen } from '@/features/bible/reader-screen';

export default function BibleReaderRoute() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  return <BibleReaderScreen lessonId={Array.isArray(lessonId) ? lessonId[0] : lessonId} />;
}
