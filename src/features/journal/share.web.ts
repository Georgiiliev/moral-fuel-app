/** Browsers without a share sheet download the text as a file instead. */
export async function shareText(title: string, text: string): Promise<void> {
  if (navigator.share) {
    await navigator.share({ title, text });
    return;
  }
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'moral-fuel-dagboek.txt';
  link.click();
  URL.revokeObjectURL(url);
}
