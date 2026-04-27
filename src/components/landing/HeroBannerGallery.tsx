"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatKm } from "@/lib/vehicles";
import type { Vehicle } from "@/lib/vehicles";

type Props = {
  items: Vehicle[];
};

const AUTO_MS = 7000;

const easeSmooth = [0.22, 1, 0.36, 1] as const;

/** Stable min height so the card doesn’t resize when titles/prices differ */
const BUBBLE_MIN_H = "min-h-[130px] sm:min-h-[160px]";

export function HeroBannerGallery({ items }: Props) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const safeLen = items.length;
  const current = safeLen > 0 ? items[index % safeLen] : null;

  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.15 }
        : {
            duration: 0.55,
            ease: easeSmooth,
          },
    [reduceMotion],
  );

  const bubbleTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.12 }
        : {
            duration: 0.4,
            ease: easeSmooth,
          },
    [reduceMotion],
  );

  const go = useCallback(
    (delta: number) => {
      if (safeLen === 0) return;
      setIndex((i) => (i + delta + safeLen) % safeLen);
    },
    [safeLen],
  );

  useEffect(() => {
    if (safeLen <= 1) return;
    // const id = window.setInterval(() => go(1), AUTO_MS);
    // return () => window.clearInterval(id);
  }, [go, safeLen]);

  if (!current) return null;

  const label = current.badge?.text ?? "Destacado";

  const imageMotion = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

  /** Bubble: opacity only; zIndex keeps the incoming slide on top for clicks during crossfade */
  const bubbleMotion = reduceMotion
    ? {
        initial: { opacity: 1, zIndex: 2 },
        animate: { opacity: 1, zIndex: 2 },
        exit: { opacity: 1, zIndex: 0 },
      }
    : {
        initial: { opacity: 0, zIndex: 2 },
        animate: { opacity: 1, zIndex: 2 },
        exit: { opacity: 0, zIndex: 0 },
      };

  return (
    <div className="relative -mx-6 sm:mx-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-none sm:rounded-2xl shadow-2xl">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={current.id}
            className="absolute inset-0"
            {...imageMotion}
            transition={transition}
          >
            <Image
              src={current.image}
              alt={current.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {safeLen > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-zinc-900 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Anterior imagen"
            >
              <span className="material-symbols-outlined text-[22px]">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-zinc-900 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Siguiente imagen"
            >
              <span className="material-symbols-outlined text-[22px]">
                chevron_right
              </span>
            </button>
            <div
              className="hidden sm:flex absolute bottom-3 left-1/2 z-[2] -translate-x-1/2 gap-1.5"
              role="tablist"
              aria-label="Seleccionar imagen del banner"
            >
              {items.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ver ${v.name}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Shell stays one size; slides crossfade in a single overlay — no layout stack */}
      <AnimatePresence>
        <motion.div
          key={current.id}
          className="absolute -bottom-20 left-[50%] -translate-x-[50%] lg:-bottom-10 lg:-left-10 lg:translate-x-0 w-[300px] z-[3]"
          style={{ contain: "layout style" }}
          transition={bubbleTransition}
          {...bubbleMotion}
        >
          <Link href={`/vehiculo/${current.id}`}>
            <div className="kinetic-gradient text-white relative overflow-hidden rounded-xl shadow-xl">
              <div className={`relative ${BUBBLE_MIN_H} w-full`}>
                  <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                    <p className="font-label text-[10px] sm:text-xs font-medium uppercase tracking-widest opacity-80">
                      {label}
                    </p>
                    <p className="mt-1 text-md sm:text-xl font-bold leading-tight">
                      {current.name}
                    </p>
                    <div className="flex items-center mt-1 sm:mt-3 justify-between">
                      <div className="flex items-center font-label text-sm">
                        <span className="material-symbols-outlined mr-1 text-[18px]">
                          payments
                        </span>
                        {current.price}
                      </div>
                      <div className="font-label text-xs opacity-85">
                        {current.year} · {formatKm(current.km)}
                      </div>
                    </div>
                    <span
                      
                      className="font-label self-end mt-3 inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white decoration-white/80 underline-offset-4 transition-opacity hover:opacity-90"
                    >
                      Ver más
                      <span className="material-symbols-outlined ml-0.5 text-[14px] sm:text-[18px]">
                        arrow_forward
                      </span>
                    </span>
                  </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
