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
  const reduceMotion = useReducedMotion();

  const slides = useMemo(
    () => d.images.map((img) => ({ src: img, alt: v.name, key: img })),
    [d.images, v.name],
  );

  const [index, setIndex] = useState(0);
  const len = slides.length;
  const go = useCallback((delta: number) => setIndex((i) => (i + delta + len) % len), [len]);

  const transition = useMemo(
    () => (reduceMotion ? { duration: 0.12 } : { duration: 0.5, ease: easeSmooth }),
    [reduceMotion],
  );

  const imageMotion = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const current = slides[index];

  return (
    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-12">
      {/* Main image — left, 7 cols on md, 8 cols on lg */}
      <div className="group relative col-span-1 aspect-[16/9] overflow-hidden rounded-xl shadow-2xl md:col-span-7 lg:col-span-8">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 58vw, 66vw"
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
          <span className="material-symbols-outlined detail-icons text-[22px]">chevron_left</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/50"
          aria-label="Imagen siguiente"
        >
          <span className="material-symbols-outlined detail-icons text-[22px]">chevron_right</span>
        </button>

        <div
          className="absolute bottom-4 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5"
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
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails — right side; 1 col on mobile, 2 cols on md, 3 cols on lg */}
      <div className="col-span-1 grid grid-cols-2 gap-3 md:col-span-5 md:grid-cols-2 lg:col-span-4 lg:grid-cols-3">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver foto ${i + 1}`}
            aria-pressed={i === index}
            className={`relative aspect-video overflow-hidden rounded-lg ring-offset-2 transition-all ${
              i === index
                ? "ring-2 ring-primary ring-offset-surface shadow-md"
                : "opacity-70 hover:opacity-100 hover:ring-2 hover:ring-white/40"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 25vw, 17vw"
            />
            {i === index && (
              <div className="absolute inset-0 bg-primary/10" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
