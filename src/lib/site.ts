export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const SITE_NAME = "Oto Motor";
export const SITE_LOCALE = "es_ES";
export const SITE_PHONE = "+34600749009";
export const SITE_PHONE_DISPLAY = "+34 600 749 009";

export const BUSINESS_ADDRESS = {
  streetAddress: "C. de las Islas Cíes, 4",
  addressLocality: "Humanes de Madrid",
  addressRegion: "Madrid",
  postalCode: "28970",
  addressCountry: "ES",
};

export function absoluteUrl(path: string) {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
