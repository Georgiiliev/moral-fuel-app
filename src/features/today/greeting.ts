import type { Strings } from '@/i18n/strings';

/** A greeting by the hour; the app never asks for a name. */
export function greetingFor(hour: number, strings: Strings): string {
  if (hour >= 5 && hour < 12) return strings.greeting.morning;
  if (hour >= 12 && hour < 18) return strings.greeting.afternoon;
  return strings.greeting.evening;
}
