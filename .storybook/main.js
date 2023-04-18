const path = require("path");

module.exports = {
  stories: [
    "../(components|pages|stories)/**/*.stories.mdx",
    "../(components|pages|stories)/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: [
    // "@storybook/addon-links",
    // "@storybook/addon-essentials",
    // "@storybook/addon-interactions",

    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-postcss",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },

  webpackFinal: async (config) => {
    // 👈 and add this here
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../"),
    };
    return config;
  },
};
