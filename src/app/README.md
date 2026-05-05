# App

## What this is

This is the Next.js App Router shell for the dashboard. It owns the route entry point, global CSS, provider wiring, generated theme CSS, and the fixture-backed dashboard API route.

## Why it exists

- The app shell stays conventional so the interesting work is easy to find.
- Providers are centralized here instead of being scattered through components.
- The dashboard API route gives TanStack Query a real fetch boundary without adding backend scope.
- Generated theme CSS lives beside global CSS so token output is easy to audit.

## How it works

- `layout.tsx` defines the document shell and metadata.
- `page.tsx` renders the dashboard through app providers.
- `providers.tsx` wires TanStack Query and the dashboard Zustand provider.
- `theme.css` is generated from `design-tokens/`.
- `api/dashboard/route.ts` returns deterministic dashboard data.

## Example

```tsx
export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createDashboardQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardStoreProvider>{children}</DashboardStoreProvider>
    </QueryClientProvider>
  );
}
```

## Related

- [`../../design-tokens/README.md`](../../design-tokens/README.md)
- [`../data/README.md`](../data/README.md)
- [`../state/README.md`](../state/README.md)
