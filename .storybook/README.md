# Storybook

Storybook is the review surface for the component system and design tokens. It gives a hiring manager or technical reviewer a way to inspect the UI pieces without clicking through the whole application.

Use this directory for Storybook configuration. Stories should stay beside the components or docs they cover.

- `main.ts` configures Storybook for the Next.js app.
- `preview.ts` imports the app CSS, registers MSW handlers, and configures light/dark preview themes.
- Stories live next to the components they document.
- Token docs live under `src/design-system`.
- The static build ships at `/storybook` in production.
- Keep the navigation organized for browsing: Design System, Views, then Components.
- Use MSW for realistic dashboard data in stories without adding backend scope.

## Example

```ts
withThemeByDataAttribute({
  themes: {
    Light: "light",
    Dark: "dark",
  },
  defaultTheme: "Light",
  attributeName: "data-storybook-theme",
});
```
