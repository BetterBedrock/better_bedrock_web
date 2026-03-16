import type { Preview } from '@storybook/nextjs-vite'
import '../public/styles/global.scss';
import './fonts.scss';
import { themes } from 'storybook/theming';

const preview: Preview = {
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;