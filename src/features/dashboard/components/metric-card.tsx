export type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  tone: "text";
};

export function MetricCard({ label, value, delta }: MetricCardProps) {
  return (
    <article className="min-h-28 w-full min-w-0 rounded-ad-md border border-ad-border bg-ad-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-3xl font-semibold text-ad-text">{value}</p>
        <p className="text-sm font-semibold text-ad-success">{delta}</p>
      </div>
      <p className="mt-3 text-sm text-ad-text-muted">{label}</p>
    </article>
  );
}
