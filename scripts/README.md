# Scripts

These scripts keep the project workflow repeatable. They turn design tokens into app-ready CSS and build Storybook into the location Vercel serves with the app.

Use this directory for small project automation that needs to be repeatable and inspectable during review.

- `generate-tailwind-theme.mjs` reads `design-tokens/light.tokens.json` and `design-tokens/dark.tokens.json`.
- It writes `src/app/theme.css`, including `:root`, dark-mode media overrides, and Tailwind v4 `@theme inline` mappings.
- `build-storybook-public.mjs` builds static Storybook and places it under `public/storybook`.
- `npm run build` runs both scripts before `next build` through the `prebuild` lifecycle.
- Keep generated files out of version control unless the project intentionally treats them as source.
- Prefer deterministic output over manual copy/paste steps.

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
