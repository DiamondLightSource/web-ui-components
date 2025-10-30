import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon",
    "@storybook/addon-webpack5-compiler-babel"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    config.resolve!.modules = [...(config.resolve!.modules || []), path.resolve(__dirname, "../src")];
    return config;
  },
  staticDirs:["../src/public"],
  core: {
    disableTelemetry: true,
  },
  refs: {
    "@chakra-ui/react": {
      disable: true,
    }
  }
};
export default config;
