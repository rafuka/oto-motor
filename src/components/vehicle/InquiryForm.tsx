"use client";

import { useState } from "react";

export function InquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const hasContact = phone.trim() !== "" || email.trim() !== "";
  const canSubmit = name.trim() !== "" && hasContact;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-xl bg-surface-container-highest p-4 text-sm font-medium text-on-surface"
      >
        ¡Gracias, {name.trim()}! Un asesor se pondrá en contacto contigo a la brevedad.
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant outline-none ring-1 ring-transparent transition-all focus:ring-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <label className="block">
        <span className="sr-only">Nombre</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          autoComplete="name"
          className={inputClass}
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Teléfono</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Teléfono"
            autoComplete="tel"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className={inputClass}
          />
        </label>
      </div>
      <p className="font-label text-xs text-on-surface-variant">
        Indica un teléfono o un email para que podamos contactarte.
      </p>
      <button
        type="submit"
        disabled={!canSubmit}
        className="signature-gradient flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="material-symbols-outlined detail-icons">mail</span>
        Solicitar Información
      </button>
    </form>
  );
}
