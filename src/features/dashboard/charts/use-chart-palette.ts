"use client";

import { useEffect, useState } from "react";

import {
  dashboardChartPalette,
  type ChartPalette,
} from "./chart-options";

const cssVariableNames = {
  text: "--ad-color-text",
  textMuted: "--ad-color-text-muted",
  border: "--ad-color-border",
  surfaceElevated: "--ad-color-surface-elevated",
  series: [
    "--ad-chart-series-1",
    "--ad-chart-series-2",
    "--ad-chart-series-3",
    "--ad-chart-series-4",
  ],
} as const;

export function useChartPalette(): ChartPalette {
  const [palette, setPalette] = useState(dashboardChartPalette);

  useEffect(() => {
    const updatePalette = () => setPalette(readChartPalette());

    if (typeof window.matchMedia !== "function") {
      updatePalette();
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    updatePalette();
    media.addEventListener("change", updatePalette);

    return () => media.removeEventListener("change", updatePalette);
  }, []);

  return palette;
}

function readChartPalette(): ChartPalette {
  const root = getComputedStyle(document.documentElement);

  return {
    text: readCssVariable(root, cssVariableNames.text, dashboardChartPalette.text),
    textMuted: readCssVariable(
      root,
      cssVariableNames.textMuted,
      dashboardChartPalette.textMuted,
    ),
    border: readCssVariable(root, cssVariableNames.border, dashboardChartPalette.border),
    surfaceElevated: readCssVariable(
      root,
      cssVariableNames.surfaceElevated,
      dashboardChartPalette.surfaceElevated,
    ),
    series: cssVariableNames.series.map((name, index) =>
      readCssVariable(root, name, dashboardChartPalette.series[index]),
    ) as ChartPalette["series"],
  };
}

function readCssVariable(
  styles: CSSStyleDeclaration,
  name: string,
  fallback: string,
): string {
  return styles.getPropertyValue(name).trim() || fallback;
}
