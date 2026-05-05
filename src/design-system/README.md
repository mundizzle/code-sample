# Design System

## What this is

This folder documents the design token layer inside Storybook. It turns the generated token values into a browsable reference for colors, radius, and spacing.

## Why it exists

- Reviewers should be able to inspect the design system without reading token JSON.
- Token documentation makes the Figma-to-code contract visible.
- Colors include both interface colors and chart series colors in one view, because both are part of the same visual language.
- The docs stay close to Storybook instead of becoming a separate static artifact.

## How it works

- `design-tokens.stories.tsx` defines the Storybook token documentation stories.
- `design-tokens.tokens.css` annotates CSS variables for `storybook-design-token`.
- Storybook renders these under `Design System/Tokens`.
- The production app still consumes generated variables from `src/app/theme.css`.

## Example

```tsx
export const Colors: Story = {
  render: () => <TokenDocBlock categoryName="Colors" viewType="card" />,
};
```

## Related

- [`../../design-tokens/README.md`](../../design-tokens/README.md)
- [`../../.storybook/README.md`](../../.storybook/README.md)
- [`../app/README.md`](../app/README.md)
