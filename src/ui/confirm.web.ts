import type { ConfirmOptions } from './confirm';

/** React Native's Alert does nothing on the web, so use the browser's own dialog. */
export function confirm({ title, message }: ConfirmOptions): Promise<boolean> {
  return Promise.resolve(window.confirm(`${title}\n\n${message}`));
}
