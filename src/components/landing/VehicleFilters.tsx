"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { KM_RANGES } from "@/lib/vehicles";

type Props = {
  brands: string[];
  fuels: string[];
  years: number[];
};

const selectClass =
  "font-label w-full rounded-lg border-none bg-surface-container-lowest p-3 text-on-surface focus:ring-2 focus:ring-primary/40";
const labelClass =
  "font-label mb-2 block text-xs font-bold uppercase text-secondary";

export function VehicleFilters({ brands, fuels, years }: Props) {
  const [filters, setFilters] = useQueryStates(
    {
      marca: parseAsString.withDefault(""),
      km: parseAsString.withDefault(""),
      yearFrom: parseAsString.withDefault(""),
      yearTo: parseAsString.withDefault(""),
      fuel: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: false, history: "replace" },
  );

  function set(key: keyof typeof filters, value: string) {
    setFilters({ [key]: value || null, page: 1 });
  }

  const hasFilters = !!(
    filters.marca ||
    filters.km ||
    filters.yearFrom ||
    filters.yearTo ||
    filters.fuel
  );

  return (
    <aside className="w-full shrink-0 rounded-xl bg-surface-container-low p-6 lg:sticky lg:top-24 lg:w-72 lg:max-w-[18rem]">
      <div className="mb-6 flex items-center justify-between">
        <p className="font-label text-xs font-bold uppercase tracking-widest text-secondary">
          Filtros
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() =>
              setFilters({
                marca: null,
                km: null,
                yearFrom: null,
                yearTo: null,
                fuel: null,
                page: 1,
              })
            }
            className="font-label text-xs font-semibold text-primary hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {/* Marca */}
        <div>
          <label className={labelClass}>Marca</label>
          <select
            className={selectClass}
            value={filters.marca}
            onChange={(e) => set("marca", e.target.value)}
          >
            <option value="">Todas las marcas</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Kilometraje */}
        <div>
          <label className={labelClass}>Kilometraje</label>
          <select
            className={selectClass}
            value={filters.km}
            onChange={(e) => set("km", e.target.value)}
          >
            <option value="">Cualquier kilometraje</option>
            {KM_RANGES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rango de año */}
        <div>
          <label className={labelClass}>Rango de año</label>
          <div className="flex gap-2">
            <select
              className={selectClass}
              value={filters.yearFrom}
              onChange={(e) => set("yearFrom", e.target.value)}
            >
              <option value="">Desde</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
            <select
              className={selectClass}
              value={filters.yearTo}
              onChange={(e) => set("yearTo", e.target.value)}
            >
              <option value="">Hasta</option>
              {[...years].reverse().map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Combustible */}
        <div>
          <label className={labelClass}>Combustible</label>
          <select
            className={selectClass}
            value={filters.fuel}
            onChange={(e) => set("fuel", e.target.value)}
          >
            <option value="">Cualquier combustible</option>
            {fuels.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
