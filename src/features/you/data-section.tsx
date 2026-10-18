import Constants from 'expo-constants';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppState, useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { Button } from '@/ui/button';
import { confirm } from '@/ui/confirm';
import { AppText } from '@/ui/text';

import { Section } from './section';

/** Restart onboarding and erase everything, each behind a confirmation, plus the version line. */
export function DataSection() {
  const strings = useStrings();
  const { actions } = useAppState();
  const [eraseFailed, setEraseFailed] = useState(false);
  const you = strings.you;

  const restart = async () => {
    const ok = await confirm({
      title: you.restartConfirmTitle,
      message: you.restartConfirmBody,
      confirmLabel: you.restartConfirm,
      cancelLabel: strings.common.cancel,
    });
    if (ok) actions.restartOnboarding();
  };

  const erase = async () => {
    const ok = await confirm({
      title: you.eraseConfirmTitle,
      message: you.eraseConfirmBody,
      confirmLabel: you.eraseConfirm,
      cancelLabel: strings.common.cancel,
      destructive: true,
    });
    if (!ok) return;
    setEraseFailed(false);
    try {
      await actions.eraseAllData();
    } catch {
      setEraseFailed(true);
    }
  };

  const version = Constants.expoConfig?.version;
  return (
    <>
      <Section title={you.restart}>
        <AppText variant="small" tone="muted">
          {you.restartHint}
        </AppText>
        <Button variant="secondary" icon="restart" iconPosition="start" label={you.restart} onPress={restart} accessibilityHint={you.restartHint} />
      </Section>
      <Section title={you.erase}>
        <AppText variant="small" tone="muted">
          {you.eraseHint}
        </AppText>
        <Button variant="danger" icon="trash" iconPosition="start" label={you.erase} onPress={erase} accessibilityHint={you.eraseHint} />
        {eraseFailed ? (
          <AppText variant="small" tone="danger" accessibilityRole="alert">
            {you.eraseFailed}
          </AppText>
        ) : null}
      </Section>
      {version ? (
        <View style={styles.version}>
          <AppText variant="caption" tone="muted">
            {you.version(version)}
          </AppText>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({ version: { alignItems: 'center', paddingTop: spacing.md } });
