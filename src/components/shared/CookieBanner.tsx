"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  REOPEN_EVENT,
  getConsent,
  reopenConsentBanner,
  setConsent,
} from "@/lib/consent";

export function CookieBanner() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  const [open, setOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // First-visit auto-show: only if no decision recorded yet.
    if (getConsent() === null) {
      setOpen(true);
    }
    const onReopen = () => {
      const current = getConsent();
      setMarketing(current?.marketing ?? false);
      setShowConfig(current !== null);
      setOpen(true);
    };
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  if (!open || isAdmin) return null;

  const acceptAll = () => {
    setConsent({ marketing: true, ts: Date.now() });
    setOpen(false);
  };
  const rejectAll = () => {
    setConsent({ marketing: false, ts: Date.now() });
    setOpen(false);
  };
  const savePrefs = () => {
    setConsent({ marketing, ts: Date.now() });
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6"
    >
      <h2 id="cookie-title" className="text-base font-bold text-zinc-900">
        Tu privacidad
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
        Usamos cookies necesarias para que la web funcione. Las cookies de
        marketing nos ayudan a medir nuestras campañas en Meta (Facebook /
        Instagram) y son opcionales. Puedes aceptar, rechazar o configurar tu
        elección. Más información en nuestra{" "}
        <Link href="/legal/privacidad" className="underline hover:text-zinc-900">
          política de privacidad
        </Link>
        .
      </p>

      {showConfig && (
        <div className="mt-4 space-y-3 rounded-xl bg-zinc-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-zinc-900">
                Necesarias
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Imprescindibles para la sesión y para que el panel de
                administración funcione. No se pueden desactivar.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-700">
              Siempre activas
            </span>
          </div>
          <label className="flex items-start justify-between gap-4">
            <span className="flex-1">
              <span className="block text-sm font-semibold text-zinc-900">
                Marketing
              </span>
              <span className="mt-1 block text-xs text-zinc-500">
                Meta Pixel para medir la efectividad de nuestros anuncios.
              </span>
            </span>
            <span className="relative mt-1 inline-flex">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="peer sr-only"
                aria-label="Permitir cookies de marketing"
              />
              <span
                aria-hidden
                className="block h-5 w-9 rounded-full bg-zinc-300 transition-colors peer-checked:bg-red-600"
              />
              <span
                aria-hidden
                className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"
              />
            </span>
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setShowConfig((s) => !s)}
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          {showConfig ? "Ocultar opciones" : "Configurar"}
        </button>
        {showConfig ? (
          <button
            type="button"
            onClick={savePrefs}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Guardar preferencias
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Aceptar todo
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function CookieSettingsLink({
  className,
  children = "Cookies",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => reopenConsentBanner()}
      className={className}
    >
      {children}
    </button>
  );
}
