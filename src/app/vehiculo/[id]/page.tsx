import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleDetailView } from "@/components/vehicle/VehicleDetailView";
import {
  formatKm,
  getBrand,
  getVehicle,
  getVehicles,
} from "@/lib/vehicles";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const v = await getVehicle(id);
  if (!v) return { title: "Vehículo" };

  const title = `${v.name} ${v.year} — ${v.price}`;
  const description =
    `${v.name} ${v.year} con ${formatKm(v.km)}, motor ${v.engineShort} (${v.fuel}). ` +
    `${v.price}. Garantía y financiación en Oto Motor (Madrid).`;
  const canonical = `/vehiculo/${v.id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${v.name} ${v.year} — ${v.price} | Oto Motor`,
      description,
      url: canonical,
      type: "website",
      images: v.detail.images.slice(0, 4).map((url) => ({ url })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${v.name} — ${v.price}`,
      description,
      images: v.detail.images.slice(0, 1),
    },
    other: {
      "product:brand": getBrand(v.name),
      "product:price:amount": v.price.replace(/[^\d]/g, ""),
      "product:price:currency": "EUR",
    },
  };
}

export default async function VehiclePage({ params }: Props) {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) notFound();

  // Fetch related vehicles by brand for in-page cross-links + ItemList.
  const all = await getVehicles();
  const brand = getBrand(vehicle.name);
  const related = all
    .filter((v) => v.id !== vehicle.id && getBrand(v.name) === brand)
    .slice(0, 6);

  return <VehicleDetailView vehicle={vehicle} related={related} />;
}
