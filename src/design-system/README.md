# Design System

This folder documents the design token layer inside Storybook. It turns the generated token values into a browsable reference for colors, radius, and spacing.

Use this directory for Storybook-facing design system documentation, not production UI. It should help reviewers inspect generated token values without reading the raw token JSON.

- `design-tokens.stories.tsx` defines the Storybook token documentation stories.
- `design-tokens.tokens.css` annotates CSS variables for `storybook-design-token`.
- Storybook renders these under `Design System/Tokens`.
- The production app still consumes generated variables from `src/app/theme.css`.
- Include interface colors and chart series colors together because both are part of the dashboard visual system.

## Example

```tsx
export const Colors: Story = {
  render: () => <TokenDocBlock categoryName="Colors" viewType="card" />,
};
```
