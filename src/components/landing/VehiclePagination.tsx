"use client";

import { parseAsInteger, useQueryState } from "nuqs";

type Props = {
  totalPages: number;
  currentPage: number;
};

export function VehiclePagination({ totalPages, currentPage }: Props) {
  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false, history: "push" }),
  );

  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-16 flex items-center justify-center space-x-2"
      aria-label="Paginación"
    >
      <button
        type="button"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Página anterior"
        className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
        n === currentPage ? (
          <span
            key={n}
            aria-current="page"
            className="kinetic-gradient flex h-12 w-12 items-center justify-center rounded-lg font-bold text-white"
          >
            {n}
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => setPage(n)}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant font-bold text-on-surface transition-colors hover:bg-surface-container"
          >
            {n}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Página siguiente"
        className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  );
}
