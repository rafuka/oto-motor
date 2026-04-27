import { HeroBannerGallery } from "@/components/landing/HeroBannerGallery";
import { GridVehicle } from "@/components/landing/GridVehicle";
import { VehiclePagination } from "@/components/landing/VehiclePagination";
import { vehicles, getBrand } from "@/lib/vehicles";
import { VehicleFilters } from "@/components/landing/VehicleFilters";
import { SiteNav } from "@/components/shared/SiteNav";

const PAGE_SIZE = 12;

type FilterState = { marca: string; km: string; yearFrom: string; yearTo: string; fuel: string };
type Props = { page: number; filters: FilterState };

function parseKmRange(range: string): [number, number] {
  if (range === "120000+") return [120001, Infinity];
  const [lo, hi] = range.split("-").map(Number);
  return [lo, hi];
}

export function HomeView({ page, filters }: Props) {
  const allBrands = [...new Set(vehicles.map((v) => getBrand(v.name)))].sort();
  const allFuels = [...new Set(vehicles.map((v) => v.fuel))].sort();
  const allYears = [...new Set(vehicles.map((v) => parseInt(v.year)))].sort((a, b) => a - b);

  const filtered = vehicles.filter((v) => {
    if (filters.marca && getBrand(v.name) !== filters.marca) return false;
    if (filters.km) {
      const [lo, hi] = parseKmRange(filters.km);
      if (v.km < lo || v.km > hi) return false;
    }
    if (filters.yearFrom && parseInt(v.year) < parseInt(filters.yearFrom)) return false;
    if (filters.yearTo && parseInt(v.year) > parseInt(filters.yearTo)) return false;
    if (filters.fuel && v.fuel !== filters.fuel) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageVehicles = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <>
      <SiteNav activePage="inventario" />

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
              <VehicleFilters
                brands={allBrands}
                fuels={allFuels}
                years={allYears}
              />

              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {pageVehicles.map((v) => (
                    <GridVehicle key={v.id} vehicle={v} />
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="py-20 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined mb-4 block text-5xl">search_off</span>
                    <p className="text-lg font-semibold">Sin resultados</p>
                    <p className="mt-1 text-sm">Prueba ajustando los filtros.</p>
                  </div>
                )}

                <VehiclePagination totalPages={totalPages} currentPage={safePage} />
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
