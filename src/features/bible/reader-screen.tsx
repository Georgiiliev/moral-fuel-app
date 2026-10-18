import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';

import { formatReference, getLesson, getLessonText } from '@/content';
import { BGT, getPassage } from '@/content/bible';
import { useAppState, useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Icon } from '@/ui/icon';
import { Screen } from '@/ui/screen';
import { AppText } from '@/ui/text';

import { PassageText } from './passage-text';

const EDGES: Edge[] = Platform.OS === 'ios' ? ['left', 'right', 'bottom'] : ['top', 'left', 'right', 'bottom'];

/** A lesson's passages in full, for places too small to hold them, such as the Today card. */
export function BibleReaderScreen({ lessonId }: { lessonId: string }) {
  const strings = useStrings();
  const router = useRouter();
  const { language } = useAppState().state.preferences;
  const { colors } = useTheme();
  const lesson = getLesson(lessonId);
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));
  const references = lesson ? [lesson.passage, ...lesson.relatedPassages] : [];

  return (
    <Screen edges={EDGES}>
      <View style={styles.top}>
        <AppText variant="display">{strings.bible.readerTitle}</AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={strings.bible.close}
          onPress={close}
          hitSlop={8}
          style={styles.close}>
          <Icon name="close" size={20} color={colors.text} />
        </Pressable>
      </View>
      {lesson ? (
        <AppText tone="muted">
          {strings.bible.readerSubtitle(lesson.day)} · {getLessonText(lesson, language).title}
        </AppText>
      ) : null}
      {references.map((reference) => (
        <View key={formatReference(reference, language)} style={[styles.passage, { borderTopColor: colors.border }]}>
          <View style={styles.titles}>
            <AppText variant="heading">{formatReference(reference, language)}</AppText>
            <AppText variant="caption" tone="muted">
              {BGT.name}
            </AppText>
          </View>
          <PassageText passage={getPassage(reference)} />
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.md },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  passage: { gap: spacing.md, borderTopWidth: StyleSheet.hairlineWidth, paddingTop: spacing.lg },
  titles: { gap: 2 },
});
