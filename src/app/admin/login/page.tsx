import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="text-xl font-black tracking-tight text-zinc-900">
            OTO <span className="text-red-600">MOTOR</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Panel de administración
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Inicia sesión para gestionar el inventario.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
