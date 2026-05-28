import type { Metadata } from "next";
import Link from "next/link";
import {
  BUSINESS_ADDRESS,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones de uso",
  description: `Términos y condiciones de uso del sitio web de ${SITE_NAME}.`,
  alternates: { canonical: "/legal/terminos" },
};

const LAST_UPDATED = "28 de mayo de 2026";

// TODO: confirmar con gestor / abogado:
//   - Razón social y forma jurídica
//   - NIF / CIF
//   - Datos de inscripción registral si procede
//   - Email oficial
const LEGAL_NAME = "Oto Motor [PENDIENTE de razón social]";
const LEGAL_NIF = "[PENDIENTE de NIF/CIF]";
const CONTACT_EMAIL = "info@otomotor.net";

const BUSINESS_FULL_ADDRESS =
  `${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.postalCode} ` +
  `${BUSINESS_ADDRESS.addressLocality} (${BUSINESS_ADDRESS.addressRegion}), España`;

export default function TerminosPage() {
  return (
    <>
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Legal
        </p>
        <h1 className="mt-2 text-4xl font-black italic tracking-tighter text-on-surface sm:text-5xl">
          Términos y condiciones de uso
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Última actualización: {LAST_UPDATED}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          1. Información general (LSSI-CE)
        </h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de
          la sociedad de la información y de comercio electrónico
          (LSSI-CE), se informa de los datos identificativos del titular del
          sitio web {SITE_URL}:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Titular:</strong> {LEGAL_NAME}
          </li>
          <li>
            <strong>NIF:</strong> {LEGAL_NIF}
          </li>
          <li>
            <strong>Domicilio:</strong> {BUSINESS_FULL_ADDRESS}
          </li>
          <li>
            <strong>Teléfono:</strong> {SITE_PHONE_DISPLAY}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a
              className="text-primary underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          2. Objeto
        </h2>
        <p>
          Este sitio web tiene por objeto presentar el inventario de
          vehículos de ocasión que comercializa {SITE_NAME}, facilitar la
          comunicación con el equipo comercial y permitir la suscripción
          voluntaria a un boletín de novedades. El acceso y uso del sitio
          implica la aceptación de los presentes términos.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          3. Condiciones de uso
        </h2>
        <p>
          El usuario se compromete a hacer un uso lícito y diligente del
          sitio, absteniéndose de:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Realizar actividades que dañen, sobrecarguen o impidan el normal
            funcionamiento del sitio.
          </li>
          <li>
            Introducir o difundir contenidos ilícitos, ofensivos o que
            vulneren derechos de terceros.
          </li>
          <li>
            Acceder a áreas restringidas (como el panel de administración)
            sin autorización.
          </li>
          <li>
            Recopilar datos del sitio mediante medios automatizados
            (scraping) sin consentimiento expreso.
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          4. Información sobre los vehículos
        </h2>
        <p>
          La información publicada sobre cada vehículo (precio, kilometraje,
          año, equipamiento, fotografías y descripción) es meramente
          informativa y no constituye oferta vinculante. Los precios
          pueden estar sujetos a campañas, condiciones de financiación o
          impuestos aplicables en el momento de la compra. El estado real
          de cada unidad podrá comprobarse en nuestras instalaciones antes
          de formalizar cualquier compra.
        </p>
        <p>
          {SITE_NAME} se reserva el derecho a modificar precios, retirar o
          actualizar la información del inventario sin previo aviso. La
          relación contractual entre el comprador y {SITE_NAME} se rige por
          el contrato de compra-venta y la documentación específica que se
          firme en la operación, no por el contenido del sitio web.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          5. Propiedad intelectual e industrial
        </h2>
        <p>
          Todos los contenidos del sitio (textos, fotografías, gráficos,
          logotipos, código fuente y diseño) son propiedad de{" "}
          {LEGAL_NAME} o de terceros que han autorizado su uso. Queda
          prohibida su reproducción, distribución o transformación sin la
          autorización previa y por escrito del titular, salvo los usos
          permitidos por la legislación vigente.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          6. Enlaces a sitios de terceros
        </h2>
        <p>
          El sitio puede contener enlaces a sitios externos (WhatsApp,
          redes sociales, mapas, entidades financieras, etc.). {SITE_NAME} no
          se responsabiliza de los contenidos ni de las políticas de
          privacidad de dichos sitios; se recomienda al usuario revisar sus
          condiciones antes de utilizarlos.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          7. Limitación de responsabilidad
        </h2>
        <p>
          {SITE_NAME} no será responsable de los daños o perjuicios que
          puedan derivarse de errores u omisiones en los contenidos del
          sitio, de la falta de disponibilidad puntual del servicio o de
          la transmisión de virus o programas maliciosos por terceros,
          siempre que haya adoptado las medidas técnicas razonables para
          evitarlo.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          8. Protección de datos
        </h2>
        <p>
          El tratamiento de datos personales recogidos a través del sitio
          se rige por nuestra{" "}
          <Link
            href="/legal/privacidad"
            className="text-primary underline"
          >
            Política de privacidad
          </Link>
          , que forma parte integrante de estos términos.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          9. Legislación aplicable y jurisdicción
        </h2>
        <p>
          Estos términos se rigen por la legislación española. Para la
          resolución de cualquier controversia, las partes se someten a los
          juzgados y tribunales del domicilio del consumidor o, en defecto
          de tal condición, a los del domicilio del titular del sitio.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          10. Modificaciones
        </h2>
        <p>
          {SITE_NAME} podrá modificar los presentes términos en cualquier
          momento. Las nuevas versiones serán aplicables desde el momento
          de su publicación en esta página.
        </p>
      </section>
    </>
  );
}
