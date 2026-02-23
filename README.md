# Old Hungarian Translator — Browser Extension

A Chrome extension for translating text to and from **Old Hungarian (Székely rovásírás)** script directly from your browser toolbar.

## Features

- Translate **Latin text → Old Hungarian** script
- Translate **Old Hungarian → Latin** text
- Read input from the clipboard and write results back to the clipboard
- Display translated output inline in the popup

## Usage

1. Copy the text you want to translate to your clipboard.
2. Click the extension icon in the toolbar.
3. Choose a direction:
   - **Translate from Old Hungarian** — converts Old Hungarian script to Latin.
   - **Translate to Old Hungarian** — converts Latin text to Old Hungarian script.
4. Click **📋 To Clipboard** to copy the result, or **📝 To Text** to display it in the popup.

## Installation (from source)

```bash
npm install
npm run build        # production build
# or
npm run build:dev    # development build
```

Then load the generated `dist/` folder as an **unpacked extension** in `chrome://extensions`.

> **Watch mode** (auto-rebuild on save):
> ```bash
> npm run watch
> ```

## Underlying npm Package

The translation logic is powered by the [`old-hungarian`](https://github.com/MicroKiss/old-hungarian) npm package.
Visit the repository for details on the supported character set and API.

## Requirements

- Node.js & npm
- Chromium-based browser (Chrome, Edge, Brave, etc.)

## License

MIT
