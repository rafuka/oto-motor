import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { getVehiclesForAdmin } from "@/lib/vehicles";
import { logoutAction } from "./actions";
import { AddVehicleSection } from "./AddVehicleSection";
import { AdminInventory } from "./AdminInventory";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const vehicles = await getVehiclesForAdmin();
  const listedCount = vehicles.filter((v) => v.listed).length;

  return (
    <main className="mx-auto max-w-screen-2xl px-6 py-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-black tracking-tight text-zinc-900">
            OTO <span className="text-red-600">MOTOR</span>
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Panel de administración
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            <strong>{session.username}</strong> <br/>
            {listedCount} vehículos listados de {vehicles.length} en el inventario.
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Cerrar sesión
          </button>
        </form>
      </header>

      <section className="mb-10">
        <AddVehicleSection />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Inventario</h2>
        <p className="mb-4 text-xs text-zinc-500">
          Pulsa una fila para editar el vehículo. El switch{" "}
          <em>Listado</em> oculta el coche de la web sin borrarlo.
        </p>
        <AdminInventory vehicles={vehicles} />
      </section>
    </main>
  );
}
