import { useRouter } from 'expo-router';
import { useCallback } from 'react';

/** The one way screens open a lesson. */
export function useOpenLesson() {
  const router = useRouter();
  return useCallback(
    (lessonId: string) => router.push({ pathname: '/lesson/[id]', params: { id: lessonId } }),
    [router],
  );
}
