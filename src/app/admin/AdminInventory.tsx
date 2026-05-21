"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import type { AdminVehicle } from "@/lib/vehicles";
import { formatKm } from "@/lib/vehicles";
import {
  deleteVehicleAction,
  setVehicleListedAction,
} from "./actions";
import { VehicleForm } from "./VehicleForm";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function matches(vehicle: AdminVehicle, terms: string[]) {
  if (terms.length === 0) return true;
  const haystack = normalize(
    [
      vehicle.name,
      vehicle.id,
      vehicle.year,
      vehicle.fuel,
      vehicle.tag3,
      vehicle.engineShort,
      vehicle.price,
    ].join(" "),
  );
  return terms.every((t) => haystack.includes(t));
}

function ListedSwitch({
  vehicleId,
  initialListed,
}: {
  vehicleId: string;
  initialListed: boolean;
}) {
  const [listed, setListed] = useState(initialListed);
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    const next = !listed;
    setListed(next);
    startTransition(async () => {
      const res = await setVehicleListedAction(vehicleId, next);
      if (res?.error) setListed(!next);
    });
  };

  return (
    <label
      className="inline-flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        role="switch"
        aria-checked={listed}
        disabled={pending}
        onClick={toggle}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:opacity-60 ${
          listed ? "bg-red-600" : "bg-zinc-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            listed ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
      <span className="text-xs font-medium text-zinc-700">Listado</span>
    </label>
  );
}

function Row({
  vehicle,
  expanded,
  onToggleExpand,
}: {
  vehicle: AdminVehicle;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  return (
    <>
      <tr
        onClick={onToggleExpand}
        className={`cursor-pointer transition-colors ${
          expanded ? "bg-zinc-50" : "hover:bg-zinc-50"
        } ${vehicle.listed ? "" : "opacity-60"}`}
      >
        <td className="px-4 py-3">
          <div className="relative h-14 w-20 overflow-hidden rounded-md bg-zinc-100">
            <Image
              src={vehicle.image}
              alt={vehicle.imageAlt}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="font-medium text-zinc-900">{vehicle.name}</div>
          <div className="font-mono text-xs text-zinc-500">{vehicle.id}</div>
        </td>
        <td className="px-4 py-3 text-zinc-700">{vehicle.year}</td>
        <td className="px-4 py-3 text-zinc-700">{formatKm(vehicle.km)}</td>
        <td className="px-4 py-3 text-zinc-700">{vehicle.fuel}</td>
        <td className="px-4 py-3 font-semibold text-zinc-900">{vehicle.price}</td>
        <td className="px-4 py-3">
          <ListedSwitch
            vehicleId={vehicle.id}
            initialListed={vehicle.listed}
          />
        </td>
        <td className="px-4 py-3 text-right text-zinc-400">
          <span
            className="material-symbols-outlined text-xl"
            aria-hidden
          >
            {expanded ? "expand_less" : "expand_more"}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-zinc-50">
          <td colSpan={8} className="px-4 py-6">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/vehiculo/${vehicle.id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900"
                >
                  <span className="material-symbols-outlined text-base">
                    open_in_new
                  </span>
                  Ver en la web
                </Link>
                <form action={deleteVehicleAction}>
                  <input type="hidden" name="id" value={vehicle.id} />
                  <button
                    type="submit"
                    onClick={(e) => {
                      if (
                        !confirm(
                          `¿Eliminar definitivamente "${vehicle.name}"? Esta acción no se puede deshacer.`,
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                    Eliminar
                  </button>
                </form>
              </div>
              <VehicleForm mode="edit" vehicle={vehicle} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function AdminInventory({ vehicles }: { vehicles: AdminVehicle[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const terms = normalize(query)
      .split(/\s+/)
      .filter(Boolean);
    return vehicles.filter((v) => matches(v, terms));
  }, [vehicles, query]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <span
          className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          aria-hidden
        >
          search
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, ID, año, combustible…"
          className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-10 text-sm shadow-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Borrar búsqueda"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        )}
      </div>

      <p className="text-xs text-zinc-500">
        Mostrando {filtered.length} de {vehicles.length} vehículos
        {query ? ` para "${query}"` : ""}.
      </p>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Año</th>
              <th className="px-4 py-3">KM</th>
              <th className="px-4 py-3">Combustible</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((v) => (
              <Row
                key={v.id}
                vehicle={v}
                expanded={expandedId === v.id}
                onToggleExpand={() =>
                  setExpandedId((curr) => (curr === v.id ? null : v.id))
                }
              />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-zinc-500"
                >
                  {vehicles.length === 0
                    ? "No hay vehículos todavía."
                    : "Ningún vehículo coincide con la búsqueda."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
