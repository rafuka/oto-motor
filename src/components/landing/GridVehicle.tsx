import Image from "next/image";
import Link from "next/link";
import { formatKm } from "@/lib/vehicles";
import type { Vehicle } from "@/lib/vehicles";

type Props = {
  vehicle: Vehicle;
};

export function GridVehicle({ vehicle: v }: Props) {
  return (
    <Link
      href={`/vehiculo/${v.id}`}
      className="group block overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={v.image}
          alt={v.imageAlt}
          width={800}
          height={450}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {v.badge && (
          <div
            className={`absolute left-4 top-4 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
              v.badge.variant === "primary"
                ? "bg-primary text-white"
                : "bg-zinc-900 text-white"
            }`}
          >
            {v.badge.text}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-xl font-bold text-on-surface">{v.name}</h3>
          <span className="text-xl font-bold text-primary">{v.price}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md bg-secondary-container px-3 py-1 font-label text-[11px] font-semibold text-on-secondary-container">
            {v.year}
          </span>
          <span className="rounded-md bg-secondary-container px-3 py-1 font-label text-[11px] font-semibold text-on-secondary-container">
            {formatKm(v.km)}
          </span>
          <span className="rounded-md bg-secondary-container px-3 py-1 font-label text-[11px] font-semibold text-on-secondary-container">
            {v.tag3}
          </span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-surface-container pt-6">
          <div className="flex items-center text-sm text-secondary">
            <span className="material-symbols-outlined mr-2 text-lg">
              settings
            </span>
            <span className="font-label">{v.engineShort}</span>
          </div>
          <div className="flex items-center text-sm text-secondary">
            <span className="material-symbols-outlined mr-2 text-lg">
              local_gas_station
            </span>
            <span className="font-label">{v.fuel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
