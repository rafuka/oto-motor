import Image from "next/image";
import Link from "next/link";
import { VehicleHeroGallery } from "@/components/vehicle/VehicleHeroGallery";
import type { Vehicle } from "@/lib/vehicles";

type Props = { vehicle: Vehicle };

export function VehicleDetailView({ vehicle: v }: Props) {
  const d = v.detail;

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white/70 shadow-sm backdrop-blur-xl dark:bg-zinc-950/70">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-4">
          <Link
            href="/"
            className="font-['Plus_Jakarta_Sans'] text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-white"
          >
            OTO MOTOR
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="font-['Plus_Jakarta_Sans'] tracking-tight text-zinc-600 transition-colors hover:text-red-600 dark:text-zinc-400"
            >
              Inventario
            </Link>
            <a
              className="font-['Plus_Jakarta_Sans'] tracking-tight text-zinc-600 transition-colors hover:text-red-600 dark:text-zinc-400"
              href="#"
            >
              Financiamiento
            </a>
            <a
              className="font-['Plus_Jakarta_Sans'] tracking-tight text-zinc-600 transition-colors hover:text-red-600 dark:text-zinc-400"
              href="#"
            >
              Nosotros
            </a>
            <a
              className="font-['Plus_Jakarta_Sans'] tracking-tight text-zinc-600 transition-colors hover:text-red-600 dark:text-zinc-400"
              href="#"
            >
              Contacto
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-zinc-600 transition-all duration-300 hover:opacity-80 active:scale-95"
              aria-label="Buscar"
            >
              <span className="material-symbols-outlined detail-icons">
                search
              </span>
            </button>
            <button
              type="button"
              className="signature-gradient rounded-xl px-6 py-2 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:opacity-80 active:scale-95"
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </nav>

      <main className="selection:bg-primary-container selection:text-white pb-16 pt-24 font-body text-on-surface">
        <section className="mx-auto mb-12 max-w-screen-2xl px-8">
          <VehicleHeroGallery vehicle={v} />
        </section>

        <section className="mb-20 bg-surface-container-low py-20">
          <div className="mx-auto max-w-screen-2xl px-8">
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

        <section className="mx-auto grid max-w-screen-2xl grid-cols-12 items-center gap-16 px-8">
          <div className="order-2 col-span-12 lg:order-1 lg:col-span-5">
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
          <div className="relative order-1 col-span-12 lg:order-2 lg:col-span-7">
            <div className="absolute -right-12 -top-12 -z-10 h-full w-full rounded-full bg-primary-container/5" />
            <div className="relative overflow-hidden rounded-xl shadow-[0px_40px_80px_rgba(185,0,39,0.15)]">
              <Image
                src={d.narrativeImage}
                alt={d.narrativeImageAlt}
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto w-full bg-zinc-100 dark:bg-zinc-900">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-8 px-12 py-16 md:grid-cols-3">
          <div className="space-y-4">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              OTO MOTOR
            </div>
            <p className="font-['Inter'] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Elevando el estándar de la industria automotriz en México a través
              de la curaduría de los mejores ejemplares del mundo.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="mb-2 font-bold text-zinc-900 dark:text-white">
              Explorar
            </h4>
            <a
              className="font-['Inter'] text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="#"
            >
              Privacidad
            </a>
            <a
              className="font-['Inter'] text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="#"
            >
              Términos
            </a>
            <a
              className="font-['Inter'] text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="#"
            >
              Mapa del Sitio
            </a>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-zinc-900 dark:text-white">Contacto</h4>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="material-symbols-outlined detail-icons scale-75 text-primary">
                location_on
              </span>
              Av. de la Industria 450, Ciudad de México
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="material-symbols-outlined detail-icons scale-75 text-primary">
                call
              </span>
              +52 (55) 1234 5678
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-200 px-12 py-6 dark:border-zinc-800">
          <p className="text-center font-['Inter'] text-sm text-zinc-500 dark:text-zinc-400">
            © 2026 Oto Motor. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
