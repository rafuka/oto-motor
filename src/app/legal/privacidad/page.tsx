import type { Metadata } from "next";
import { BUSINESS_ADDRESS, SITE_NAME, SITE_PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad de ${SITE_NAME} conforme al RGPD y la LOPDGDD.`,
  alternates: { canonical: "/legal/privacidad" },
};

const LAST_UPDATED = "28 de mayo de 2026";

// TODO: confirm these values with your gestor / abogado antes de publicar:
//   - Razón social y forma jurídica (S.L., autónomo, etc.)
//   - NIF / CIF
//   - Email de contacto oficial para asuntos de datos
//   - Inscripción registral si aplica
const LEGAL_NAME = "Oto Motor [PENDIENTE de razón social]";
const LEGAL_NIF = "[PENDIENTE de NIF/CIF]";
const CONTACT_EMAIL = "info@otomotor.net";

const BUSINESS_FULL_ADDRESS =
  `${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.postalCode} ` +
  `${BUSINESS_ADDRESS.addressLocality} (${BUSINESS_ADDRESS.addressRegion}), España`;

export default function PrivacidadPage() {
  return (
    <>
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Legal
        </p>
        <h1 className="mt-2 text-4xl font-black italic tracking-tighter text-on-surface sm:text-5xl">
          Política de privacidad
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Última actualización: {LAST_UPDATED}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          1. Responsable del tratamiento
        </h2>
        <p>
          El responsable del tratamiento de tus datos personales es{" "}
          <strong>{LEGAL_NAME}</strong>, con NIF {LEGAL_NIF} y domicilio en{" "}
          {BUSINESS_FULL_ADDRESS}. Puedes contactarnos por correo electrónico
          en{" "}
          <a
            className="text-primary underline"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>{" "}
          o por teléfono en {SITE_PHONE_DISPLAY}.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          2. Finalidades del tratamiento
        </h2>
        <p>
          Tratamos los datos personales que nos facilitas para las siguientes
          finalidades:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Atención de consultas y solicitudes de información</strong>{" "}
            sobre los vehículos del inventario, recibidas por WhatsApp,
            teléfono, email o formularios de la web.
          </li>
          <li>
            <strong>Gestión de la operación de compra-venta</strong> de un
            vehículo, financiación, contratación de servicios asociados
            (garantías, mantenimiento, transporte) y trámites administrativos
            relacionados.
          </li>
          <li>
            <strong>Envío de comunicaciones comerciales</strong> (newsletter)
            sobre novedades del inventario, ofertas y eventos, únicamente si
            te has suscrito de forma expresa.
          </li>
          <li>
            <strong>Cumplimiento de obligaciones legales</strong> en materia
            fiscal, contable, de prevención del blanqueo de capitales y
            consumidores.
          </li>
          <li>
            <strong>Medición y mejora del sitio web</strong> mediante
            tecnologías analíticas y de marketing, sujetas a tu consentimiento
            previo (ver la sección de cookies más abajo).
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          3. Legitimación
        </h2>
        <p>
          La base jurídica del tratamiento depende de la finalidad concreta:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Consentimiento</strong> (art. 6.1.a RGPD) para el
            newsletter y las cookies no estrictamente necesarias.
          </li>
          <li>
            <strong>Ejecución de un contrato</strong> o medidas precontractuales
            (art. 6.1.b RGPD) para la atención de tu solicitud y la
            tramitación de la compra-venta.
          </li>
          <li>
            <strong>Cumplimiento de obligaciones legales</strong>{" "}
            (art. 6.1.c RGPD) para conservar los justificantes y la
            documentación fiscal y administrativa.
          </li>
          <li>
            <strong>Interés legítimo</strong> (art. 6.1.f RGPD) para mantener
            la seguridad del sitio y prevenir el fraude.
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          4. Destinatarios y encargados del tratamiento
        </h2>
        <p>
          No cedemos tus datos a terceros salvo obligación legal. Algunos
          servicios técnicos esenciales para el funcionamiento del sitio
          actúan como encargados del tratamiento bajo contrato:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Vercel Inc.</strong> (alojamiento del sitio), con
            servidores en la Unión Europea.
          </li>
          <li>
            <strong>Supabase Inc.</strong> (base de datos y almacenamiento de
            imágenes del inventario), con servidores en la Unión Europea.
          </li>
          <li>
            <strong>Meta Platforms Ireland Ltd.</strong> (Meta Pixel para la
            medición de campañas), únicamente si has aceptado las cookies de
            marketing.
          </li>
          <li>
            <strong>Entidades financieras y aseguradoras colaboradoras</strong>{" "}
            cuando solicites un estudio de financiación o de garantía
            asociada al vehículo.
          </li>
        </ul>
        <p>
          Cuando alguno de estos proveedores procese datos fuera del Espacio
          Económico Europeo, lo hará bajo las garantías legales aplicables
          (cláusulas contractuales tipo aprobadas por la Comisión Europea).
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          5. Plazo de conservación
        </h2>
        <p>
          Conservamos tus datos durante el tiempo necesario para cumplir la
          finalidad para la que fueron recogidos y, posteriormente, durante
          los plazos legales aplicables (en particular, los exigidos por la
          normativa fiscal, mercantil y de consumidores). Los datos del
          newsletter se conservan hasta que solicitas la baja.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          6. Tus derechos
        </h2>
        <p>
          Puedes ejercer en cualquier momento los siguientes derechos:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Acceso a tus datos personales.</li>
          <li>Rectificación de datos inexactos.</li>
          <li>Supresión cuando ya no sean necesarios.</li>
          <li>Limitación u oposición al tratamiento.</li>
          <li>Portabilidad de los datos que nos hayas facilitado.</li>
          <li>
            Retirada del consentimiento prestado, sin que ello afecte a la
            licitud del tratamiento previo.
          </li>
        </ul>
        <p>
          Para ejercerlos, escríbenos a{" "}
          <a
            className="text-primary underline"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>{" "}
          adjuntando copia de tu DNI o documento equivalente. Si consideras
          que el tratamiento no se ajusta a la normativa, también puedes
          presentar una reclamación ante la{" "}
          <a
            className="text-primary underline"
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agencia Española de Protección de Datos
          </a>
          .
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          7. Cookies
        </h2>
        <p>
          Usamos cookies necesarias para el funcionamiento de la web y, con
          tu consentimiento, cookies de marketing para medir nuestras
          campañas en redes sociales (Meta Pixel). Puedes consultar el
          detalle y modificar tu elección desde el enlace{" "}
          <em>Cookies</em> del pie de página.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-on-surface">
          8. Cambios en esta política
        </h2>
        <p>
          Podemos actualizar esta política para reflejar cambios normativos o
          en nuestros servicios. La versión vigente es siempre la publicada en
          esta página, con la fecha de actualización indicada al inicio.
        </p>
      </section>
    </>
  );
}
