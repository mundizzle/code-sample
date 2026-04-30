import type { Client } from "../types";

export type FilterPanelProps = {
  clients: Client[];
  selectedClientIds: string[];
  onToggleClient: (clientId: string) => void;
};

export function FilterPanel({
  clients,
  selectedClientIds,
  onToggleClient,
}: FilterPanelProps) {
  return (
    <aside
      aria-label="Dashboard filters"
      className="w-full min-w-0 rounded-ad-md border border-ad-border bg-ad-surface p-5 lg:min-h-[710px] xl:sticky xl:top-8 xl:self-start"
    >
      <fieldset>
        <legend className="text-base font-semibold text-ad-text">Clients</legend>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {clients.map((client, index) => {
            const isSelected =
              selectedClientIds.includes(client.id) ||
              (selectedClientIds.length === 0 && index === 0);

            return (
              <button
                key={client.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggleClient(client.id)}
                className={`min-h-11 w-full rounded-ad-sm border px-4 py-2 text-left text-sm font-medium transition sm:w-auto ${
                  isSelected
                    ? "border-ad-accent bg-ad-accent text-white"
                    : "border-ad-border bg-ad-surface text-ad-text-muted hover:border-ad-accent hover:text-ad-text"
                }`}
              >
                {client.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-8 w-full text-sm leading-5 text-ad-text-muted">
        Focus the portfolio by client to review delivery health and launch readiness.
      </p>
    </aside>
  );
}
