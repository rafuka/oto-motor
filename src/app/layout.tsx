import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_LOCALE } from "@/lib/site";
import {
  autoDealerJsonLd,
  jsonLdScript,
  organizationJsonLd,
} from "@/lib/seo";
import { MetaPixel } from "@/components/shared/MetaPixel";
import { CookieBanner } from "@/components/shared/CookieBanner";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Coches de Ocasión Garantizados en Madrid`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Concesionario de coches de ocasión garantizados en Madrid. Audi, BMW, Mercedes, Porsche y más. Financiación a medida y entrega inmediata.",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Coches de Ocasión Garantizados en Madrid`,
    description:
      "Concesionario de coches de ocasión garantizados en Madrid. Audi, BMW, Mercedes, Porsche y más.",
    images: [
      {
        url: "/oto_motor_logo.jpg",
        width: 561,
        height: 421,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Coches de Ocasión Garantizados en Madrid`,
    description:
      "Concesionario de coches de ocasión garantizados en Madrid.",
    images: ["/oto_motor_logo.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b90027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300..400,0..1,0"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript([
            organizationJsonLd(),
            autoDealerJsonLd(),
          ])}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} bg-surface font-body text-on-surface antialiased`}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
        <MetaPixel />
        <CookieBanner />
        <a
          href="https://wa.me/34600749009"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.528 5.845L0 24l6.335-1.509C8.05 23.446 9.982 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.84 0-3.566-.5-5.056-1.371l-.363-.215-3.762.896.955-3.664-.236-.376A9.77 9.77 0 0 1 2.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
