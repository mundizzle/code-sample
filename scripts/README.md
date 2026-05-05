# Scripts

These scripts keep the project workflow repeatable. They turn design tokens into app-ready CSS and build Storybook into the location Vercel serves with the app.

Use this directory for small project automation that needs to be repeatable and inspectable during review.

- `generate-tailwind-theme.mjs` reads `design-tokens/light.tokens.json` and `design-tokens/dark.tokens.json`.
- It writes ignored generated CSS files:
  - `src/app/theme.css`, including `:root`, dark-mode media overrides, and Tailwind v4 `@theme inline` mappings.
  - `src/design-system/design-tokens.tokens.css`, including `storybook-design-token` annotations.
- `build-storybook-public.mjs` builds static Storybook and places it under `public/storybook`.
- `npm run dev`, `npm run test`, `npm run test:watch`, `npm run storybook`, `npm run build-storybook`, `npm run build-storybook:public`, and `npm run build` regenerate token CSS through npm lifecycle hooks.
- `npm run build` also builds static Storybook into `public/storybook` before running `next build`.
- Keep generated files out of version control unless the project intentionally treats them as source.
- Prefer deterministic output over manual copy/paste steps.

## Standards

- Prefer scripts with explicit inputs, explicit outputs, and stable formatting.
- Prefer failing with a clear error when required token files or build artifacts are missing.
- Prefer using structured JSON parsing for token files instead of line-based string manipulation.
- Avoid scripts that depend on local machine state, hidden credentials, or manual cleanup.
