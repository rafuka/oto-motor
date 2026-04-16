import type { Metadata } from "next";
import { HomeView } from "@/components/landing/HomeView";

export const metadata: Metadata = {
  title: "Inventario | Oto Motor",
  description:
    "Los mejores coches usados en buen estado.",
};

export default function Home() {
  return <HomeView />;
}
