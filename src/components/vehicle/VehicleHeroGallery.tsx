"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Vehicle } from "@/lib/vehicles";

type Props = {
  vehicle: Vehicle;
};

const easeSmooth = [0.22, 1, 0.36, 1] as const;
const THUMB_GAP = 8;
const THUMB_HEIGHT_MOBILE = 64;
const THUMB_HEIGHT_DESKTOP = 80;

// Derive a descriptive alt label from the storage file name. Helps image search
// rank for "<vehicle> interior", "<vehicle> vista trasera", etc.
const ALT_KEYWORDS: Array<[RegExp, string]> = [
  [/car_front_left/i, "vista frontal izquierda"],
  [/car_front_right/i, "vista frontal derecha"],
  [/car_front/i, "vista frontal"],
  [/car_rear_left/i, "vista trasera izquierda"],
  [/car_rear_right/i, "vista trasera derecha"],
  [/car_rear/i, "vista trasera"],
  [/wheel/i, "llanta"],
  [/trunk/i, "maletero"],
  [/cockpit/i, "puesto de conducción"],
  [/dashboard/i, "salpicadero"],
  [/cluster/i, "cuadro de instrumentos"],
  [/steering_wheel/i, "volante"],
  [/gear_selector|gear/i, "palanca de cambios"],
  [/seats_rear/i, "asientos traseros"],
  [/seats_front|seat_sport/i, "asientos delanteros"],
  [/seat/i, "asiento"],
  [/screen_nav|screen_fulllink|gps/i, "pantalla de navegación"],
  [/screen_camera|reverse_camera/i, "cámara de visión trasera"],
  [/screen_climate|climate/i, "climatizador"],
  [/light/i, "controles de luces"],
  [/mirror/i, "espejo"],
  [/door/i, "puerta"],
  [/center_console/i, "consola central"],
  [/passenger_side|driver_side/i, "habitáculo"],
  [/interior/i, "interior"],
];

function buildAlt(name: string, url: string, idx: number, total: number) {
  const slug = url.split("/").pop() ?? "";
  for (const [re, label] of ALT_KEYWORDS) {
    if (re.test(slug)) return `${name} — ${label} (${idx + 1}/${total})`;
  }
  return `${name} — foto ${idx + 1} de ${total}`;
}

function wrap(i: number, n: number) {
  return ((i % n) + n) % n;
}

