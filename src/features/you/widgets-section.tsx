import { useRouter } from 'expo-router';

import { useStrings } from '@/state/app-state';
import { Button } from '@/ui/button';
import { AppText } from '@/ui/text';

import { Section } from './section';

export function WidgetsSection() {
  const strings = useStrings();
  const router = useRouter();
  return (
    <Section title={strings.widgetGallery.title}>
      <AppText tone="muted">{strings.widgetGallery.entryHint}</AppText>
      <Button label={strings.widgetGallery.entry} variant="secondary" icon="chevronRight" onPress={() => router.push('/widgets')} />
    </Section>
  );
}
