import { siteUrl } from "@/content/published-site";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useLocale, L } from "@/lib/locale-context";
import { PageIntro } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";
import type { InquiryKind } from "@/lib/inquiry";

const intents = ["contact", "cohost-speaker", "host-an-event", "invite-us"] as const;

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ intent: z.enum(intents).optional() }),
  head: () => ({
    meta: [
      { title: "Contact & Collaborate | We've Got Now" },
      {
        name: "description",
        content:
          "Contact the We've Got Now organizers, offer to co-host or speak, ask about hosting a meetup at our Reston space, or invite us to speak to your team.",
      },
      { property: "og:title", content: "Contact & collaborate — We've Got Now" },
      {
        property: "og:description",
        content:
          "Send a message, offer a session, ask about our Reston space or invite us to speak.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/contact") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/contact") }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLocale();
  const { intent } = Route.useSearch();
  const navigate = useNavigate({ from: "/contact" });
  return (
    <>
      <PageIntro
        eyebrow={L("Contact & collaborate", "Contacto y colaboración")}
        title={
          <span className="gradient-heading">
            {t(L("Let’s make something together.", "Creemos algo juntos."))}
          </span>
        }
        lead={L(
          "Every request is read and reviewed by our team. Sending a form does not reserve a space, confirm a session or guarantee availability.",
          "Nuestro equipo lee y revisa cada solicitud. Enviar un formulario no reserva un espacio, no confirma una sesión ni garantiza disponibilidad.",
        )}
      />
      <section className="section pt-4">
        <div className="shell">
          <div className="max-w-4xl">
            <InquiryForm
              kinds={[...intents] as InquiryKind[]}
              initial={intent ?? "contact"}
              onKindChange={(k) =>
                navigate({
                  search: k === "contact" ? {} : { intent: k as (typeof intents)[number] },
                  resetScroll: false,
                })
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
