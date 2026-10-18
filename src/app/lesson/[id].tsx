import { useLocalSearchParams } from 'expo-router';

import { LessonScreen } from '@/features/lesson/lesson-screen';

export default function LessonRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <LessonScreen id={Array.isArray(id) ? id[0] : id} />;
}
