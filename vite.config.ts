import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as { version: string };

// In dev (`vite`) serve at root so localhost:5173/ works without a sub-path.
// In build (`vite build`) use the GitHub Pages sub-directory so all assets
// are referenced correctly at rajanmali.github.io/UI-Forge/.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/UI-Forge/',
  // Inject package.json version at build time — consumed by src/version.ts.
  // Run `npm run release` to bump the version; never edit src/version.ts manually.
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
}));
