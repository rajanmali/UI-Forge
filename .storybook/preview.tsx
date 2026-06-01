import type { Preview, Decorator } from '@storybook/react';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { store } from '../src/store';
import '../src/styles/main.scss';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals['theme'] as string) ?? 'light';
  const palette = (context.globals['palette'] as string) ?? 'ocean';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-palette', palette);
  }, [theme, palette]);

  return <Story />;
};

const withRedux: Decorator = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

const preview: Preview = {
  decorators: [withTheme, withRedux],
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
      },
    },
    palette: {
      name: 'Palette',
      defaultValue: 'ocean',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'ocean', title: 'Ocean' },
          { value: 'forest', title: 'Forest' },
          { value: 'sunset', title: 'Sunset' },
          { value: 'violet', title: 'Violet' },
          { value: 'rose', title: 'Rose' },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
};

export default preview;
