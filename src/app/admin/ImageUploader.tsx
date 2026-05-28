"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { uploadVehicleImage } from "@/lib/storage";

type SingleProps = {
  name: string;
  vehicleIdHint: string;
  defaultUrl?: string;
  required?: boolean;
};

export function SingleImageUploader({
  name,
  vehicleIdHint,
  defaultUrl,
  required,
}: SingleProps) {
  const [url, setUrl] = useState<string>(defaultUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = (file: File) => {
    setError(null);
    startTransition(async () => {
      const res = await uploadVehicleImage(file, vehicleIdHint);
      if ("error" in res) setError(res.error);
      else setUrl(res.url);
    });
  };

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={url} required={required} />
      <div className="flex items-start gap-4">
        <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
          {url ? (
            <Image
              src={url}
              alt="Vista previa"
              fill
              sizes="160px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
              Sin imagen
            </div>
          )}
          {pending && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-xs text-zinc-700">
              Subiendo…
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onPick(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={pending}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-60"
          >
            {url ? "Reemplazar" : "Subir imagen"}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="text-xs font-medium text-red-600 hover:text-red-800"
            >
              Quitar
            </button>
          )}
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

type GalleryProps = {
  name: string;
  vehicleIdHint: string;
  defaultUrls?: string[];
  required?: boolean;
};

export function GalleryImageUploader({
  name,
  vehicleIdHint,
  defaultUrls,
  required,
}: GalleryProps) {
  const [urls, setUrls] = useState<string[]>(defaultUrls ?? []);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    setError(null);
    const arr = Array.from(files);
    startTransition(async () => {
      const uploads = await Promise.all(
        arr.map((f) => uploadVehicleImage(f, vehicleIdHint)),
      );
      const failed = uploads.find((u) => "error" in u);
      if (failed && "error" in failed) {
        setError(failed.error);
      }
      const ok = uploads
        .filter((u): u is { url: string; path: string } => "url" in u)
        .map((u) => u.url);
      if (ok.length > 0) setUrls((prev) => [...prev, ...ok]);
    });
  };

  const remove = (idx: number) =>
    setUrls((prev) => prev.filter((_, i) => i !== idx));

  const move = (idx: number, dir: -1 | 1) =>
    setUrls((prev) => {
      const next = prev.slice();
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });

  return (
    <div className="space-y-3">
      {urls.map((u) => (
        <input key={u} type="hidden" name={name} value={u} />
      ))}
      {required && urls.length === 0 && (
        <input
          type="text"
          name={name}
          required
          value=""
          readOnly
          className="hidden"
        />
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {urls.map((url, idx) => (
          <div
            key={url + idx}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100"
          >
            <Image
              src={url}
              alt={`Imagen ${idx + 1}`}
              fill
              sizes="200px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-zinc-900/70 px-1.5 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  className="rounded px-1 hover:bg-white/10 disabled:opacity-40"
                  aria-label="Mover arriba"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(idx, 1)}
                  disabled={idx === urls.length - 1}
                  className="rounded px-1 hover:bg-white/10 disabled:opacity-40"
                  aria-label="Mover abajo"
                >
                  ↓
                </button>
              </div>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="rounded px-1 text-red-300 hover:bg-white/10 hover:text-red-100"
                aria-label="Quitar"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={pending}
          className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-xs font-medium text-zinc-500 hover:bg-zinc-100 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-2xl">add_a_photo</span>
          {pending ? "Subiendo…" : "Añadir imágenes"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
          }
          e.target.value = "";
        }}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
      {urls.length === 0 && (
        <p className="text-xs text-zinc-500">
          Sube al menos una imagen para la galería del detalle.
        </p>
      )}
    </div>
  );
}
