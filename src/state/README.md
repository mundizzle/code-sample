# State

## What this is

This folder owns local dashboard UI state through a per-instance Zustand vanilla store. It handles selections, filters, date range, chart mode, and mobile detail panel state.

## Why it exists

- UI state and server/data state have different jobs and should not be tangled.
- Zustand keeps interaction state small, explicit, and easy to test.
- A per-instance store provider avoids module-level shared state in React tests and Storybook.
- Store actions copy caller-owned arrays and objects before saving them.

## How it works

- `dashboard-store.ts` defines state, actions, defaults, and store creation.
- `dashboard-store-provider.tsx` exposes the store to React components.
- Components select only the state/actions they need.
- Tests exercise state transitions without rendering the full dashboard.

## Example

```ts
toggleClientFilter: (clientId) =>
  set((state) => {
    const clientIds = state.filters.clientIds.includes(clientId)
      ? state.filters.clientIds.filter((id) => id !== clientId)
      : [...state.filters.clientIds, clientId];

    return { filters: { ...state.filters, clientIds } };
  });
```

## Related

- [`../data/README.md`](../data/README.md)
- [`../app/README.md`](../app/README.md)
- [`../components/README.md`](../components/README.md)
