import { StyleSheet, TextInput, View } from 'react-native';

import { JOURNAL_ENTRY_MAX_LENGTH } from '@/features/journal/journal';
import { useJournal } from '@/state/journal';
import type { ReflectStep as ReflectContent } from '@/models/content';
import { useStrings } from '@/state/app-state';
import { radius, spacing, typography } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Button } from '@/ui/button';
import { Icon } from '@/ui/icon';
import { AppText } from '@/ui/text';

import { useReflection } from './use-reflection';

/** The answer is optional, private, and never blocks the way forward. */
export function ReflectStep({ lessonId, step }: { lessonId: string; step: ReflectContent }) {
  const strings = useStrings();
  const { colors } = useTheme();
  const { text, status, saveFailed, change, clear, flush } = useReflection(lessonId);
  const { persists } = useJournal();

  return (
    <View style={styles.stack}>
      <View style={styles.block}>
        <AppText variant="overline" tone="accent">
          {strings.lesson.steps[1]}
        </AppText>
        <AppText variant="title">{step.prompt.question}</AppText>
        {step.prompt.hint ? <AppText tone="muted">{step.prompt.hint}</AppText> : null}
      </View>

      <View style={styles.block}>
        <AppText variant="small" tone="muted">
          {strings.lesson.reflectLabel}
        </AppText>
        <TextInput
          value={text}
          onChangeText={change}
          onBlur={flush}
          editable={status === 'ready'}
          multiline
          maxLength={JOURNAL_ENTRY_MAX_LENGTH}
          textAlignVertical="top"
          placeholder={strings.lesson.reflectPlaceholder}
          placeholderTextColor={colors.textMuted}
          accessibilityLabel={strings.lesson.reflectLabel}
          style={[
            styles.input,
            typography.body,
            { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        />
        <AppText variant="caption" tone="muted" style={styles.count}>
          {strings.lesson.characters(text.length, JOURNAL_ENTRY_MAX_LENGTH)}
        </AppText>
        {status === 'unreadable' ? (
          <AppText variant="small" tone="danger">
            {strings.journal.unreadableShort}
          </AppText>
        ) : null}
        {saveFailed ? (
          <AppText variant="small" tone="danger" accessibilityLiveRegion="polite">
            {strings.lesson.reflectSaveFailed}
          </AppText>
        ) : null}
        {text.length > 0 ? (
          <View style={styles.clear}>
            <Button label={strings.lesson.reflectClear} variant="ghost" icon="trash" iconPosition="start" onPress={clear} />
          </View>
        ) : null}
      </View>

      <View style={styles.privacy}>
        <Icon name="lock" size={16} color={colors.textMuted} />
        <AppText variant="small" tone="muted" style={styles.privacyText}>
          {persists ? strings.lesson.privacyNative : strings.lesson.privacyWeb} {strings.lesson.reflectInJournal}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg },
  block: { gap: spacing.sm },
  input: { minHeight: 180, borderWidth: 1, borderRadius: radius.md, padding: spacing.md },
  count: { textAlign: 'right' },
  clear: { alignSelf: 'flex-start' },
  privacy: { flexDirection: 'row', gap: spacing.xs, alignItems: 'flex-start' },
  privacyText: { flex: 1 },
});
