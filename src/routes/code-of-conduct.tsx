import { siteUrl } from "@/content/published-site";
import { createFileRoute } from "@tanstack/react-router";
import { L } from "@/lib/locale-context";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/code-of-conduct")({
  head: () => ({
    meta: [
      { title: "Code of Conduct | We've Got Now" },
      {
        name: "description",
        content:
          "Community expectations for welcoming, harassment-free events and responsible handling of people, recordings and data.",
      },
      { property: "og:title", content: "Code of conduct — We've Got Now" },
      {
        property: "og:description",
        content: "Curiosity with respect: how we keep WGN events welcoming.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/code-of-conduct") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/code-of-conduct") }],
  }),
  component: () => (
    <LegalPage
      eyebrow={L("Community expectations", "Expectativas de la comunidad")}
      title={L("Curiosity with respect.", "Curiosidad con respeto.")}
      lead={L(
        "We want events and online spaces where people can learn, build and share without harassment or pressure.",
        "Queremos eventos y espacios en línea donde las personas puedan aprender, crear y compartir sin acoso ni presión.",
      )}
      sections={[
        {
          h: L("Be welcoming", "Da la bienvenida"),
          p: L(
            "Respect different backgrounds, identities, roles and experience levels. Listen actively, make room for questions and criticize ideas without attacking people.",
            "Respeta distintos orígenes, identidades, roles y niveles de experiencia. Escucha, da espacio a preguntas y critica ideas sin atacar a personas.",
          ),
        },
        {
          h: L("No harassment or pressure", "Sin acoso ni presión"),
          p: L(
            "Harassment, discrimination, threats, unwanted sexual attention, repeated disruption and pressure to share contact or private information are not acceptable.",
            "No se aceptan acoso, discriminación, amenazas, atención sexual no deseada, interrupciones repetidas ni presión para compartir contacto o información privada.",
          ),
        },
        {
          h: L("Protect people and data", "Protege a las personas y sus datos"),
          p: L(
            "Ask before recording or sharing someone else’s work or image. Use sample or redacted material in demonstrations. Do not expose credentials, customer data or confidential work.",
            "Pide permiso antes de grabar o compartir el trabajo o imagen de otra persona. Usa material ficticio o redactado. No expongas credenciales, datos de clientes ni trabajo confidencial.",
          ),
        },
        {
          h: L("Raise a concern", "Reporta una inquietud"),
          p: L(
            "Contact hello@aitoolsexplorers.com. Organizers may remove content or participants when needed to protect the community.",
            "Escribe a hello@aitoolsexplorers.com. Las personas organizadoras pueden retirar contenido o participantes cuando sea necesario para proteger a la comunidad.",
          ),
        },
      ]}
    />
  ),
});
