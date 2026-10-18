import { HStack, Image, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { containerBackground, font, foregroundStyle, lineLimit, widgetURL } from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

import type { TodayActionWidgetData } from '@/features/widgets/widget-data';

/** Widget C, today's action: the live step of the recommended lesson, offered as an invitation. */
const TodayAction = (props: TodayActionWidgetData, env: WidgetEnvironment) => {
  'widget';
  const dark = env.colorScheme === 'dark';
  const bg = dark ? '#121815' : '#FFFFFF';
  const ink = dark ? '#F1EDE4' : '#222725';
  const muted = dark ? '#AEB8B1' : '#59615C';
  const gold = dark ? '#E0C38F' : '#85601E';
  const forest = dark ? '#B9CBBA' : '#244737';
  const a = props.action;
  const large = env.widgetFamily === 'systemLarge';

  return (
    <VStack alignment="leading" spacing={large ? 12 : 6} modifiers={[containerBackground(bg, 'widget'), widgetURL(props.link)]}>
      <HStack spacing={6}>
        <Image systemName="figure.walk" size={13} color={forest} />
        <Text modifiers={[font({ size: 11, weight: 'semibold' }), foregroundStyle(gold)]}>{props.labels.action}</Text>
        <Spacer />
        <Text modifiers={[font({ size: 10, weight: 'semibold' }), foregroundStyle(muted)]}>{props.labels.brand}</Text>
      </HStack>
      {a ? (
        <VStack alignment="leading" spacing={large ? 8 : 4}>
          <Text modifiers={[font({ size: large ? 22 : 17, design: 'serif' }), foregroundStyle(ink), lineLimit(2)]}>{a.title}</Text>
          <Text modifiers={[font({ size: large ? 15 : 12 }), foregroundStyle(muted), lineLimit(large ? 7 : 2)]}>{a.description}</Text>
          <Spacer />
          <Text modifiers={[font({ size: 11, weight: 'medium' }), foregroundStyle(forest), lineLimit(1)]}>
            {a.day}. {a.lessonTitle} · {a.reference}
          </Text>
        </VStack>
      ) : (
        <VStack alignment="leading" spacing={4}>
          <Text modifiers={[font({ size: 17, design: 'serif' }), foregroundStyle(ink), lineLimit(3)]}>{props.labels.emptyAction}</Text>
          <Spacer />
        </VStack>
      )}
    </VStack>
  );
};

export default createWidget<TodayActionWidgetData>('TodayAction', TodayAction);
