import { Newsreader_400Regular } from '@expo-google-fonts/newsreader/400Regular';
import { Newsreader_400Regular_Italic } from '@expo-google-fonts/newsreader/400Regular_Italic';
import { Newsreader_500Medium } from '@expo-google-fonts/newsreader/500Medium';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { configureReminders } from '@/features/reminders/reminders';
import { useWidgetSync } from '@/features/widgets/use-widget-sync';
import { AppStateProvider, useAppState } from '@/state/app-state';
import { JournalProvider } from '@/state/journal';
import { fonts } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { useReduceMotion } from '@/ui/motion';

SplashScreen.preventAutoHideAsync();
configureReminders();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [fonts.serifRegular]: Newsreader_400Regular,
    [fonts.serif]: Newsreader_500Medium,
    [fonts.serifItalic]: Newsreader_400Regular_Italic,
  });
  return (
    <AppStateProvider>
      <JournalProvider>
        {/* A font that fails to load falls back to the system font rather than blocking the app. */}
        <RootNavigator fontsReady={fontsLoaded || !!fontError} />
      </JournalProvider>
    </AppStateProvider>
  );
}

function RootNavigator({ fontsReady }: { fontsReady: boolean }) {
  const { ready, state } = useAppState();
  const { scheme, colors } = useTheme();
  const reduceMotion = useReduceMotion();
  const loaded = ready && fontsReady;
  useWidgetSync();

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...base,
    colors: { ...base.colors, background: colors.background, card: colors.background, primary: colors.primary, text: colors.text, border: colors.border },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: reduceMotion ? 'none' : 'default',
        }}>
        <Stack.Protected guard={!state.onboardingCompleted}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
        <Stack.Protected guard={state.onboardingCompleted}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="lesson/[id]"
            options={{ presentation: 'fullScreenModal', animation: reduceMotion ? 'none' : 'slide_from_bottom' }}
          />
          <Stack.Screen name="journal/[id]" options={{ presentation: 'modal', animation: reduceMotion ? 'none' : 'default' }} />
          <Stack.Screen name="widgets" options={{ presentation: 'modal', animation: reduceMotion ? 'none' : 'default' }} />
          <Stack.Screen name="bible/[lessonId]" options={{ presentation: 'modal', animation: reduceMotion ? 'none' : 'default' }} />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
