import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

type ColorToken = {
  $value: {
    hex: string;
  };
};

function readLightColorToken(name: "surface-elevated" | "text-muted") {
  const tokenPath = path.join(process.cwd(), "design-tokens", "light.tokens.json");
  const tokens = JSON.parse(readFileSync(tokenPath, "utf8")) as {
    ad: {
      color: Record<string, ColorToken>;
    };
  };

  return tokens.ad.color[name].$value.hex;
}

function relativeLuminance(hexColor: string) {
  const channels = hexColor
    .replace("#", "")
    .match(/../g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels) {
    throw new Error(`Invalid hex color: ${hexColor}`);
  }

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

describe("theme contrast", () => {
  it("keeps muted text legible on elevated surfaces", () => {
    const textMuted = readLightColorToken("text-muted");
    const surfaceElevated = readLightColorToken("surface-elevated");

    expect(contrastRatio(textMuted, surfaceElevated)).toBeGreaterThanOrEqual(4.5);
  });
});
