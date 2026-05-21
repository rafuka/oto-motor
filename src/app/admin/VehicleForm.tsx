"use client";

import { useActionState, useEffect, useRef } from "react";
import type { AdminVehicle } from "@/lib/vehicles";
import {
  addVehicleAction,
  editVehicleAction,
  type VehicleFormState,
} from "./actions";
import {
  GalleryImageUploader,
  SingleImageUploader,
} from "./ImageUploader";

type Mode = "add" | "edit";

type Props = {
  mode: Mode;
  vehicle?: AdminVehicle;
  onSaved?: () => void;
};

function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  defaultValue?: string | number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
      />
    </label>
  );
}

function Area({
  label,
  name,
  rows = 3,
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-xs shadow-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
      />
    </label>
  );
}

export function VehicleForm({ mode, vehicle, onSaved }: Props) {
  const action = mode === "add" ? addVehicleAction : editVehicleAction;
  const [state, formAction, pending] = useActionState<VehicleFormState, FormData>(
    action,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      if (mode === "add") formRef.current?.reset();
      onSaved?.();
    }
  }, [state, mode, onSaved]);

  const d = vehicle?.detail;
  const submitLabel =
    mode === "add"
      ? pending
        ? "Guardando…"
        : "Guardar vehículo"
      : pending
        ? "Actualizando…"
        : "Actualizar vehículo";

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      {mode === "edit" && vehicle && (
        <input type="hidden" name="id" value={vehicle.id} />
      )}

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-zinc-800">
          Información principal
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Nombre"
            name="name"
            required
            placeholder="Audi RS Q3 Sportback"
            defaultValue={vehicle?.name}
          />
          {mode === "add" ? (
            <Field
              label="ID (opcional, se genera desde el nombre)"
              name="id"
              placeholder="audi-rs-q3-sportback"
            />
          ) : (
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                ID
              </span>
              <code className="mt-1 block rounded-lg bg-zinc-100 px-3 py-2 text-xs text-zinc-600">
                {vehicle?.id}
              </code>
            </div>
          )}
          <Field
            label="Precio (con símbolo €)"
            name="price"
            required
            placeholder="56.900 €"
            defaultValue={vehicle?.price}
          />
          <Field
            label="Año"
            name="year"
            required
            placeholder="2023"
            defaultValue={vehicle?.year}
          />
          <Field
            label="Kilómetros"
            name="km"
            type="number"
            required
            placeholder="42000"
            defaultValue={vehicle?.km}
          />
          <Field
            label="Combustible"
            name="fuel"
            required
            placeholder="Gasolina"
            defaultValue={vehicle?.fuel}
          />
          <Field
            label="Cambio (tag3)"
            name="tag3"
            required
            placeholder="Automático S tronic"
            defaultValue={vehicle?.tag3}
          />
          <Field
            label="Motor corto"
            name="engine_short"
            required
            placeholder="2.5 TFSI 400CV"
            defaultValue={vehicle?.engineShort}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-zinc-800">
          Insignia (opcional)
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Texto insignia"
            name="badge_text"
            placeholder="Nuevo Ingreso"
            defaultValue={vehicle?.badge?.text}
          />
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Variante
            </span>
            <select
              name="badge_variant"
              defaultValue={vehicle?.badge?.variant ?? "primary"}
              className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm"
            >
              <option value="primary">primary (rojo)</option>
              <option value="dark">dark (oscuro)</option>
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold text-zinc-800">Imágenes</legend>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
            Imagen principal (listado) <span className="text-red-600">*</span>
          </span>
          <p className="mb-2 text-xs text-zinc-500">
            Se muestra en la cuadrícula del inventario público.
          </p>
          <SingleImageUploader
            name="image"
            vehicleIdHint={vehicle?.id ?? "nuevo"}
            defaultUrl={vehicle?.image}
            required
          />
        </div>

        <Field
          label="Alt imagen principal"
          name="image_alt"
          placeholder="Audi RS Q3 Sportback gris, vista frontal"
          defaultValue={vehicle?.imageAlt}
        />

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
            Galería del detalle <span className="text-red-600">*</span>
          </span>
          <p className="mb-2 text-xs text-zinc-500">
            Puedes subir múltiples imágenes. Reordena con las flechas.
          </p>
          <GalleryImageUploader
            name="images"
            vehicleIdHint={vehicle?.id ?? "nuevo"}
            defaultUrls={d?.images}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Imagen narrativa
            </span>
            <p className="mb-2 text-xs text-zinc-500">
              Opcional. Si la dejas vacía se usa la primera de la galería.
            </p>
            <SingleImageUploader
              name="narrative_image"
              vehicleIdHint={vehicle?.id ?? "nuevo"}
              defaultUrl={d?.narrativeImage}
            />
          </div>
          <Field
            label="Alt narrativa"
            name="narrative_image_alt"
            defaultValue={d?.narrativeImageAlt}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-zinc-800">
          Hero del detalle
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Hero badge"
            name="hero_badge"
            placeholder="Plug-in Hybrid"
            required
            defaultValue={d?.heroBadge}
          />
          <Field
            label="Hero subtítulo"
            name="hero_subtitle"
            placeholder="AÑO 2023 · 42.000 KM"
            required
            defaultValue={d?.heroSubtitle}
          />
        </div>
        <Field
          label="Línea de precio (priceLine)"
          name="price_line"
          placeholder="56.900 €"
          defaultValue={d?.priceLine}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-zinc-800">Narrativa</legend>
        <Area
          label="Párrafo 1"
          name="story_a"
          rows={4}
          required
          defaultValue={d?.story?.[0]}
        />
        <Area
          label="Párrafo 2"
          name="story_b"
          rows={4}
          required
          defaultValue={d?.story?.[1]}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-zinc-800">Equipamiento</legend>
        <Area
          label="Amenities (una por línea)"
          name="amenities"
          rows={6}
          placeholder="Cámara trasera
Sensores de parking
Control crucero"
          defaultValue={d?.amenities.join("\n")}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-zinc-800">
          Especificaciones
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Motor"
            name="motor"
            required
            placeholder="2.5 TFSI"
            defaultValue={d?.specs.motor}
          />
          <Field
            label="Descripción motor"
            name="motor_desc"
            required
            defaultValue={d?.specs.motorDesc}
          />
          <Field
            label="Potencia"
            name="power"
            required
            placeholder="400 CV / 294 kW"
            defaultValue={d?.specs.power}
          />
          <Field
            label="Descripción potencia"
            name="power_desc"
            required
            defaultValue={d?.specs.powerDesc}
          />
          <Field
            label="Aceleración"
            name="accel"
            required
            placeholder="4,5 s"
            defaultValue={d?.specs.accel}
          />
          <Field
            label="Descripción aceleración"
            name="accel_desc"
            required
            defaultValue={d?.specs.accelDesc}
          />
          <Field
            label="Transmisión"
            name="trans"
            required
            placeholder="S tronic 7v"
            defaultValue={d?.specs.trans}
          />
          <Field
            label="Descripción transmisión"
            name="trans_desc"
            required
            defaultValue={d?.specs.transDesc}
          />
        </div>
      </fieldset>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {mode === "add"
            ? "Vehículo guardado correctamente."
            : "Cambios guardados correctamente."}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-60"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
