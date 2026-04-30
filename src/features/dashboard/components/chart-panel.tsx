import type { ReactNode } from "react";

export type ChartPanelProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function ChartPanel({ title, description, children }: ChartPanelProps) {
  const headingId = `${title.toLowerCase().replaceAll(" ", "-")}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 rounded-ad-md border border-ad-border bg-ad-surface p-5"
    >
      <h2 id={headingId} className="text-lg font-semibold text-ad-text">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-5 text-ad-text-muted">{description}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}
