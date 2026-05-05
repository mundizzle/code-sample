# Design Tokens

This is the checked-in design input represented as Figma-style token exports. The app uses these JSON files to produce generated CSS variables for Tailwind and generated token documentation for Storybook.

Use this directory when changing foundational visual decisions. Components should consume the generated `ad-*` utilities, not values copied from these JSON files.

- `light.tokens.json` defines the default appearance.
- `dark.tokens.json` defines the `prefers-color-scheme: dark` overrides.
- `scripts/generate-tailwind-theme.mjs` flattens the `ad/*` namespace.
- Generated output lands in `src/app/theme.css` and `src/tailwind-theme/tailwind-theme.tokens.css`.
- Generated CSS is ignored by git and recreated by npm workflow hooks.
- Run `npm run generate-tailwind-theme` after token changes.
- Keep token names semantic and product-oriented: background, surface, text, border, accent, status, chart series.

## Standards

- Prefer token names that describe intent, such as `color/surface` or `chart/series-1`, instead of one-off component names.
- Prefer changing token values here and regenerating the theme over patching component classes.
- Prefer keeping light and dark values parallel so contrast changes are easy to audit.
- Avoid raw colors in components, generated CSS edits by hand, or token names tied to a single temporary layout.
