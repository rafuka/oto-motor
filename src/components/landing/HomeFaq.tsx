import type { Faq } from "@/lib/seo";

export const HOMEPAGE_FAQS: Faq[] = [
  {
    question: "¿Dónde está Oto Motor y cuál es vuestro horario?",
    answer:
      "Estamos en la Calle de las Islas Cíes 4, 28970 Humanes de Madrid (Madrid). Abrimos de lunes a viernes de 10:00 a 20:00. Puedes contactarnos por WhatsApp o llamar al +34 600 749 009.",
  },
  {
    question: "¿Los coches incluyen garantía?",
    answer:
      "Sí. Todos nuestros vehículos incluyen una garantía técnica de hasta 24 meses, válida en cualquier taller adherido a nivel nacional. La cobertura cubre componentes mecánicos y eléctricos.",
  },
  {
    question: "¿Ofrecéis financiación?",
    answer:
      "Sí. Trabajamos con varias entidades financieras y ajustamos las cuotas según tu perfil. Resolvemos solicitudes en menos de 24 horas.",
  },
  {
    question: "¿Aceptáis mi coche como parte del pago?",
    answer:
      "Aceptamos vehículos a cambio. Te hacemos una valoración gratuita en 15 minutos en nuestras instalaciones o por WhatsApp con fotos y la documentación del coche.",
  },
  {
    question: "¿Hacéis envíos fuera de Madrid?",
    answer:
      "Sí. Entregamos en toda España. El transporte se contrata con empresas especializadas en vehículos y el coste depende de la distancia. Solicítanos un presupuesto sin compromiso.",
  },
  {
    question: "¿Puedo reservar un coche antes de visitar el concesionario?",
    answer:
      "Sí. Reservamos el vehículo durante 48 horas con una señal simbólica, reembolsable si finalmente no se realiza la compra. Contacta por WhatsApp para gestionarlo.",
  },
];

export function HomeFaq() {
  return (
    <section className="bg-surface px-8 py-24">
      <div className="mx-auto max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Preguntas frecuentes
        </span>
        <h2 className="text-on-surface mt-2 text-3xl font-black italic tracking-tighter md:text-4xl">
          Antes de comprar
        </h2>
        <p className="mt-3 text-base text-secondary">
          Respuestas a las dudas más habituales sobre la compra, garantía y
          financiación de coches de ocasión en Oto Motor.
        </p>

        <div className="mt-10 space-y-3">
          {HOMEPAGE_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-surface-container bg-surface-container-lowest p-5 open:bg-surface-container-low"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <h3 className="text-base font-bold text-on-surface">
                  {faq.question}
                </h3>
                <span
                  className="material-symbols-outlined text-primary transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  add
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
