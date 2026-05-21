import type { Vehicle } from "./vehicles";
import { parsePrice, getBrand } from "./vehicles";
import {
  SITE_URL,
  SITE_NAME,
  SITE_PHONE,
  BUSINESS_ADDRESS,
  absoluteUrl,
} from "./site";

type Json = Record<string, unknown>;

export function organizationJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/oto_motor_logo.jpg"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_PHONE,
      contactType: "sales",
      areaServed: "ES",
      availableLanguage: ["Spanish"],
    },
  };
}

export function autoDealerJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${SITE_URL}#dealer`,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl("/oto_motor_logo.jpg"),
    logo: absoluteUrl("/oto_motor_logo.jpg"),
    telephone: SITE_PHONE,
    priceRange: "€€-€€€",
    address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
    areaServed: { "@type": "AdministrativeArea", name: "Comunidad de Madrid" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:00",
      }
    ],
  };
}

export function vehicleJsonLd(v: Vehicle): Json {
  const price = parsePrice(v.price);
  const brand = getBrand(v.name);
  const url = absoluteUrl(`/vehiculo/${v.id}`);

  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: v.name,
    description: `${v.name} ${v.year} con ${v.km.toLocaleString("es-ES")} km, motor ${v.engineShort}, ${v.fuel}.`,
    url,
    brand: { "@type": "Brand", name: brand },
    model: v.name.startsWith(brand)
      ? v.name.slice(brand.length).trim() || v.name
      : v.name,
    vehicleModelDate: v.year,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: v.km,
      unitCode: "KMT",
    },
    fuelType: v.fuel,
    vehicleTransmission: v.tag3,
    vehicleEngine: { "@type": "EngineSpecification", engineType: v.engineShort },
    image: v.detail.images.slice(0, 8),
    ...(price !== null && {
      offers: {
        "@type": "Offer",
        price: String(price),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url,
        seller: { "@id": `${SITE_URL}#dealer` },
        itemCondition: "https://schema.org/UsedCondition",
      },
    }),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export type Faq = { question: string; answer: string };

export function faqJsonLd(items: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function itemListJsonLd(vehicles: Vehicle[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: vehicles.length,
    itemListElement: vehicles.slice(0, 30).map((v, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: absoluteUrl(`/vehiculo/${v.id}`),
      name: v.name,
    })),
  };
}

export function jsonLdScript(json: Json | Json[]) {
  return {
    __html: JSON.stringify(json).replace(/</g, "\\u003c"),
  };
}
