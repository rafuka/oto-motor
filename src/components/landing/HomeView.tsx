import { HeroBannerGallery } from "@/components/landing/HeroBannerGallery";
import { GridVehicle } from "@/components/landing/GridVehicle";
import { VehiclePagination } from "@/components/landing/VehiclePagination";
import { getVehicles, getBrand, parsePrice } from "@/lib/vehicles";
import { VehicleFilters } from "@/components/landing/VehicleFilters";
import { SiteNav } from "@/components/shared/SiteNav";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { HomeFaq, HOMEPAGE_FAQS } from "@/components/landing/HomeFaq";
import { SortBy } from "@/components/landing/SortBy";
import { faqJsonLd, itemListJsonLd, jsonLdScript } from "@/lib/seo";

const PAGE_SIZE = 12;

type FilterState = {
  marca: string;
  km: string;
  yearFrom: string;
  yearTo: string;
  fuel: string;
  precio: string;
  sort: string;
};
type Props = { page: number; filters: FilterState };

function parseRange(range: string): [number, number] {
  if (range.endsWith("+")) return [parseInt(range) + 1, Infinity];
  const [lo, hi] = range.split("-").map(Number);
  return [lo, hi];
}

export async function HomeView({ page, filters }: Props) {
  const vehicles = await getVehicles();
  const allBrands = [...new Set(vehicles.map((v) => getBrand(v.name)))].sort();
  const allFuels = [...new Set(vehicles.map((v) => v.fuel))].sort();
  const allYears = [...new Set(vehicles.map((v) => parseInt(v.year)))].sort((a, b) => a - b);

  let filtered = vehicles.filter((v) => {
    if (filters.marca && getBrand(v.name) !== filters.marca) return false;
    if (filters.km) {
      const [lo, hi] = parseRange(filters.km);
      if (v.km < lo || v.km > hi) return false;
    }
    if (filters.yearFrom && parseInt(v.year) < parseInt(filters.yearFrom)) return false;
    if (filters.yearTo && parseInt(v.year) > parseInt(filters.yearTo)) return false;
    if (filters.fuel && v.fuel !== filters.fuel) return false;
    if (filters.precio) {
      const price = parsePrice(v.price);
      if (price === null) return false;
      const [lo, hi] = parseRange(filters.precio);
      if (price < lo || price > hi) return false;
    }
    return true;
  });

  // Compare two numeric values; unparseable / NaN entries are pushed to the
  // bottom regardless of direction so a missing price/year never floats above
  // a real one.
  const compareNumeric = (
    a: number | null,
    b: number | null,
    dir: 1 | -1,
  ) => {
    if (a === null && b === null) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    return (a - b) * dir;
  };
  const yearOf = (s: string) => {
    const n = parseInt(s, 10);
    return Number.isFinite(n) ? n : null;
  };

  switch (filters.sort) {
    case "price-asc":
    case "price-desc": {
      const dir = filters.sort === "price-asc" ? 1 : -1;
      filtered = [...filtered].sort((a, b) =>
        compareNumeric(parsePrice(a.price), parsePrice(b.price), dir),
      );
      break;
    }
    case "year-desc":
    case "year-asc": {
      const dir = filters.sort === "year-asc" ? 1 : -1;
      filtered = [...filtered].sort((a, b) =>
        compareNumeric(yearOf(a.year), yearOf(b.year), dir),
      );
      break;
    }
    case "km-asc":
    case "km-desc": {
      const dir = filters.sort === "km-asc" ? 1 : -1;
      filtered = [...filtered].sort((a, b) =>
        compareNumeric(a.km, b.km, dir),
      );
      break;
    }
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageVehicles = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const stockCount = vehicles.length;
  const brandCount = allBrands.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          itemListJsonLd(vehicles),
          faqJsonLd(HOMEPAGE_FAQS),
        ])}
      />
      <SiteNav activePage="inventario" />

      <main className="pt-24">
        <header className="relative mx-auto max-w-screen-2xl overflow-hidden px-6 sm:px-8 py-32 md:py-20 pt-4 sm:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="z-10">
              <h1 className="text-on-surface text-5xl sm:text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
                Coches de ocasión en Madrid{" "}
                <i className="not-italic text-primary">garantizados al mejor precio</i>
              </h1>
              <p className="mt-6 max-w-xl text-xl text-secondary">
                Vehículos premium de más de {brandCount} marcas
                disponibles. Garantía técnica completa y
                financiación a medida. Entrega a nivel nacional.
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
                <div>
                  <dt className="font-label text-xs uppercase tracking-widest text-secondary">
                    En stock
                  </dt>
                  <dd className="text-2xl font-black text-on-surface">
                    {stockCount}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-xs uppercase tracking-widest text-secondary">
                    Marcas
                  </dt>
                  <dd className="text-2xl font-black text-on-surface">
                    {brandCount}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-xs uppercase tracking-widest text-secondary">
                    Garantía
                  </dt>
                  <dd className="text-2xl font-black text-on-surface">
                    hasta 24 meses
                  </dd>
                </div>
              </dl>
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
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-label text-sm text-on-surface-variant">
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "vehículo" : "vehículos"}
                  </p>
                  <SortBy />
                </div>
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
                Todos nuestros vehículos incluyen garantía técnica completa.
              </p>
            </div>
            <div>
              <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                analytics
              </span>
              <h4 className="mb-2 text-lg font-bold">Certificación 150 Puntos</h4>
              <p className="font-label text-sm text-secondary">
                Inspección rigurosa realizada por expertos para asegurar el máximo rendimiento.
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

        <HomeFaq />
      </main>

      <SiteFooter newsletterSource="home" />
    </>
  );
}
