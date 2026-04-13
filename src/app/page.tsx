import type { Metadata } from "next";
import { HomeView } from "@/components/landing/HomeView";

export const metadata: Metadata = {
  title: "Inventario | Oto Motor",
  description:
    "Coches usados en buen estado. Vanguard Automotive: Plus Jakarta Sans, editorial premium, firma roja #E31837.",
};

export default function Home() {
  return <HomeView />;
}
