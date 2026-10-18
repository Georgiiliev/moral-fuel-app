import { AccessoryWidgetBackground, Gauge, Image, ProgressView, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import { containerBackground, font, gaugeStyle, lineLimit, widgetURL } from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

import type { LockScreenWidgetData } from '@/features/widgets/widget-data';

type Config = { content: string };

/**
 * Widget E, Lock Screen. The system renders it monochrome or vibrant, so no colours are set.
 * Progress appears only when the user allowed it in the app; nothing private is ever shown.
 */
const LockScreen = (props: LockScreenWidgetData, env: WidgetEnvironment<Config>) => {
  'widget';
  const p = props.progress;
  const wantsProgress = env.configuration?.content === 'progress';
  const showProgress = wantsProgress && p !== undefined;
  const link = showProgress ? 'moralfuel://journey' : props.inspiration.link;

  if (env.widgetFamily === 'accessoryCircular') {
    return (
      <ZStack modifiers={[containerBackground('clear', 'widget'), widgetURL(link)]}>
        <AccessoryWidgetBackground />
        {showProgress && p ? (
          <Gauge value={p.completed} min={0} max={p.total} modifiers={[gaugeStyle('circularCapacity')]}>
            <Text modifiers={[font({ size: 12, weight: 'semibold' })]}>{p.percent}%</Text>
          </Gauge>
        ) : (
          <Image systemName="book.closed" size={22} />
        )}
      </ZStack>
    );
  }

  if (env.widgetFamily === 'accessoryInline') {
    return (
      <Text modifiers={[containerBackground('clear', 'widget'), widgetURL(link)]}>
        {showProgress && p ? `${p.completed}/${p.total} ${props.labels.lessons}` : `${props.inspiration.reference} · ${props.inspiration.theme}`}
      </Text>
    );
  }

  return (
    <VStack alignment="leading" spacing={2} modifiers={[containerBackground('clear', 'widget'), widgetURL(link)]}>
      <Text modifiers={[font({ size: 11, weight: 'semibold' })]}>{props.labels.brand}</Text>
      {showProgress && p ? (
        <VStack alignment="leading" spacing={2}>
          <Text modifiers={[font({ size: 14, weight: 'semibold' })]}>
            {p.completed}/{p.total} {props.labels.lessons}
          </Text>
          <ProgressView value={p.total > 0 ? p.completed / p.total : 0} />
        </VStack>
      ) : (
        <VStack alignment="leading" spacing={1}>
          <Text modifiers={[font({ size: 13 }), lineLimit(2)]}>{props.inspiration.text}</Text>
          <Text modifiers={[font({ size: 11 })]}>{wantsProgress ? props.labels.hiddenProgress : props.inspiration.reference}</Text>
        </VStack>
      )}
    </VStack>
  );
};

export default createWidget<LockScreenWidgetData, Config>('LockScreen', LockScreen);
