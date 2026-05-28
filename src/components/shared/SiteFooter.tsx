import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";
import { CookieSettingsLink } from "./CookieBanner";

type Props = {
  newsletterSource?: string;
};

export function SiteFooter({ newsletterSource = "footer" }: Props) {
  return (
    <footer id="contacto" className="mt-auto w-full bg-zinc-100">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-8 px-12 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <div className="text-xl font-bold text-zinc-900">OTO MOTOR</div>
          <p className="max-w-xs font-['Inter'] text-sm text-zinc-500">
            Tu destino premium para vehículos de alto rendimiento y lujo en
            España. Experiencia y confianza en cada kilómetro.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/otomotorsport/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Oto Motor en Instagram"
              className="text-zinc-400 transition-colors hover:text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden
              >
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.052 1.805.249 2.227.413.56.218.96.477 1.382.896.42.42.679.823.896 1.381.164.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.052 1.17-.249 1.805-.413 2.227a3.72 3.72 0 01-.896 1.382 3.72 3.72 0 01-1.381.896c-.422.164-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.052-1.805-.249-2.227-.413a3.72 3.72 0 01-1.382-.896 3.72 3.72 0 01-.896-1.381c-.164-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.052-1.17.249-1.805.413-2.227.218-.56.477-.96.896-1.382.42-.42.823-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.416 2.212 8.796 2.2 12 2.2zm0-2.2C8.741 0 8.332.014 7.052.072 5.775.13 4.902.333 4.14.63a5.91 5.91 0 00-2.135 1.39A5.91 5.91 0 00.63 4.14C.333 4.902.131 5.775.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.058 1.277.261 2.15.558 2.912.306.789.717 1.459 1.39 2.132.673.673 1.343 1.084 2.132 1.39.763.297 1.636.5 2.913.558C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.058 2.15-.261 2.913-.558a5.91 5.91 0 002.132-1.39 5.91 5.91 0 001.39-2.132c.297-.763.5-1.636.558-2.913.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.058-1.277-.261-2.15-.558-2.913a5.91 5.91 0 00-1.39-2.132A5.91 5.91 0 0019.86.63C19.098.333 18.225.131 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61586883309321"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Oto Motor en Facebook"
              className="text-zinc-400 transition-colors hover:text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692V11.08h3.128V8.412c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.098 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.626h-3.12V24h6.115c.733 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <span className="material-symbols-outlined cursor-pointer text-zinc-400 hover:text-red-600">
              mail
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <h5 className="font-bold text-zinc-900">Contacto</h5>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="material-symbols-outlined detail-icons scale-75 text-primary">
                location_on
              </span>
              C. de las Islas Cíes, 4, 28970 Humanes de Madrid, Madrid
            </div>
            <a
              href="tel:+34600749009"
              className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-red-600"
            >
              <span className="material-symbols-outlined detail-icons scale-75 text-primary">
                call
              </span>
              +34 600 749 009
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="font-bold text-zinc-900">Suscríbete al Newsletter</h5>
          <p className="font-['Inter'] text-sm text-zinc-500">
            Recibe ofertas exclusivas y nuevos ingresos antes que nadie.
          </p>
          <NewsletterForm source={newsletterSource} />
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between border-t border-zinc-200 px-12 py-8 font-['Inter'] text-xs text-zinc-500 md:flex-row">
        <div>© 2026 Oto Motor. Todos los derechos reservados.</div>
        <div className="mt-4 flex space-x-6 md:mt-0">
          <Link href="/legal/privacidad" className="hover:text-zinc-900">
            Privacidad
          </Link>
          <Link href="/legal/terminos" className="hover:text-zinc-900">
            Términos
          </Link>
          <CookieSettingsLink className="hover:text-zinc-900">
            Cookies
          </CookieSettingsLink>
        </div>
      </div>
    </footer>
  );
}
