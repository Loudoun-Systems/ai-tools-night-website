import { createFileRoute, Link } from "@tanstack/react-router";
import { useLocale, L } from "@/lib/locale-context";
import { PageIntro } from "@/components/site/ui";

export const Route = createFileRoute("/legacy-receipt")({
  head: () => ({
    meta: [
      { title: "Form confirmation | We've Got Now" },
      {
        name: "description",
        content:
          "Use the confirmation from the original form as the source of truth. This page creates no new submission.",
      },
      { property: "og:title", content: "Form confirmation — We've Got Now" },
      { property: "og:description", content: "This page does not create or resend a submission." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Receipt,
});

function Receipt() {
  const { t } = useLocale();
  return (
    <PageIntro
      eyebrow={L("The original service is the source", "Consulta el servicio original")}
      title={t(L("No new receipt was created here.", "Aquí no se creó un comprobante nuevo."))}
      lead={L(
        "Use the confirmation shown by the original form as the source of truth. This page did not resend your information, reserve a place, or create another submission.",
        "Usa la confirmación del formulario original como referencia. Esta página no volvió a enviar tu información, no reservó ningún cupo ni creó otro envío.",
      )}
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-primary">
          {t(L("Return home", "Volver al inicio"))}
        </Link>
        <Link to="/events" className="btn btn-ghost">
          {t(L("Explore events", "Explora los eventos"))}
        </Link>
      </div>
    </PageIntro>
  );
}
