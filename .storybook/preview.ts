import type { Preview } from "@storybook/nextjs";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Light: "light",
        Dark: "dark",
      },
      defaultTheme: "Light",
      attributeName: "data-storybook-theme",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
  },
};

export default preview;
