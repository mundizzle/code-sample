# Scripts

## What this is

These scripts keep the project workflow repeatable. They turn design tokens into app-ready CSS and build Storybook into the location Vercel serves with the app.

## Why it exists

- Token generation should be deterministic, not a manual copy step.
- The deployed app and deployed Storybook should come from the same build flow.
- The scripts are intentionally small enough to inspect during review.

## How it works

- `generate-tailwind-theme.mjs` reads `design-tokens/light.tokens.json` and `design-tokens/dark.tokens.json`.
- It writes `src/app/theme.css`, including `:root`, dark-mode media overrides, and Tailwind v4 `@theme inline` mappings.
- `build-storybook-public.mjs` builds static Storybook and places it under `public/storybook`.
- `npm run build` runs both scripts before `next build` through the `prebuild` lifecycle.

## Example

```js
function cssVarName(tokenName) {
  return `--${namespace}-${tokenName.replaceAll("/", "-")}`;
}

function utilityName(tokenName) {
  return tokenName
    .replace(/^color\//, "")
    .replace(/^chart\//, "chart-")
    .replaceAll("/", "-");
}
```

## Related

- [`../design-tokens/README.md`](../design-tokens/README.md)
- [`../src/app/README.md`](../src/app/README.md)
- `npm run generate-tailwind-theme`
- `npm run build-storybook:public`
