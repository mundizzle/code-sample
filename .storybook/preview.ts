import type { Preview } from "@storybook/nextjs";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { initialize, mswLoader } from "msw-storybook-addon";

import { dashboardMockHandlers } from "../src/data/mocks/mock-handlers";
import "../src/app/globals.css";

initialize();

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
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    msw: {
      handlers: dashboardMockHandlers,
    },
    options: {
      storySort: {
        order: [
          "Dashboard",
          "Components",
          [
            "Header",
            "Filters",
            "Metrics",
            "Chart Panel",
            "Health Trend Chart",
            "Risk Distribution Chart",
            "Projects",
            "Selected Project",
          ],
          "Design System",
        ],
      },
    },
  },
};

export default preview;
