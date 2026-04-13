"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import type { Vehicle } from "@/lib/vehicles";

type Props = {
  vehicle: Vehicle;
};

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export function VehicleHeroGallery({ vehicle: v }: Props) {
  const d = v.detail;
  const titleSlug = v.name.toUpperCase();
  const reduceMotion = useReducedMotion();

  const slides = useMemo(
    () => [
      { src: d.mainImage, alt: v.name, key: "main" },
      { src: d.thumb1, alt: d.thumb1Alt, key: "thumb1" },
      { src: d.thumb2, alt: d.thumb2Alt, key: "thumb2" },
      {
        src: d.narrativeImage,
        alt: d.narrativeImageAlt,
        key: "narrative",
      },
    ],
    [
      d.mainImage,
      d.thumb1,
      d.thumb2,
      d.narrativeImage,
      v.name,
      d.thumb1Alt,
      d.thumb2Alt,
      d.narrativeImageAlt,
    ],
  );

  const [index, setIndex] = useState(0);
  const len = slides.length;
  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + len) % len);
    },
    [len],
  );

  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.12 }
        : { duration: 0.5, ease: easeSmooth },
    [reduceMotion],
  );

  const imageMotion = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

  const current = slides[index];

  return (
    <div className="grid grid-cols-12 items-start gap-6">
      <div className="group relative col-span-12 aspect-[16/9] overflow-hidden rounded-xl shadow-2xl lg:col-span-8">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={current.key}
            className="absolute inset-0"
            {...imageMotion}
            transition={transition}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority={index === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/50"
          aria-label="Imagen anterior"
        >
          <span className="material-symbols-outlined detail-icons text-[22px]">
            chevron_left
          </span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/50"
          aria-label="Imagen siguiente"
        >
          <span className="material-symbols-outlined detail-icons text-[22px]">
            chevron_right
          </span>
        </button>

        <div
          className="absolute bottom-20 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5"
          role="tablist"
          aria-label="Galería del vehículo"
        >
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Foto ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="glass-effect absolute bottom-0 left-0 z-[1] flex w-full items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-8">
          <div>
            <span className="mb-2 inline-block rounded-md bg-primary-container px-3 py-1 font-label text-xs font-bold uppercase tracking-widest text-primary-fixed">
              {d.heroBadge}
            </span>
            <h1 className="text-5xl font-black italic tracking-tighter text-white">
              {titleSlug}
            </h1>
            <p className="font-label mt-2 text-sm text-white/80">
              {d.heroSubtitle}
            </p>
          </div>
          <div className="text-right">
            <p className="font-label text-xs uppercase tracking-widest text-white/70">
              Precio Especial
            </p>
            <p className="text-3xl font-black tracking-tight text-white">
              {d.priceLine}
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setIndex(1)}
            className={`relative aspect-square overflow-hidden rounded-xl ring-offset-2 transition-shadow ${
              index === 1
                ? "ring-2 ring-primary ring-offset-surface"
                : "ring-0 hover:ring-2 hover:ring-white/30"
            }`}
            aria-label="Ver foto detalle 1"
            aria-pressed={index === 1}
          >
            <Image
              src={d.thumb1}
              alt={d.thumb1Alt}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </button>
          <button
            type="button"
            onClick={() => setIndex(2)}
            className={`relative aspect-square overflow-hidden rounded-xl ring-offset-2 transition-shadow ${
              index === 2
                ? "ring-2 ring-primary ring-offset-surface"
                : "ring-0 hover:ring-2 hover:ring-white/30"
            }`}
            aria-label="Ver foto detalle 2"
            aria-pressed={index === 2}
          >
            <Image
              src={d.thumb2}
              alt={d.thumb2Alt}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </button>
        </div>

        <div className="space-y-4 rounded-xl bg-surface-container-low p-6">
          <h3 className="text-on-surface text-xl font-black italic">
            ¿Interesado en esta unidad?
          </h3>
          <p className="body-lg leading-relaxed text-on-surface-variant">
            Nuestros asesores expertos están listos para brindarte una
            experiencia personalizada.
          </p>
          <div className="space-y-3 pt-2">
            <button
              type="button"
              className="signature-gradient flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-white transition-all hover:opacity-90 active:scale-95"
            >
              <span className="material-symbols-outlined detail-icons">
                mail
              </span>
              Solicitar Información
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container-highest py-4 text-lg font-bold text-on-surface transition-all hover:bg-surface-container-high active:scale-95"
            >
              <span className="material-symbols-outlined detail-icons">
                calendar_today
              </span>
              Agendar Prueba de Manejo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
