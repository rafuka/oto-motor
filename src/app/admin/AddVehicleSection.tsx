"use client";

import { useState } from "react";
import { VehicleForm } from "./VehicleForm";

export function AddVehicleSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
        aria-expanded={open}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Añadir nuevo vehículo
          </h2>
          <p className="text-xs text-zinc-500">
            {open
              ? "Rellena el formulario y guarda para añadir un coche al inventario."
              : "Pulsa para mostrar el formulario."}
          </p>
        </div>
        <span
          className="material-symbols-outlined text-2xl text-zinc-500"
          aria-hidden
        >
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>
      {open && (
        <div className="border-t border-zinc-200 p-6">
          <VehicleForm mode="add" />
        </div>
      )}
    </div>
  );
}
