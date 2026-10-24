import { siteUrl } from "@/content/published-site";
import { createFileRoute } from "@tanstack/react-router";
import { L } from "@/lib/locale-context";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice | We've Got Now" },
      {
        name: "description",
        content:
          "What the website forms send, what is stored in your browser, which outside services our links lead to, and how to reach us about privacy.",
      },
      { property: "og:title", content: "Privacy notice — We've Got Now" },
      {
        property: "og:description",
        content:
          "Browser storage, outside services and privacy contact for the We've Got Now website.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/privacy") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/privacy") }],
  }),
  component: () => (
    <LegalPage
      eyebrow={L("Updated October 24, 2026", "Actualizado el 24 de octubre de 2026")}
      title={L("Privacy notice", "Aviso de privacidad")}
      lead={L(
        "This notice describes the current website functionality. It is not a legal certification.",
        "Este aviso describe las funciones actuales del sitio. No es una certificación legal.",
      )}
      sections={[
        {
          h: L("Contact and collaboration forms", "Formularios de contacto y colaboración"),
          p: L(
            "When you send a contact, collaboration, venue, speaking-invitation or career-interest form, the site sends your first and last name, email address, message, any optional link you add, the form type and your language to the We’ve Got Now organizers by email. A random ticket ID and a one-way fingerprint of the request are held temporarily in server memory for up to 24 hours as best-effort duplicate protection. These records are not shared across servers and may disappear on restart, so duplicate prevention is not guaranteed. The website uses no database and makes no Google Sheets copies. We use it only to review and reply to your request; it is reviewed internally by our team. Sending a form does not subscribe you to any newsletter or marketing list. The site has no chat assistant or accounts, and the prompt editor works only inside your browser.",
            "Cuando envías un formulario de contacto, colaboración, espacio, invitación a presentar o interés profesional, el sitio envía tu nombre y apellido, correo electrónico, mensaje, el enlace opcional que añadas, el tipo de formulario y tu idioma por correo a las personas organizadoras de We’ve Got Now. Se conservan temporalmente en la memoria del servidor un número de solicitud aleatorio y una huella unidireccional hasta 24 horas, como protección limitada contra duplicados. Estos registros no se comparten entre servidores y pueden desaparecer al reiniciar; no se garantiza evitar duplicados. El sitio no usa una base de datos ni hace copias en Google Sheets. Lo usamos solo para revisar y responder tu solicitud; nuestro equipo lo revisa internamente. Enviar un formulario no te suscribe a boletines ni listas de marketing. El sitio no tiene asistente de chat ni cuentas, y el editor de prompts funciona solo en tu navegador.",
          ),
        },
        {
          h: L("Browser storage", "Almacenamiento del navegador"),
          p: L(
            "If your browser allows it, the site remembers your EN/ES preference and the prompts you bookmark in localStorage on your device. Prompt edits are kept in memory only and disappear when you close the site. No analytics or advertising tracker is enabled by this application; hosting infrastructure may process normal request metadata.",
            "Si tu navegador lo permite, el sitio recuerda tu preferencia EN/ES y los prompts que guardas en localStorage en tu dispositivo. Las ediciones de prompts se guardan solo en memoria y desaparecen al cerrar el sitio. Esta aplicación no habilita analítica ni rastreadores publicitarios; la infraestructura de alojamiento puede procesar metadatos normales de solicitudes.",
          ),
        },
        {
          h: L("Outside services", "Servicios externos"),
          p: L(
            "Workshop registration links open Google Forms or Meetup, and community links open Meetup or LinkedIn. Information you give those services is handled under their own policies and our established community workflows.",
            "Los enlaces de inscripción abren Google Forms o Meetup, y los enlaces de la comunidad abren Meetup o LinkedIn. La información que compartes allí se rige por sus propias políticas y por los procesos establecidos de la comunidad.",
          ),
        },
        {
          h: L("Contact", "Contacto"),
          p: L(
            "For privacy questions, use the established community contact at hello@aitoolsexplorers.com.",
            "Para preguntas de privacidad, escribe a hello@aitoolsexplorers.com.",
          ),
        },
      ]}
    />
  ),
});
