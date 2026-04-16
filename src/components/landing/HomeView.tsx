import Image from "next/image";
import Link from "next/link";
import { HeroBannerGallery } from "@/components/landing/HeroBannerGallery";
import { vehicles } from "@/lib/vehicles";

export function HomeView() {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full glass-nav shadow-sm">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 sm:px-8 py-4">
          <Link
            href="/"
            className="text-2xl font-black italic tracking-tighter text-zinc-900"
          >
            OTO MOTOR
          </Link>
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="border-b-2 border-red-600 font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-red-600"
            >
              Inventario
            </Link>
            <a
              className="font-['Plus_Jakarta_Sans'] tracking-tight text-zinc-600 transition-colors hover:text-red-600"
              href="#"
            >
              Financiamiento
            </a>
            <a
              className="font-['Plus_Jakarta_Sans'] tracking-tight text-zinc-600 transition-colors hover:text-red-600"
              href="#"
            >
              Nosotros
            </a>
            <a
              className="font-['Plus_Jakarta_Sans'] tracking-tight text-zinc-600 transition-colors hover:text-red-600"
              href="#"
            >
              Contacto
            </a>
          </div>
          <div className="flex items-center space-x-6">
            {/* <button
              type="button"
              className="material-symbols-outlined text-zinc-900"
              aria-label="Buscar"
            >
              search
            </button> */}
            <button
              type="button"
              className="kinetic-gradient rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <header className="relative mx-auto max-w-screen-2xl overflow-hidden px-6 sm:px-8 py-32 md:py-20 pt-4 sm:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="z-10">
              <h1 className="text-on-surface text-5xl sm:text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
                Coches usados en buen estado y al{" "}
                <i className="not-italic text-primary">mejor precio</i>
              </h1>
              <p className="mt-6 max-w-xl text-xl text-secondary">
                Encuentra el coche de tus sueños con la mejor garantía y
                confianza del mercado. Curaduría exclusiva de vehículos de alto
                rendimiento.
              </p>
            </div>
            <HeroBannerGallery items={vehicles} />
          </div>
        </header>

        <section className="bg-surface pb-16 pt-8">
          <div className="mx-auto max-w-screen-2xl px-6 sm:px-8">
            <h2 className="text-on-surface mb-10 text-3xl font-black italic tracking-tighter md:text-4xl">
              Nuestros coches
            </h2>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
              <aside className="w-full shrink-0 rounded-xl bg-surface-container-low p-6 lg:sticky lg:top-24 lg:w-72 lg:max-w-[18rem]">
                <p className="font-label mb-6 text-xs font-bold uppercase tracking-widest text-secondary">
                  Filtros
                </p>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="font-label mb-2 block text-xs font-bold uppercase text-secondary">
                      Marca
                    </label>
                    <select className="font-label w-full rounded-lg border-none bg-surface-container-lowest p-3 text-on-surface focus:ring-2 focus:ring-primary/40">
                      <option>Todas las marcas</option>
                      <option>Porsche</option>
                      <option>BMW</option>
                      <option>Audi</option>
                      <option>Mercedes-Benz</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-label mb-2 block text-xs font-bold uppercase text-secondary">
                      Tipo de carrocería
                    </label>
                    <select className="font-label w-full rounded-lg border-none bg-surface-container-lowest p-3 text-on-surface focus:ring-2 focus:ring-primary/40">
                      <option>Cualquier tipo</option>
                      <option>Sedán</option>
                      <option>SUV</option>
                      <option>Coupé</option>
                      <option>Convertible</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-label mb-2 block text-xs font-bold uppercase text-secondary">
                      Rango de precio
                    </label>
                    <select className="font-label w-full rounded-lg border-none bg-surface-container-lowest p-3 text-on-surface focus:ring-2 focus:ring-primary/40">
                      <option>Cualquier precio</option>
                      <option>€20k - €50k</option>
                      <option>€50k - €100k</option>
                      <option>€100k+</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg bg-on-surface px-4 py-3 font-bold text-white transition-colors hover:bg-zinc-800"
                  >
                    <span className="material-symbols-outlined mr-2 text-[20px]">
                      tune
                    </span>
                    Filtrar Resultados
                  </button>
                </div>
              </aside>

              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {vehicles.map((v) => (
                    <Link
                      key={v.id}
                      href={`/vehiculo/${v.id}`}
                      className="group block overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={v.image}
                          alt={v.imageAlt}
                          width={800}
                          height={450}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {v.badge && (
                          <div
                            className={`absolute left-4 top-4 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                              v.badge.variant === "primary"
                                ? "bg-primary text-white"
                                : "bg-zinc-900 text-white"
                            }`}
                          >
                            {v.badge.text}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="mb-2 flex items-start justify-between">
                          <h3 className="text-xl font-bold text-on-surface">
                            {v.name}
                          </h3>
                          <span className="text-xl font-bold text-primary">
                            {v.price}
                          </span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-md bg-secondary-container px-3 py-1 font-label text-[11px] font-semibold text-on-secondary-container">
                            {v.year}
                          </span>
                          <span className="rounded-md bg-secondary-container px-3 py-1 font-label text-[11px] font-semibold text-on-secondary-container">
                            {v.km}
                          </span>
                          <span className="rounded-md bg-secondary-container px-3 py-1 font-label text-[11px] font-semibold text-on-secondary-container">
                            {v.tag3}
                          </span>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-surface-container pt-6">
                          <div className="flex items-center text-sm text-secondary">
                            <span className="material-symbols-outlined mr-2 text-lg">
                              settings
                            </span>
                            <span className="font-label">{v.engineShort}</span>
                          </div>
                          <div className="flex items-center text-sm text-secondary">
                            <span className="material-symbols-outlined mr-2 text-lg">
                              local_gas_station
                            </span>
                            <span className="font-label">{v.fuel}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-16 flex items-center justify-center space-x-2">
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant transition-colors hover:bg-surface-container"
                    aria-label="Anterior"
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    type="button"
                    className="kinetic-gradient flex h-12 w-12 items-center justify-center rounded-lg font-bold text-white"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant font-bold text-on-surface transition-colors hover:bg-surface-container"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant font-bold text-on-surface transition-colors hover:bg-surface-container"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant transition-colors hover:bg-surface-container"
                    aria-label="Siguiente"
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-dim px-8 py-24">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 text-center md:grid-cols-4 md:text-left">
            <div>
              <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                verified
              </span>
              <h4 className="mb-2 text-lg font-bold">Garantía Extendida</h4>
              <p className="font-label text-sm text-secondary">
                Todos nuestros vehículos incluyen 24 meses de garantía técnica
                completa.
              </p>
            </div>
            <div>
              <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                analytics
              </span>
              <h4 className="mb-2 text-lg font-bold">Certificación 150 Puntos</h4>
              <p className="font-label text-sm text-secondary">
                Inspección rigurosa realizada por expertos para asegurar el
                máximo rendimiento.
              </p>
            </div>
            <div>
              <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                payments
              </span>
              <h4 className="mb-2 text-lg font-bold">Financiación Flexible</h4>
              <p className="font-label text-sm text-secondary">
                Planes adaptados a tu medida con las tasas más competitivas del
                mercado.
              </p>
            </div>
            <div>
              <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                published_with_changes
              </span>
              <h4 className="mb-2 text-lg font-bold">Entrega Inmediata</h4>
              <p className="font-label text-sm text-secondary">
                Gestionamos toda la documentación para que disfrutes tu coche
                hoy mismo.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto w-full bg-zinc-100">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-8 px-12 py-16 md:grid-cols-3">
          <div className="space-y-4">
            <div className="text-xl font-bold text-zinc-900">OTO MOTOR</div>
            <p className="max-w-xs font-['Inter'] text-sm text-zinc-500">
              Tu destino premium para vehículos de alto rendimiento y lujo en
              España. Experiencia y confianza en cada kilómetro.
            </p>
            <div className="flex space-x-4">
              <span className="material-symbols-outlined cursor-pointer text-zinc-400 hover:text-red-600">
                public
              </span>
              <span className="material-symbols-outlined cursor-pointer text-zinc-400 hover:text-red-600">
                share
              </span>
              <span className="material-symbols-outlined cursor-pointer text-zinc-400 hover:text-red-600">
                mail
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h5 className="mb-4 font-bold text-zinc-900">Navegación</h5>
              <ul className="space-y-2 font-['Inter'] text-sm text-zinc-500">
                <li>
                  <a className="transition-colors hover:text-zinc-900" href="#">
                    Inventario
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-zinc-900" href="#">
                    Financiación
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-zinc-900" href="#">
                    Vende tu coche
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-zinc-900" href="#">
                    Servicios
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 font-bold text-zinc-900">Empresa</h5>
              <ul className="space-y-2 font-['Inter'] text-sm text-zinc-500">
                <li>
                  <a className="transition-colors hover:text-zinc-900" href="#">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-zinc-900" href="#">
                    Sedes
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-zinc-900" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-zinc-900" href="#">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="font-bold text-zinc-900">Suscríbete al Newsletter</h5>
            <p className="font-['Inter'] text-sm text-zinc-500">
              Recibe ofertas exclusivas y nuevos ingresos antes que nadie.
            </p>
            <div className="flex">
              <input
                className="w-full rounded-l-lg border-none bg-white p-3 text-sm focus:ring-1 focus:ring-red-600"
                placeholder="Email"
                type="email"
              />
              <button
                type="button"
                className="rounded-r-lg bg-zinc-900 px-4 text-white transition-colors hover:bg-zinc-800"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between border-t border-zinc-200 px-12 py-8 font-['Inter'] text-xs text-zinc-500 md:flex-row">
          <div>© 2026 Oto Motor. Todos los derechos reservados.</div>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a className="hover:text-zinc-900" href="#">
              Privacidad
            </a>
            <a className="hover:text-zinc-900" href="#">
              Términos
            </a>
            <a className="hover:text-zinc-900" href="#">
              Mapa del Sitio
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
