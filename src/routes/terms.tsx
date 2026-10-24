import { siteUrl } from "@/content/published-site";
import { createFileRoute } from "@tanstack/react-router";
import { L } from "@/lib/locale-context";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | We've Got Now" },
      {
        name: "description",
        content:
          "Plain-language website terms covering event details, registration requests and responsible use of prompt templates.",
      },
      { property: "og:title", content: "Terms of use — We've Got Now" },
      {
        property: "og:description",
        content: "Plain-language terms for the We've Got Now website.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/terms") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/terms") }],
  }),
  component: () => (
    <LegalPage
      eyebrow={L("Updated October 23, 2026", "Actualizado el 23 de octubre de 2026")}
      title={L("Terms of use", "Términos de uso")}
      lead={L(
        "Plain-language website terms. No payment, refund or ticket rules are introduced here.",
        "Términos sencillos del sitio. Aquí no se introducen reglas de pago, reembolso ni entradas.",
      )}
      sections={[
        {
          h: L("Informational website", "Sitio informativo"),
          p: L(
            "Content is provided for practical learning. Dates, prices, capacity and availability are confirmed only where a specific event page says so.",
            "El contenido se ofrece para el aprendizaje práctico. Fechas, precios, cupos y disponibilidad solo están confirmados cuando la página de un evento específico lo indica.",
          ),
        },
        {
          h: L("Requests are not guarantees", "Solicitar no garantiza"),
          p: L(
            "A workshop seat request is confirmed or waitlisted by email; submitting it does not guarantee a seat. Careers and contribution areas are not confirmed job openings, employment offers or promises of compensation. Sharing a project does not guarantee publication, a demo slot, prize or promotion.",
            "Una solicitud de lugar en un taller se confirma o pasa a lista de espera por correo; enviarla no garantiza un lugar. Las áreas de carreras y colaboración no son vacantes confirmadas, ofertas de empleo ni promesas de compensación. Compartir un proyecto no garantiza publicación, demo, premio ni promoción.",
          ),
        },
        {
          h: L("Use information responsibly", "Usa la información de forma responsable"),
          p: L(
            "Do not share secrets, private client data or material you do not have permission to share. Prompt templates and any AI output require your own review before use.",
            "No compartas secretos, datos privados de clientes ni material que no tengas permiso para compartir. Debes revisar los prompts y cualquier resultado de IA antes de usarlos.",
          ),
        },
      ]}
    />
  ),
});
