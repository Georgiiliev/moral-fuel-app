import { useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import { REMINDER_OFF, type OnboardingAnswers } from '@/features/preferences/preferences';
import { useAppState } from '@/state/app-state';

import { InterestStep } from './interest-step';
import { ReminderStep } from './reminder-step';
import { StartStep } from './start-step';
import { STEP_COUNT } from './steps';
import { TimeStep } from './time-step';
import { WelcomeStep } from './welcome-step';

const INITIAL_ANSWERS: OnboardingAnswers = { interest: null, dailyMinutes: null, reminder: REMINDER_OFF };

/** Five calm steps; answers stay local until the last step saves them in one go. */
export function OnboardingFlow() {
  const { actions } = useAppState();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>(INITIAL_ANSWERS);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, STEP_COUNT - 1)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const update = (patch: Partial<OnboardingAnswers>) => setAnswers((a) => ({ ...a, ...patch }));

  // Android hardware back walks back through the steps; on the first step the system handles it.
  useEffect(() => {
    if (step === 0) return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      back();
      return true;
    });
    return () => subscription.remove();
  }, [step, back]);

  switch (step) {
    case 0:
      return <WelcomeStep onNext={next} />;
    case 1:
      return <InterestStep value={answers.interest} onChange={(interest) => update({ interest })} onNext={next} onBack={back} />;
    case 2:
      return <TimeStep value={answers.dailyMinutes} onChange={(dailyMinutes) => update({ dailyMinutes })} onNext={next} onBack={back} />;
    case 3:
      return <ReminderStep value={answers.reminder} onChange={(reminder) => update({ reminder })} onNext={next} onBack={back} />;
    default:
      return <StartStep answers={answers} onFinish={() => actions.completeOnboarding(answers)} onBack={back} />;
  }
}