export function VehicleHeroGallery({ vehicle: v }: Props) {
  const d = v.detail;
  const reduceMotion = useReducedMotion();

  const slides = useMemo(
    () =>
      d.images.map((img, idx) => ({
        src: img,
        alt: buildAlt(v.name, img, idx, d.images.length),
        key: img,
      })),
    [d.images, v.name],
  );

  const len = slides.length;

  // `position` is an unbounded integer; the slide actually displayed is
  // slides[wrap(position, len)]. Keeping position unbounded lets the carousel
  // wrap forever without a visible "snap-back" when crossing the index 0 / len-1
  // boundary — the strip just keeps translating in one direction.
  const [position, setPosition] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const logical = wrap(position, len);
  const current = slides[logical];

  const go = useCallback((delta: number) => setPosition((p) => p + delta), []);

  const transition = useMemo(
    () =>
      reduceMotion ? { duration: 0.12 } : { duration: 0.5, ease: easeSmooth },
    [reduceMotion],
  );

  const imageMotion = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  // ─── Carousel sizing ──────────────────────────────────────────────────────
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [thumbWidth, setThumbWidth] = useState(140);
  const [thumbHeight, setThumbHeight] = useState(THUMB_HEIGHT_DESKTOP);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      const el = wrapperRef.current;
      if (!el) return;
      setContainerWidth(el.clientWidth);
      const desktop = window.innerWidth >= 640;
      setThumbWidth(desktop ? 140 : 110);
      setThumbHeight(desktop ? THUMB_HEIGHT_DESKTOP : THUMB_HEIGHT_MOBILE);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pitch = thumbWidth + THUMB_GAP;
  const half = (containerWidth - thumbWidth) / 2;
  const baseX = -position * pitch + half + dragX;

  // ─── Sliding window of rendered thumbs ────────────────────────────────────
  // Each thumb is rendered at absolute `left = absIdx * pitch` inside the
  // strip; the strip itself translates by baseX. As `position` changes we
  // re-window so we only mount enough thumbs to cover the viewport + buffer.
  const dragSteps = Math.round(dragX / pitch);
  const focus = position - dragSteps;
  const bufferCount = useMemo(() => {
    if (pitch <= 0 || containerWidth === 0) return 0;
    return Math.ceil(containerWidth / pitch) + 4;
  }, [containerWidth, pitch]);

  const visibleIndices = useMemo(() => {
    if (bufferCount === 0) return [] as number[];
    const arr: number[] = [];
    for (let i = focus - bufferCount; i <= focus + bufferCount; i++) {
      arr.push(i);
    }
    return arr;
  }, [focus, bufferCount]);

  // ─── Pointer-event drag (touch + mouse + pen) ────────────────────────────
  // We defer entering the "dragging" state until the pointer has moved past a
  // small threshold. A pure click therefore never disables the CSS transition,
  // so updating `position` from a thumb's onClick animates the strip smoothly.
  const DRAG_THRESHOLD = 4;
  const dragStartRef = useRef<{
    pointerId: number;
    startX: number;
    startDragX: number;
    moved: boolean;
  } | null>(null);
  // Flag set by endDrag so the synthesized click event right after a real
  // drag doesn't re-trigger setPosition on whichever thumb was under the
  // finger when it lifted.
  const justDraggedRef = useRef(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStartRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startDragX: dragX,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragStartRef.current;
    if (!s || s.pointerId !== e.pointerId) return;
    const delta = e.clientX - s.startX;
    if (!s.moved) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      s.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(true);
    }
    setDragX(s.startDragX + delta);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragStartRef.current;
    if (!s || s.pointerId !== e.pointerId) return;
    if (s.moved) {
      const total = s.startDragX + (e.clientX - s.startX);
      const steps = Math.round(total / pitch);
      if (steps !== 0) setPosition((p) => p - steps);
      setDragX(0);
      setDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* no-op */
      }
      justDraggedRef.current = true;
      // Cleared on the next macrotask, after the browser had a chance to
      // dispatch the synthetic click event that follows the pointerup.
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 0);
    }
    dragStartRef.current = null;
  };

  useEffect(() => {
    if (!dragging) return;
    const cancel = () => {
      setDragX(0);
      setDragging(false);
      dragStartRef.current = null;
    };
    window.addEventListener("blur", cancel);
    return () => window.removeEventListener("blur", cancel);
  }, [dragging]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-2xl">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1100px"
              priority={position === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-[2] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/50 md:flex"
          aria-label="Imagen anterior"
        >
          <span className="material-symbols-outlined detail-icons text-[22px]">
            chevron_left
          </span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-[2] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/50 md:flex"
          aria-label="Imagen siguiente"
        >
          <span className="material-symbols-outlined detail-icons text-[22px]">
            chevron_right
          </span>
        </button>

        <div className="absolute bottom-3 right-3 z-[2] rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {logical + 1} / {len}
        </div>
      </div>

      {/* Circular thumbnail strip */}
      <div
        ref={wrapperRef}
        className="relative overflow-hidden select-none"
        style={{ height: thumbHeight, touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-surface to-transparent" />

        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(${baseX}px, 0, 0)`,
            transition:
              dragging || reduceMotion
                ? "none"
                : "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
            cursor: dragging ? "grabbing" : "grab",
            willChange: "transform",
          }}
        >
          {visibleIndices.map((absIdx) => {
            const slide = slides[wrap(absIdx, len)];
            const isActive = absIdx === position;
            return (
              <button
                key={absIdx}
                type="button"
                onClick={(e) => {
                  if (justDraggedRef.current) {
                    e.preventDefault();
                    return;
                  }
                  setPosition(absIdx);
                }}
                aria-label={`Ver foto ${wrap(absIdx, len) + 1}`}
                aria-pressed={isActive}
                draggable={false}
                className={`absolute top-0 overflow-hidden rounded-lg transition-opacity ${
                  isActive
                    ? "opacity-100 ring-2 ring-primary"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  left: absIdx * pitch,
                  width: thumbWidth,
                  height: thumbHeight,
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="140px"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
