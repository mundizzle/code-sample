"use client";

import { useEffect, useState } from "react";

import {
  cssVariableNames,
  dashboardChartPalette,
  type ChartPalette,
} from "./chart-palette";

export function useChartPalette(): ChartPalette {
  const [palette, setPalette] = useState(dashboardChartPalette);

  useEffect(() => {
    const updatePalette = () => setPalette(readChartPalette());

    updatePalette();

    if (typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");

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
