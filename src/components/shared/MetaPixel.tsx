"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, getConsent } from "@/lib/consent";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  // Marketing consent — read on mount, kept in sync via a custom event from
  // the cookie banner / settings link.
  const [granted, setGranted] = useState(false);

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

  // Best-effort revoke if the user opts out after the pixel was loaded.
  useEffect(() => {
    if (!granted && typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "revoke");
    }
  }, [granted]);

  // Fire PageView on every client-side navigation, but only when consent is
  // granted and we're not under /admin.
  useEffect(() => {
    if (!granted || isAdmin) return;
    if (typeof window === "undefined") return;
    window.fbq?.("track", "PageView");
  }, [pathname, granted, isAdmin]);

  if (!PIXEL_ID || isAdmin || !granted) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
