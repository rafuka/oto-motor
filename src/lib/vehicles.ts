import { supabase } from "./supabase";

export type Vehicle = {
  id: string;
  name: string;
  price: string;
  badge?: { text: string; variant: "primary" | "dark" } | null;
  year: string;
  km: number;
  tag3: string;
  engineShort: string;
  fuel: string;
  image: string;
  imageAlt: string;
  detail: {
    heroBadge: string;
    heroSubtitle: string;
    priceLine: string;
    images: string[];
    story: [string, string];
    amenities: string[];
    specs: {
      motor: string;
      motorDesc: string;
      power: string;
      powerDesc: string;
      accel: string;
      accelDesc: string;
      trans: string;
      transDesc: string;
    };
    narrativeImage: string;
    narrativeImageAlt: string;
    financing?: string | null;
  };
};

type VehicleRow = {
  id: string;
  name: string;
  price: string;
  badge: Vehicle["badge"];
  year: string;
  km: number;
  tag3: string;
  engine_short: string;
  fuel: string;
  image: string;
  image_alt: string;
  detail: Vehicle["detail"];
  listed: boolean;
};

export type AdminVehicle = Vehicle & { listed: boolean };

function rowToVehicle(row: VehicleRow): AdminVehicle {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    badge: row.badge ?? undefined,
    year: row.year,
    km: row.km,
    tag3: row.tag3,
    engineShort: row.engine_short,
    fuel: row.fuel,
    image: row.image,
    imageAlt: row.image_alt,
    detail: row.detail,
    listed: row.listed,
  };
}

const VEHICLE_COLUMNS =
  "id,name,price,badge,year,km,tag3,engine_short,fuel,image,image_alt,detail,listed";

export async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select(VEHICLE_COLUMNS)
    .eq("listed", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as VehicleRow[]).map(rowToVehicle);
}

export async function getVehiclesForAdmin(): Promise<AdminVehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select(VEHICLE_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as VehicleRow[]).map(rowToVehicle);
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const { data, error } = await supabase
    .from("vehicles")
    .select(VEHICLE_COLUMNS)
    .eq("id", id)
    .eq("listed", true)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToVehicle(data as VehicleRow) : null;
}

export function formatKm(km: number): string {
  return km.toLocaleString("es-ES") + " km";
}

export function formatFinancing(financing?: string | null): string | null {
  const amount = financing?.trim();
  if (!amount) return null;
  return `desde ${amount}/mes`;
}

const MULTI_WORD_BRANDS = ["Alfa Romeo"];

export function getBrand(name: string): string {
  for (const b of MULTI_WORD_BRANDS) {
    if (name.startsWith(b)) return b;
  }
  return name.split(" ")[0];
}

export const KM_RANGES = [
  { value: "0-30000", label: "Hasta 30.000 km" },
  { value: "30000-80000", label: "30.000 – 80.000 km" },
  { value: "80000-120000", label: "80.000 – 120.000 km" },
  { value: "120000+", label: "Más de 120.000 km" },
] as const;

export const PRICE_RANGES = [
  { value: "0-15000", label: "Hasta 15.000 €" },
  { value: "15000-25000", label: "15.000 – 25.000 €" },
  { value: "25000-40000", label: "25.000 – 40.000 €" },
  { value: "40000-70000", label: "40.000 – 70.000 €" },
  { value: "70000+", label: "Más de 70.000 €" },
] as const;

export function parsePrice(price: string): number | null {
  const digits = price.replace(/[^\d]/g, "");
  if (!digits) return null;
  return parseInt(digits, 10);
}
