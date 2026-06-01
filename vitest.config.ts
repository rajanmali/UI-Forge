import { defineConfig, mergeConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        // Replace framer-motion with a lightweight mock during tests.
        // The real library requires browser animation APIs that jsdom lacks.
        'framer-motion': fileURLToPath(
          new URL('./src/test/mocks/framer-motion.tsx', import.meta.url),
        ),
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      globals: true,
      css: false,
    },
  }),
);
