import { useEffect, useRef } from 'react';
import { AppState as NativeAppState } from 'react-native';

import { useAppState, useStrings } from '@/state/app-state';

import { publishWidgetBundle, widgetsSupported } from './publish';
import { buildWidgetBundle } from './widget-data';

const SETTLE_MS = 800;

/**
 * Keeps the widgets in step with the app, which stays the source of truth: publishes after
 * progress, onboarding, preference or language changes (including an erase), and when the app
 * comes back to the foreground, so a new day or a new time zone is picked up. Nothing is sent
 * when the content is unchanged, which spares WidgetKit's reload budget.
 */
export function useWidgetSync() {
  const { ready, state } = useAppState();
  const strings = useStrings();
  const published = useRef('');

  useEffect(() => {
    if (!widgetsSupported || !ready) return;
    const publish = () => {
      const bundle = buildWidgetBundle(state, new Date(), strings);
      if (bundle.signature === published.current) return;
      try {
        publishWidgetBundle(bundle);
        published.current = bundle.signature;
        if (__DEV__) console.log('[widgets] published', bundle.progress.progress.completed, '/', bundle.progress.progress.total);
      } catch (error) {
        // A widget failure must never break the app; the next change or resume tries again.
        if (__DEV__) console.warn('[widgets] publishing failed', error);
      }
    };
    const timer = setTimeout(publish, SETTLE_MS);
    const subscription = NativeAppState.addEventListener('change', (next) => next === 'active' && publish());
    return () => {
      clearTimeout(timer);
      subscription.remove();
    };
  }, [ready, state, strings]);
}
