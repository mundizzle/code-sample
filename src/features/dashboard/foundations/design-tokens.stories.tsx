import type { Meta, StoryObj } from "@storybook/nextjs";
import { DesignTokenDocBlock } from "storybook-design-token";
import { ThemeProvider, convert, themes } from "storybook/theming";

const storybookTokenTheme = convert(themes.light);

function TokenDocBlock({
  categoryName,
  viewType,
}: {
  categoryName: string;
  viewType: "card" | "table";
}) {
  return (
    <ThemeProvider theme={storybookTokenTheme}>
      <DesignTokenDocBlock
        categoryName={categoryName}
        viewType={viewType}
        showValueColumn
      />
    </ThemeProvider>
  );
}

const meta = {
  title: "Foundations/Design Tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Design tokens mirror the ad/* Figma variables and back the semantic Tailwind utilities used by the React dashboard.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => <TokenDocBlock categoryName="Colors" viewType="card" />,
};

export const ChartColors: Story = {
  render: () => <TokenDocBlock categoryName="Chart Colors" viewType="card" />,
};

export const Radius: Story = {
  render: () => <TokenDocBlock categoryName="Radius" viewType="table" />,
};

export const Spacing: Story = {
  render: () => <TokenDocBlock categoryName="Spacing" viewType="table" />,
};
