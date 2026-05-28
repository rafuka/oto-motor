import type { ReactNode } from "react";
import { SiteNav } from "@/components/shared/SiteNav";
import { SiteFooter } from "@/components/shared/SiteFooter";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <article className="prose-legal mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          {children}
        </article>
      </main>
      <SiteFooter newsletterSource="legal" />
    </>
  );
}
