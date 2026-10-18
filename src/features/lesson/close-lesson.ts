import { useRouter } from 'expo-router';
import { useCallback } from 'react';

/** Closes the lesson modal; falls back to Today when the lesson was opened directly (e.g. a web reload). */
export function useCloseLesson() {
  const router = useRouter();
  return useCallback(() => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }, [router]);
}
