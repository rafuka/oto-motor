import Image from "next/image";
import Link from "next/link";

const NAV_LINKS: { label: string; href: string; key: string }[] = [
  // { label: "Inventario", href: "/", key: "inventario" },
  // { label: "Financiamiento", href: "#", key: "financiamiento" },
  // { label: "Nosotros", href: "#", key: "nosotros" },
  // { label: "Contacto", href: "#", key: "contacto" },
];

type Props = {
  activePage?: string;
};

export function SiteNav({ activePage }: Props) {
  return (
    <nav className="fixed top-0 z-50 w-full glass-nav shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 sm:px-8 py-4">
        <Link href="/">
          <Image src="/oto_motor_logo.jpg" alt="OTO MOTOR" width={48} height={48} />
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {NAV_LINKS.map(({ label, href, key }) => {
            const isActive = activePage === key;
            return href === "#" ? (
              <a
                key={key}
                href={href}
                className={`font-['Plus_Jakarta_Sans'] tracking-tight transition-colors hover:text-red-600 ${
                  isActive
                    ? "border-b-2 border-red-600 font-bold text-red-600"
                    : "text-zinc-600"
                }`}
              >
                {label}
              </a>
            ) : (
              <Link
                key={key}
                href={href}
                className={`font-['Plus_Jakarta_Sans'] tracking-tight transition-colors hover:text-red-600 ${
                  isActive
                    ? "border-b-2 border-red-600 font-bold text-red-600"
                    : "text-zinc-600"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center">
          <button
            type="button"
            className="kinetic-gradient rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
          >
            Agendar Cita
          </button>
        </div>
      </div>
    </nav>
  );
}
