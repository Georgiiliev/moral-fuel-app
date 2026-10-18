import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { formatReference, getDayViews, getLessonText } from '@/content';
import { isCompleted, LESSON_STEP_COUNT } from '@/features/progress/progress';
import type { Lesson } from '@/models/content';
import { useAppState, useStrings } from '@/state/app-state';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/use-theme';
import { Button } from '@/ui/button';
import { Icon } from '@/ui/icon';
import { FadeIn } from '@/ui/motion';
import { Screen } from '@/ui/screen';
import { AppText } from '@/ui/text';

import { useCloseLesson } from './close-lesson';
import { CompletionView } from './completion-view';
import { LearnStep } from './learn-step';
import { LiveStep } from './live-step';
import { findNextLesson } from './next-lesson';
import { ReflectStep } from './reflect-step';
import { StepIndicator } from './step-indicator';

const LAST_STEP = LESSON_STEP_COUNT - 1;

/** Learn, reflect, live, then a completion view. Progress is saved per step so a lesson can be resumed. */
export function LessonFlow({ lesson }: { lesson: Lesson }) {
  const strings = useStrings();
  const router = useRouter();
  const close = useCloseLesson();
  const { colors } = useTheme();
  const { state, actions } = useAppState();
  const { language } = state.preferences;
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);

  const saved = state.progress[lesson.id];
  const [step, setStep] = useState(saved?.status === 'in-progress' ? saved.stepIndex : 0);
  const [done, setDone] = useState(false);
  const wasCompleted = isCompleted(state.progress, lesson.id) && !done;

  const { openLesson } = actions;
  useEffect(() => {
    openLesson(lesson.id);
  }, [openLesson, lesson.id]);

  const text = getLessonText(lesson, language);
  const [learn, reflect, live] = text.steps;
  const passage = formatReference(lesson.passage, language);

  const goTo = (next: number) => {
    setStep(next);
    actions.setLessonStep(lesson.id, next);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const finish = () => {
    actions.completeLesson(lesson.id);
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setDone(true);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const review = () => {
    setDone(false);
    setStep(0);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const footer = done ? undefined : (
    <View style={styles.footer}>
      {step > 0 ? (
        <View style={styles.footerSide}>
          <Button
            label={strings.lesson.previous}
            variant="secondary"
            icon="chevronLeft"
            iconPosition="start"
            onPress={() => goTo(step - 1)}
          />
        </View>
      ) : null}
      <View style={styles.footerMain}>
        {step < LAST_STEP ? (
          <Button label={strings.lesson.next} icon="chevronRight" onPress={() => goTo(step + 1)} />
        ) : (
          <Button label={strings.lesson.finish} icon="check" onPress={finish} />
        )}
      </View>
    </View>
  );

  return (
    <Screen scrollRef={scrollRef} avoidKeyboard footer={footer}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <AppText variant="overline" tone="muted" style={styles.headerText}>
            {strings.common.day(lesson.day)} · {passage}
          </AppText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={strings.lesson.close}
            hitSlop={8}
            onPress={close}
            style={({ pressed }) => [styles.close, pressed && styles.pressed]}>
            <Icon name="close" size={20} color={colors.text} />
          </Pressable>
        </View>
        {done ? null : <StepIndicator step={step} />}
        {wasCompleted ? (
          <AppText variant="small" tone="muted">
            {strings.lesson.alreadyCompleted}
          </AppText>
        ) : null}
      </View>

      <FadeIn key={done ? 'done' : step}>
        {done ? (
          <CompletionView
            day={lesson.day}
            action={live.action}
            next={findNextLesson(getDayViews(language), state.progress, lesson.id)}
            onNext={(id) => router.replace({ pathname: '/lesson/[id]', params: { id } })}
            onToday={close}
            onReview={review}
            onJournal={() => router.push({ pathname: '/journal/[id]', params: { id: 'new', lessonId: lesson.id } })}
          />
        ) : step === 0 ? (
          <LearnStep
            title={text.title}
            passage={lesson.passage}
            related={lesson.relatedPassages}
            step={learn}
            language={language}
          />
        ) : step === 1 ? (
          <ReflectStep lessonId={lesson.id} step={reflect} />
        ) : (
          <LiveStep step={live} />
        )}
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.md },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  headerText: { flex: 1 },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
  footer: { flexDirection: 'row', gap: spacing.sm },
  footerSide: { flexShrink: 1 },
  footerMain: { flex: 1 },
});
