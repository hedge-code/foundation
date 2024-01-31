import "../src/index.css";

import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from "@storybook/addon-viewport";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS, ...MINIMAL_VIEWPORTS }, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: "iphonese2",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
