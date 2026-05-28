"use client";

const KEY = "otomotor-consent";

export type ConsentValue = {
  marketing: boolean;
  ts: number;
};

export const CONSENT_EVENT = "otomotor:consent";
export const REOPEN_EVENT = "otomotor:consent-reopen";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentValue;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  } catch {
    /* no-op */
  }
}

export function reopenConsentBanner() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(REOPEN_EVENT));
}
