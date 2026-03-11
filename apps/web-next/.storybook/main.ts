// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/nextjs-vite';

import path, { dirname } from "path"

import { fileURLToPath } from "url"
import { mergeConfig } from 'vite';

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
  ],
  "framework": getAbsolutePath('@storybook/nextjs-vite'),
  staticDirs: [path.resolve(__dirname, '../public')],
  viteFinal: async (config) => {
    config.server ??= {};
    config.server.allowedHosts = ["storybook.betterbedrock.com"];

    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};
export default config;