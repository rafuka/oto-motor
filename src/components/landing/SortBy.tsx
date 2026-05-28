"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { SORT_OPTIONS } from "@/lib/search-params";

export function SortBy() {
  const [state, setState] = useQueryStates(
    {
      sort: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: false, history: "replace" },
  );

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary">
        Ordenar
      </span>
      <select
        value={state.sort}
        onChange={(e) =>
          setState({ sort: e.target.value || null, page: 1 })
        }
        className="font-label rounded-lg border-none bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary/40"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
