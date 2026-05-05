# Storybook

## What this is

Storybook is the review surface for the component system and design tokens. It gives a hiring manager or technical reviewer a way to inspect the UI pieces without clicking through the whole application.

## Why it exists

- Components are easier to evaluate when they are visible outside the composed dashboard.
- Token documentation makes the design system tangible instead of implied.
- MSW lets stories use realistic dashboard data without adding a real backend.
- The navigation is organized for browsing: Design System, Views, then Components.

## How it works

- `main.ts` configures Storybook for the Next.js app.
- `preview.ts` imports the app CSS, registers MSW handlers, and configures light/dark preview themes.
- Stories live next to the components they document.
- Token docs live under `src/design-system`.
- The static build ships at `/storybook` in production.

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

## Related

- [`../src/components/README.md`](../src/components/README.md)
- [`../src/design-system/README.md`](../src/design-system/README.md)
- [`../src/data/README.md`](../src/data/README.md)
- `npm run storybook`
