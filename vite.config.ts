import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Subdirectory on GitHub Pages: rajanmali.github.io/UI-Forge/
  base: '/UI-Forge/',
})
