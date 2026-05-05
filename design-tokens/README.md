# Design Tokens

## What this is

This is the design source of truth represented as Figma-style token exports. The app uses these files to produce the Tailwind-facing CSS variables that drive color, chart series colors, radius, and spacing.

## Why it exists

- Tokens keep design decisions out of one-off component classes.
- Light and dark appearance live in parallel files, so theme changes stay explicit.
- The token names describe product intent: background, surface, text, border, accent, status, chart series.
- This mirrors how I like design-to-dev handoff to work: update the token once, then let the system carry it through.

## How it works

- `light.tokens.json` defines the default appearance.
- `dark.tokens.json` defines the `prefers-color-scheme: dark` overrides.
- `scripts/generate-tailwind-theme.mjs` flattens the `ad/*` namespace.
- The generated output lands in `src/app/theme.css`.
- Components consume the generated Tailwind utilities instead of raw hex values.

## Example

```json
{
  "ad": {
    "color": {
      "bg": {
        "$type": "color",
        "$value": { "hex": "#F6F7FB" }
      }
    }
  }
}
```

That becomes a CSS variable and Tailwind utility path:

```css
--ad-color-bg: #F6F7FB;
--color-ad-bg: var(--ad-color-bg);
```

## Related

- [`../scripts/README.md`](../scripts/README.md)
- [`../src/app/README.md`](../src/app/README.md)
- `npm run generate-tailwind-theme`
