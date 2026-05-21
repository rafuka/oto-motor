"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function NewsletterForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus({ kind: "error", message: "Introduce un email válido." });
      return;
    }

    setStatus({ kind: "loading" });
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: value, source });

    if (!error) {
      setStatus({
        kind: "success",
        message: "¡Listo! Recibirás nuestras novedades pronto.",
      });
      setEmail("");
      return;
    }

    // Postgres unique-violation = 23505 — surfaced as a friendlier message.
    if (error.code === "23505") {
      setStatus({
        kind: "success",
        message: "Ese email ya está suscrito. ¡Gracias!",
      });
      return;
    }
    setStatus({
      kind: "error",
      message: "No se pudo completar la suscripción. Inténtalo de nuevo.",
    });
  };

  const loading = status.kind === "loading";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-2">
      <div className="flex">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          aria-label="Correo electrónico"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.kind !== "idle" && status.kind !== "loading") {
              setStatus({ kind: "idle" });
            }
          }}
          disabled={loading}
          className="w-full rounded-l-lg border-none bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-red-600 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="Suscribirse al newsletter"
          className="flex items-center justify-center rounded-r-lg bg-zinc-900 px-4 text-white transition-colors hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? (
            <span
              className="material-symbols-outlined animate-spin"
              aria-hidden
            >
              progress_activity
            </span>
          ) : (
            <span className="material-symbols-outlined" aria-hidden>
              send
            </span>
          )}
        </button>
      </div>

      <div aria-live="polite" className="min-h-[1.25rem] text-xs">
        {status.kind === "success" && (
          <p className="text-green-700">{status.message}</p>
        )}
        {status.kind === "error" && (
          <p className="text-red-600">{status.message}</p>
        )}
      </div>
    </form>
  );
}
