import type { ReactNode } from "react";

export const metadata = {
  title: "Admin | Oto Motor",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">{children}</div>
  );
}
