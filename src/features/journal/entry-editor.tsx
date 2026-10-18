import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';

import { useOpenLesson } from '@/features/lesson/use-open-lesson';
import { formatDateTime } from '@/i18n/format';
import { useAppState, useStrings } from '@/state/app-state';
import { useJournal } from '@/state/journal';
import { radius, spacing, typography } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Button } from '@/ui/button';
import { confirm } from '@/ui/confirm';
import { Icon } from '@/ui/icon';
import { Screen } from '@/ui/screen';
import { AppText } from '@/ui/text';

import { JOURNAL_ENTRY_MAX_LENGTH, lessonEntry } from './journal';
import { lessonRef } from './lesson-ref';

/** On iOS the editor is a page sheet below the status bar; elsewhere it fills the screen. */
const EDITOR_EDGES: Edge[] = Platform.OS === 'ios' ? ['left', 'right', 'bottom'] : ['top', 'left', 'right', 'bottom'];

/**
 * Writes one journal entry. A new entry exists only once something is typed; a lesson's entry is
 * its reflection, so clearing it removes it, just as in the lesson.
 */
export function EntryEditor({ id, lessonId }: { id: string; lessonId?: string }) {
  const strings = useStrings();
  const router = useRouter();
  const openLesson = useOpenLesson();
  const { state } = useAppState();
  const journal = useJournal();
  const { colors } = useTheme();
  const language = state.preferences.language;
  const [entryId, setEntryId] = useState(id === 'new' ? null : id);
  // Keystrokes can arrive before the new id reaches state; the ref makes sure only one entry is created.
  const createdId = useRef<string | null>(entryId);
  const byId = entryId ? journal.entries.find((e) => e.id === entryId) : undefined;
  const entry = byId ?? (lessonId ? lessonEntry(journal.entries, lessonId) : undefined);
  const linkedLessonId = entry?.lessonId ?? lessonId;
  const lesson = lessonRef(linkedLessonId, language);
  const [body, setBody] = useState<string | null>(null);
  const text = body ?? entry?.body ?? '';

  const close = () => {
    journal.actions.flush();
    if (router.canGoBack()) router.back();
    else router.replace('/journal');
  };

  const change = (value: string) => {
    setBody(value);
    if (linkedLessonId) journal.actions.setLessonReflection(linkedLessonId, value);
    else if (createdId.current) journal.actions.updateEntry(createdId.current, value);
    else if (value.trim()) {
      createdId.current = journal.actions.createEntry(value);
      setEntryId(createdId.current);
    }
  };

  const remove = async () => {
    if (!entry) return close();
    const ok = await confirm({
      title: strings.journal.deleteConfirmTitle,
      message: strings.journal.deleteConfirmBody,
      confirmLabel: strings.journal.delete,
      cancelLabel: strings.common.cancel,
      destructive: true,
    });
    if (!ok) return;
    journal.actions.deleteEntry(entry.id);
    close();
  };

  const header = (
    <View style={styles.top}>
      <AppText variant="overline" tone="muted">
        {entry || !entryId ? (entry ? strings.journal.editor : strings.journal.editorNew) : strings.journal.editor}
      </AppText>
      <Pressable accessibilityRole="button" accessibilityLabel={strings.journal.done} onPress={close} hitSlop={8} style={styles.done}>
        <AppText variant="bodyStrong" style={{ color: colors.primary }}>
          {strings.journal.done}
        </AppText>
      </Pressable>
    </View>
  );

  if (journal.status !== 'ready') {
    return (
      <Screen edges={EDITOR_EDGES}>
        {header}
        {journal.status === 'loading' ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <AppText tone="danger">{strings.journal.unreadableShort}</AppText>
        )}
      </Screen>
    );
  }

  // An entry that was opened by id but no longer exists (deleted elsewhere, or after an erase).
  if (entryId && !entry && id !== 'new') {
    return (
      <Screen edges={EDITOR_EDGES}>
        {header}
        <AppText variant="heading">{strings.journal.notFoundTitle}</AppText>
        <AppText tone="muted">{strings.journal.notFoundBody}</AppText>
      </Screen>
    );
  }

  return (
    <Screen
      avoidKeyboard
      edges={EDITOR_EDGES}
      footer={
        entry ? (
          <Button label={strings.journal.delete} variant="danger" icon="trash" iconPosition="start" onPress={remove} />
        ) : undefined
      }>
      {header}

      {lesson ? (
        <View style={[styles.lesson, { borderLeftColor: colors.accent }]}>
          <AppText variant="caption" tone="accent">
            {strings.journal.fromLesson(lesson.day, lesson.title)}
          </AppText>
          <Button label={strings.journal.openLesson} variant="ghost" icon="chevronRight" onPress={() => openLesson(lesson.id)} />
        </View>
      ) : null}

      <TextInput
        value={text}
        onChangeText={change}
        onBlur={journal.actions.flush}
        autoFocus={!entry}
        multiline
        maxLength={JOURNAL_ENTRY_MAX_LENGTH}
        textAlignVertical="top"
        placeholder={strings.journal.editorPlaceholder}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={strings.journal.editorLabel}
        style={[styles.input, typography.body, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]}
      />
      <View style={styles.meta}>
        <AppText variant="caption" tone="muted">
          {entry ? strings.journal.written(formatDateTime(entry.createdAt, language)) : ' '}
        </AppText>
        <AppText variant="caption" tone="muted">
          {strings.lesson.characters(text.length, JOURNAL_ENTRY_MAX_LENGTH)}
        </AppText>
      </View>
      {entry && entry.updatedAt !== entry.createdAt ? (
        <AppText variant="caption" tone="muted">
          {strings.journal.edited(formatDateTime(entry.updatedAt, language))}
        </AppText>
      ) : null}
      {journal.saveFailed ? (
        <AppText variant="small" tone="danger" accessibilityLiveRegion="polite">
          {strings.journal.saveFailed}
        </AppText>
      ) : null}
      <View style={styles.privacy}>
        <Icon name="lock" size={14} color={colors.textMuted} />
        <AppText variant="caption" tone="muted" style={styles.flex}>
          {journal.persists ? strings.journal.subtitle : strings.journal.subtitleWeb}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  done: { minHeight: 44, minWidth: 44, alignItems: 'flex-end', justifyContent: 'center' },
  lesson: { borderLeftWidth: 2, paddingLeft: spacing.sm, gap: spacing.xxs, alignItems: 'flex-start' },
  input: { minHeight: 260, borderWidth: 1, borderRadius: radius.md, padding: spacing.md },
  meta: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  privacy: { flexDirection: 'row', gap: spacing.xs, alignItems: 'flex-start' },
  flex: { flex: 1 },
});
