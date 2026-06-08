import Image from "next/image";
import Link from "next/link";
import { VehicleHeroGallery } from "@/components/vehicle/VehicleHeroGallery";
import { SiteNav } from "@/components/shared/SiteNav";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { formatKm, getBrand, type Vehicle } from "@/lib/vehicles";
import { SITE_URL } from "@/lib/site";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  vehicleJsonLd,
} from "@/lib/seo";

const WHATSAPP_NUMBER = "34600749009";

type Props = { vehicle: Vehicle; related?: Vehicle[] };

export function VehicleDetailView({ vehicle: v, related = [] }: Props) {
  const d = v.detail;
  const brand = getBrand(v.name);

  const vehicleUrl = `${SITE_URL}/vehiculo/${v.id}`;
  const whatsappMessage =
    `Hola, me interesa este vehículo:\n\n` +
    `• ${v.name}\n` +
    `• Año: ${v.year}\n` +
    `• Kilometraje: ${formatKm(v.km)}\n` +
    `• Precio: ${v.price}\n` +
    `• Enlace: ${vehicleUrl}\n\n` +
    `¿Podrían darme más información?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          vehicleJsonLd(v),
          breadcrumbJsonLd([
            { name: "Inicio", url: "/" },
            { name: brand, url: `/?marca=${encodeURIComponent(brand)}` },
            { name: v.name, url: `/vehiculo/${v.id}` },
          ]),
        ])}
      />
      <SiteNav />

      <main className="selection:bg-primary-container selection:text-white pb-16 pt-24 font-body text-on-surface">
        <section className="mx-auto mb-12 max-w-screen-2xl px-6 sm:px-8">
          <nav
            aria-label="Migas de pan"
            className="mb-6 text-xs text-on-surface-variant"
          >
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link
                  href={`/?marca=${encodeURIComponent(brand)}`}
                  className="hover:text-primary"
                >
                  {brand}
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-on-surface" aria-current="page">
                {v.name}
              </li>
            </ol>
          </nav>

          {/* Title + CTA row */}
          <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="md:flex-1">

              <h1 className="text-on-surface mt-2 text-4xl font-black italic uppercase tracking-tighter sm:text-5xl">
                {v.name}
              </h1>
              <p className="font-label mt-2 text-sm text-on-surface-variant">
                {d.heroSubtitle}
              </p>
              <p className="mt-3 text-2xl font-black text-primary">{d.priceLine}</p>
              {d.financing?.trim() && (
                <p className="font-label mt-1 flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant">
                  <span className="material-symbols-outlined text-base text-primary">
                    payments
                  </span>
                  Financiación desde{" "}
                  <span className="text-lg font-bold text-on-surface">
                    {d.financing.trim()}
                  </span>
                  /mes
                </p>
              )}
            </div>

            <div className="w-full space-y-4 rounded-xl bg-surface-container-low p-6 md:flex-1">
              <h3 className="text-on-surface text-xl font-black italic">
                ¿Interesado en esta unidad?
              </h3>
              <p className="body-lg leading-relaxed text-on-surface-variant">
                Nuestros asesores expertos están listos para brindarte una
                experiencia personalizada.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="signature-gradient flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95"
                >
                  <span className="material-symbols-outlined detail-icons">chat</span>
                  Solicitar Información
                </a>
              </div>
            </div>
          </div>

          <VehicleHeroGallery vehicle={v} />
        </section>

        <section className="mb-20 bg-surface-container-low py-4 sm:py-20">
          <div className="mx-auto max-w-screen-2xl px-6 sm:px-8">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Especificaciones
                </span>
                <h2 className="text-on-surface mt-2 text-4xl font-black uppercase italic leading-none tracking-tighter">
                  Arquitectura Técnica
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "settings_input_component" as const,
                  label: "Motor",
                  value: d.specs.motor,
                  desc: d.specs.motorDesc,
                },
                {
                  icon: "speed" as const,
                  label: "Potencia",
                  value: d.specs.power,
                  desc: d.specs.powerDesc,
                },
                {
                  icon: "electric_car" as const,
                  label: "Aceleración",
                  value: d.specs.accel,
                  desc: d.specs.accelDesc,
                },
                {
                  icon: "settings_motion_mode" as const,
                  label: "Transmisión",
                  value: d.specs.trans,
                  desc: d.specs.transDesc,
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="group rounded-xl bg-surface-container-lowest p-8 transition-transform hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined mb-4 text-4xl text-primary detail-icons">
                    {spec.icon}
                  </span>
                  <h4 className="font-label text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
                    {spec.label}
                  </h4>
                  <p className="text-on-surface mt-1 text-2xl font-black">
                    {spec.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-12 items-center gap-16 px-6 sm:px-8">
          <div className="order-2 col-span-1 lg:order-1 lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              La Experiencia
            </span>
            <h2 className="text-on-surface mb-6 mt-2 text-4xl font-black uppercase italic leading-none tracking-tighter">
              Narrativa del Vehículo
            </h2>
            <div className="body-lg space-y-6 leading-relaxed text-on-surface-variant">
              <p>{d.story[0]}</p>
              <p>{d.story[1]}</p>
              <div className="pt-6">
                <h3 className="text-on-surface mb-4 text-xl font-black uppercase italic">
                  Comodidades de Lujo
                </h3>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {d.amenities.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{
                          fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                        }}
                      >
                        check_circle
                      </span>
                      <span className="font-label text-sm font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="order-1 col-span-1 lg:order-2 lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0px_40px_80px_rgba(185,0,39,0.15)]">
              <Image
                src={d.narrativeImage}
                alt={d.narrativeImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mx-auto mt-20 max-w-screen-2xl px-6 sm:px-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Más {brand}
            </span>
            <h2 className="text-on-surface mb-8 mt-2 text-3xl font-black uppercase italic tracking-tighter sm:text-4xl">
              Vehículos similares
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/vehiculo/${r.id}`}
                    className="group block overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-on-surface">
                          {r.name}
                        </h3>
                        <span className="whitespace-nowrap text-base font-bold text-primary">
                          {r.price}
                        </span>
                      </div>
                      <p className="font-label mt-2 text-xs text-on-surface-variant">
                        {r.year} · {formatKm(r.km)} · {r.fuel}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <SiteFooter newsletterSource="vehicle_detail" />
    </>
  );
}
