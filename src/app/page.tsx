import type { Metadata } from "next";
import { HomeView } from "@/components/landing/HomeView";
import { searchParamsCache } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Inventario — Coches de Ocasión en Madrid",
  description:
    "Explora más de 60 coches de ocasión garantizados en Humanes de Madrid. Audi, BMW, Mercedes, Porsche, Cupra y más, con financiación a medida.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Inventario — Coches de Ocasión en Madrid | Oto Motor",
    description:
      "Más de 60 coches de ocasión garantizados en Madrid. Audi, BMW, Mercedes, Porsche y más.",
    url: "/",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const { page, marca, km, yearFrom, yearTo, fuel, precio } =
    await searchParamsCache.parse(searchParams);

  return (
    <HomeView
      page={page}
      filters={{ marca, km, yearFrom, yearTo, fuel, precio }}
    />
  );
}
