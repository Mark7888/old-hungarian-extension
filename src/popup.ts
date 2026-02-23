import { toOldHungarian, fromOldHungarian, IllegalCharacterError } from 'old-hungarian';

const resultBox = document.getElementById('result') as HTMLDivElement;
const statusEl = document.getElementById('status') as HTMLParagraphElement;

function showStatus(message: string, isError = false): void {
  statusEl.textContent = message;
  statusEl.className = isError ? 'status error' : 'status';
  setTimeout(() => {
    statusEl.textContent = '';
    statusEl.className = 'status';
  }, 3000);
}

function showResult(text: string): void {
  resultBox.textContent = text;
}

async function readClipboard(): Promise<string> {
  const text = await navigator.clipboard.readText();
  if (!text.trim()) {
    throw new Error('Clipboard is empty.');
  }
  return text;
}

async function handleTranslation(
  direction: 'toOH' | 'fromOH',
  output: 'text' | 'clipboard'
): Promise<void> {
  let input: string;
  try {
    input = await readClipboard();
  } catch (err) {
    showStatus((err as Error).message || 'Failed to read clipboard.', true);
    return;
  }

  let translated: string;
  try {
    if (direction === 'toOH') {
      translated = toOldHungarian(input);
    } else {
      translated = fromOldHungarian(input);
    }
  } catch (err) {
    if (err instanceof IllegalCharacterError) {
      showStatus(
        `Illegal character '${err.illegalCharacter}' at position ${err.position}.`,
        true
      );
    } else {
      showStatus((err as Error).message || 'Translation failed.', true);
    }
    return;
  }

  showResult(translated);

  if (output === 'clipboard') {
    try {
      await navigator.clipboard.writeText(translated);
      showStatus('Copied to clipboard!');
    } catch {
      showStatus('Could not write to clipboard.', true);
    }
  } else {
    showStatus('Done!');
  }
}

document.getElementById('fromOH-clipboard')!.addEventListener('click', () =>
  handleTranslation('fromOH', 'clipboard')
);
document.getElementById('fromOH-text')!.addEventListener('click', () =>
  handleTranslation('fromOH', 'text')
);
document.getElementById('toOH-clipboard')!.addEventListener('click', () =>
  handleTranslation('toOH', 'clipboard')
);
document.getElementById('toOH-text')!.addEventListener('click', () =>
  handleTranslation('toOH', 'text')
);
