import type { Preview } from '@storybook/nextjs-vite'
import '../public/styles/global.scss';
import './fonts.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;