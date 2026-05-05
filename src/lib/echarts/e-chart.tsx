"use client";

import { useEffect, useId, useRef } from "react";
import { LineChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import {
  init,
  use as registerEChartsModules,
  type ECharts,
} from "echarts/core";
import type { EChartsOption } from "echarts";
import { CanvasRenderer } from "echarts/renderers";

registerEChartsModules([
  GridComponent,
  LegendComponent,
  LineChart,
  PieChart,
  TooltipComponent,
  CanvasRenderer,
]);

type EChartProps = {
  accessibleDescription?: string;
  ariaLabel: string;
  className?: string;
  option: EChartsOption;
};

export function EChart({
  accessibleDescription,
  ariaLabel,
  className = "h-56 w-full",
  option,
}: EChartProps) {
  const descriptionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || typeof ResizeObserver === "undefined") {
      return;
    }

    const chart = chartRef.current ?? init(container, null, { renderer: "canvas" });
    chartRef.current = chart;

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option, { notMerge: true, lazyUpdate: true });
  }, [option]);

  return (
    <>
      <div
        ref={containerRef}
        role="img"
        aria-describedby={accessibleDescription ? descriptionId : undefined}
        aria-label={ariaLabel}
        className={className}
      />
      {accessibleDescription ? (
        <p id={descriptionId} className="sr-only">
          {accessibleDescription}
        </p>
      ) : null}
    </>
  );
}
