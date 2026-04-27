import type { Metadata } from "next";
import { HomeView } from "@/components/landing/HomeView";
import { searchParamsCache } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Inventario | Oto Motor",
  description: "Los mejores coches usados en buen estado.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const { page, marca, km, yearFrom, yearTo, fuel } =
    await searchParamsCache.parse(searchParams);

  return (
    <HomeView
      page={page}
      filters={{ marca, km, yearFrom, yearTo, fuel }}
    />
  );
}
