import { siteUrl } from "@/content/published-site";
import { useWorkshopCopy } from "@/lib/workshop-copy";
import { createFileRoute } from "@tanstack/react-router";
import { useLocale, L } from "@/lib/locale-context";
import { images, WORKSHOP_SLUG } from "@/content/site";
import { Img, PageIntro } from "@/components/site/ui";
import { WorkshopFeature } from "@/components/site/workshop";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Hands-on AI Workshops in Reston | We've Got Now" },
      {
        name: "description",
        content:
          "Beginner-friendly, hands-on AI workshops from MyGuyGus and We've Got Now. First pilot: Build Your First AI Automation with Make.com, November 8 in Reston.",
      },
      { property: "og:title", content: "Hands-on AI workshops — We've Got Now" },
      {
        property: "og:description",
        content:
          "A little less theory. A lot more trying. Free first pilot November 8 in Reston, VA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/workshops") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/workshops") }],
  }),
  component: WorkshopsPage,
});

const areas = [
  {
    title: L("Ask with context", "Pregunta con contexto"),
    body: L(
      "Turn a vague request into a useful brief with inputs, constraints and a clear result.",
      "Convierte una petición vaga en una instrucción útil con contexto, límites y un resultado claro.",
    ),
  },
  {
    title: L("Try a useful workflow", "Prueba un flujo útil"),
    body: L(
      "Explore a practical sequence for notes, writing, research or another everyday task.",
      "Explora una secuencia práctica para notas, escritura, investigación u otra tarea cotidiana.",
    ),
  },
  {
    title: L("Check and improve", "Revisa y mejora"),
    body: L(
      "Compare the output with your goal, spot gaps and decide what still needs a human check.",
      "Compara el resultado con tu objetivo, identifica lo que falta y decide qué necesita revisión humana.",
    ),
  },
];

const flow = [
  L("Choose a task", "Elige una tarea"),
  L("Explore an approach", "Explora una forma de hacerlo"),
  L("Try, compare and refine", "Prueba, compara y ajusta"),
  L("Share what you learned", "Comparte lo aprendido"),
];

function WorkshopsPage() {
  const { t } = useLocale();
  const w = useWorkshopCopy();
  const faq = [
    {
      q: L("When is the next workshop?", "¿Cuándo será el próximo taller?"),
      a: L(
        "Sunday, November 8, 2026, from 2:00 to 4:00 PM Eastern, at 1920 Association Dr, Reston, VA 20191.",
        "El domingo 8 de noviembre de 2026, de 2:00 a 4:00 p. m., hora del Este, en 1920 Association Dr, Reston, VA 20191.",
      ),
    },
    {
      q: L("How much does it cost?", "¿Cuánto cuesta?"),
      a: L(
        "This first pilot is free. Space is limited, and a request is confirmed or waitlisted by email — submitting the form does not guarantee a seat.",
        "Esta primera sesión piloto es gratuita. Los cupos son limitados y cada solicitud se confirma o pasa a lista de espera por correo; enviar el formulario no garantiza un lugar.",
      ),
    },
    {
      q: L("Is it suitable for beginners?", "¿Está pensado para principiantes?"),
      a: L(
        "Yes. No coding experience is needed. Bring a laptop and charger; we’ll send simple account and spreadsheet preparation steps before the workshop.",
        "Sí. No necesitas saber programar. Trae tu laptop y su cargador; antes del taller enviaremos instrucciones sencillas para preparar tu cuenta y tu hoja de cálculo.",
      ),
    },
    {
      q: L("How do I register?", "¿Cómo me registro?"),
      a: L(
        "Use one route per person: “Request a seat” for a direct request without a Meetup account, or “RSVP on Meetup” if you already use Meetup. Invite a friend — each person registers separately.",
        "Usa una sola vía por persona: «Solicitar un lugar» si no tienes cuenta de Meetup, o «Confirmar asistencia en Meetup» si ya la usas. Invita a alguien; cada persona se registra por separado.",
      ),
    },
    {
      q: L("Is a workshop the same as a meetup?", "¿Un taller es lo mismo que un encuentro?"),
      a: L(
        "No. AI Tools Explorers Night community meetups and MyGuyGus workshops are separate formats with their own details.",
        "No. Los encuentros de AI Tools Explorers Night y los talleres de MyGuyGus son formatos distintos, cada uno con sus propios detalles.",
      ),
    },
  ];

  return (
    <>
      <PageIntro
        eyebrow={L("Hands-on AI workshops · MyGuyGus", "Talleres prácticos de IA · MyGuyGus")}
        title={t(
          L("A little less theory. A lot more trying.", "Menos teoría. Más aprender haciendo."),
        )}
        lead={L(
          "A workshop series from MyGuyGus for people who want to explore AI through a real task, with room to ask questions and compare approaches.",
          "Una serie de talleres de MyGuyGus para explorar la IA con una tarea real, hacer preguntas y comparar distintas formas de trabajar.",
        )}
        aside={
          <div className="frame aspect-[3/2]">
            <Img pic={images.workshops} eager sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        }
      />

      <section className="section pt-4" aria-labelledby="first-h">
        <div className="shell">
          <h2 id="first-h" className="display-2 mb-6">
            {t(L("The first pilot", "La primera sesión piloto"))}
          </h2>
          <WorkshopFeature headingLevel={3} />
        </div>
      </section>

      <section className="section" aria-labelledby="learn-h">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow">{t(L("Start where you are", "Empieza desde donde estás"))}</p>
            <h2 id="learn-h" className="display-2 mt-4">
              {t(L("What every workshop practices.", "Lo que practicamos en cada taller."))}
            </h2>
            <p className="body-copy mt-4 max-w-md">
              {t(
                L(
                  "Workshops are beginner-friendly. Bring curiosity and a task you would like to explore; preparation details are shared with each confirmed workshop.",
                  "Los talleres están pensados para principiantes. Trae curiosidad y una tarea que quieras explorar; compartimos la preparación con cada taller confirmado.",
                ),
              )}
            </p>
          </div>
          <div>
            <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {areas.map((a) => (
                <li key={a.title.en} className="border-t-2 border-primary/60 pt-5">
                  <h3 className="font-display text-xl font-semibold">{t(a.title)}</h3>
                  <p className="body-copy mt-2 text-[0.975rem]">{t(a.body)}</p>
                </li>
              ))}
            </ul>
            <div className="surface mt-10 p-6">
              <h3 className="font-display text-lg font-semibold">
                {t(L("How a session flows", "Cómo fluye una sesión"))}
              </h3>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {flow.map((f, i) => (
                  <li key={f.en} className="flex items-start gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-[0.975rem]">{t(f)}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-muted-foreground">
                {t(
                  L(
                    "A general learning flow. Each workshop page lists its own timed agenda.",
                    "Un recorrido general. Cada página de taller incluye su propia agenda.",
                  ),
                )}{" "}
                <Link to="/events/$slug" params={{ slug: WORKSHOP_SLUG }} className="text-link">
                  {t(L("See the November 8 agenda", "Ver la agenda del 8 de noviembre"))}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-h">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <h2 id="faq-h" className="display-2">
              {t(L("Questions, answered.", "Preguntas frecuentes."))}
            </h2>
            <p className="body-copy mt-4 max-w-md">{w.registration_note}</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faq.map((f) => (
              <details key={f.q.en} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  <span>{t(f.q)}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="body-copy mt-3 max-w-[62ch]">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
