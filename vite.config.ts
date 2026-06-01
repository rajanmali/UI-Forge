import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In dev (`vite`) serve at root so localhost:5173/ works without a sub-path.
// In build (`vite build`) use the GitHub Pages sub-directory so all assets
// are referenced correctly at rajanmali.github.io/UI-Forge/.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/UI-Forge/',
}))
