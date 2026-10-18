import { Share } from 'react-native';

/** Opens the system share sheet; the user chooses where the text goes. */
export async function shareText(title: string, text: string): Promise<void> {
  await Share.share({ title, message: text });
}
