"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Clarity from "@microsoft/clarity";
import { CONSENT_EVENT, getConsent } from "@/lib/consent";

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function ClarityAnalytics() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  // Analytics consent — read on mount, kept in sync via a custom event from
  // the cookie banner / settings link.
  const [granted, setGranted] = useState(false);

  // Clarity.init must only run once per page load.
  const initialized = useRef(false);

  useEffect(() => {
    setGranted(!!getConsent()?.marketing);
    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        marketing?: boolean;
      } | null;
      setGranted(!!detail?.marketing);
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (!PROJECT_ID || isAdmin) return;

    if (granted) {
      if (!initialized.current) {
        Clarity.init(PROJECT_ID);
        initialized.current = true;
      }
      Clarity.consent(true);
    } else if (initialized.current) {
      // Best-effort revoke if the user opts out after Clarity was loaded.
      Clarity.consent(false);
    }
  }, [granted, isAdmin]);

  return null;
}
