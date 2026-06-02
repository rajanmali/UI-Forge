import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config, { configType }) => {
    return {
      ...config,
      base: configType === 'PRODUCTION' ? '/UI-Forge/storybook/' : '/',
    };
  },
};

export default config;
