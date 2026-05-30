import type { Metadata } from "next";
import { HomeView } from "@/components/landing/HomeView";
import { searchParamsCache } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Coches de Ocasión en Madrid",
  description:
    "Explora nuestros coches de ocasión garantizados y con financiación a medida. Envios a nivel nacional desde Madrid. Audi, BMW, Mercedes, Porsche, Cupra y más.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Coches de Ocasión en Madrid | Oto Motor",
    description:
      "Coches de ocasión garantizados en Madrid. Audi, BMW, Mercedes, Porsche y más.",
    url: "/",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const { page, marca, km, yearFrom, yearTo, fuel, precio, sort } =
    await searchParamsCache.parse(searchParams);

  return (
    <HomeView
      page={page}
      filters={{ marca, km, yearFrom, yearTo, fuel, precio, sort }}
    />
  );
}
