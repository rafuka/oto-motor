import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleDetailView } from "@/components/vehicle/VehicleDetailView";
import { getVehicle, vehicles } from "@/lib/vehicles";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const v = getVehicle(id);
  if (!v) return { title: "Vehículo" };
  return {
    title: `${v.name} | Oto Motor`,
    description: `Detalles del vehículo ${v.name} — Vanguard Automotive / Oto Motor.`,
  };
}

export default async function VehiclePage({ params }: Props) {
  const { id } = await params;
  const vehicle = getVehicle(id);
  if (!vehicle) notFound();
  return <VehicleDetailView vehicle={vehicle} />;
}
