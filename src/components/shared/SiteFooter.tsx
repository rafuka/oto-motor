import { NewsletterForm } from "./NewsletterForm";

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
            <span className="material-symbols-outlined cursor-pointer text-zinc-400 hover:text-red-600">
              public
            </span>
            <span className="material-symbols-outlined cursor-pointer text-zinc-400 hover:text-red-600">
              share
            </span>
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
          <a className="hover:text-zinc-900" href="#">
            Privacidad
          </a>
          <a className="hover:text-zinc-900" href="#">
            Términos
          </a>
        </div>
      </div>
    </footer>
  );
}
