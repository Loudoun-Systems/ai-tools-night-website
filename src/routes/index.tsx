import { siteUrl } from "@/content/published-site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLocale, L } from "@/lib/locale-context";
import { images, MEETUP_URL, LINKEDIN_URL } from "@/content/site";
import { prompts } from "@/content/prompts-tracks";
import { Img } from "@/components/site/ui";
import { WorkshopFeature } from "@/components/site/workshop";
import { NightStage } from "@/components/site/NightStage";
import { Chapters } from "@/components/site/Chapters";
import { BirthdayFlow } from "@/components/site/BirthdayFlow";
import { CommunityFilm } from "@/components/site/CommunityFilm";

const howTo = [
  L(
    "Bring your context: the task, the audience, what you already have.",
    "Trae tu contexto: la tarea, la audiencia y lo que ya tienes.",
  ),
  L(
    "Adapt a workflow: edit the template so it fits your real situation.",
    "Adapta un flujo: edita la plantilla para que encaje con tu situación real.",
  ),
  L(
    "Check the result: compare it with the checklist before you use it.",
    "Revisa el resultado: compáralo con la lista de control antes de usarlo.",
  ),
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "We've Got Now — Community & Workshops for Practical AI" },
      {
        name: "description",
        content:
          "A community for curious people exploring practical AI in Northern Virginia. Meet, make and find your next experiment with We've Got Now.",
      },
      { property: "og:title", content: "We've Got Now — Community & Workshops" },
      {
        property: "og:description",
        content:
          "Explore AI, build useful things and learn with people who are figuring it out too.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/") }],
  }),
  component: Home,
});

const featuredSlugs = [
  "decision-brief-with-evidence",
  "automation-opportunity-map",
  "notes-to-next-steps",
];

function Home() {
  const { t } = useLocale();
  const featured = featuredSlugs
    .map((s) => prompts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const paths = [
    {
      kicker: L("Meet your people", "Encuentra tu comunidad"),
      title: L(
        "One good conversation can change what you try next.",
        "Una buena conversación puede cambiar lo que pruebas después.",
      ),
      body: L(
        "See an idea in action. Ask the question you have been sitting on. Meet other people exploring practical AI, one useful experiment at a time.",
        "Ve una idea en acción. Haz esa pregunta que tienes pendiente. Conoce a otras personas explorando la IA práctica, un experimento útil a la vez.",
      ),
      to: "/events" as const,
      cta: L("See events", "Ver eventos"),
    },
    {
      kicker: L("Make something useful", "Crea algo útil"),
      title: L(
        "Bring a task. Find a new way through it.",
        "Trae una tarea. Encuentra otra forma de resolverla.",
      ),
      body: L(
        "Better prompts. Clearer workflows. A small project you can explain. Our workshops are built around trying things together, with room to ask, get stuck, and improve.",
        "Mejores prompts. Flujos más claros. Un proyecto pequeño que puedas explicar. Nuestros talleres son para probar juntos, preguntar, trabarnos y mejorar.",
      ),
      to: "/workshops" as const,
      cta: L("Explore workshops", "Explorar talleres"),
    },
    {
      kicker: L("Follow a better prompt", "Prueba un mejor prompt"),
      title: L(
        "Skip the blank page. Start with a real task.",
        "Sal de la página en blanco. Empieza con una tarea real.",
      ),
      body: L(
        "Detailed workflows for research, content, automation, building and more. Add your context, edit the brief, and check what comes back.",
        "Flujos detallados para investigar, crear contenido, automatizar y construir. Añade contexto, edita las instrucciones y revisa el resultado.",
      ),
      to: "/prompt-library" as const,
      cta: L("Open the prompt library", "Abre la guía de prompts"),
    },
  ];

  return (
    <>
      <NightStage>
        <p className="eyebrow opening-1">
          {t(
            L(
              "Northern Virginia · Practical AI · Community",
              "Norte de Virginia · IA práctica · Comunidad",
            ),
          )}
        </p>
        <h1 className="night-title opening-2">
          We’ve Got
          <br />
          <span>Now.</span>
        </h1>
        <p className="night-invitation opening-3">
          {t(L("Make room for your next idea.", "Dale espacio a tu próxima idea."))}
        </p>
        <p className="night-lead opening-3">
          {t(
            L(
              "Explore AI, build useful things, and learn with people who are figuring it out too.",
              "Explora la IA, crea cosas útiles y aprende con personas que también están descubriendo cómo hacerlo.",
            ),
          )}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 opening-3">
          <Link to="/workshops" className="btn btn-primary">
            {t(L("Explore workshops", "Explorar talleres"))}
          </Link>
          <Link to="/about" className="btn btn-ghost">
            {t(L("Meet the community", "Conocer la comunidad"))}
          </Link>
        </div>
        <Link
          to="/events/$slug"
          params={{ slug: "build-your-first-ai-automation-2026-11-08" }}
          className="stage-ticket"
        >
          <span className="stage-ticket-label">
            {t(L("NEXT / FREE FIRST PILOT", "PRÓXIMO / PILOTO GRATUITO"))}
          </span>
          <span className="font-display font-semibold">
            {t(L("Build Your First AI Automation", "Crea tu primera automatización con IA"))}
          </span>
          <span className="text-sm text-primary">
            {t(L("Nov 8 · 2–4 PM ET · Reston", "8 nov. · 2–4 p. m., hora del Este · Reston"))}{" "}
            <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </NightStage>
      <CommunityFilm />
      <section className="section invitation-band">
        <div className="shell">
          <p className="eyebrow">
            {t(L("Four verbs. A shared way forward.", "Cuatro verbos. Un camino compartido."))}
          </p>
          <h2 className="display-2 mt-4 max-w-2xl">
            {t(
              L(
                "The future feels closer when we build it together.",
                "El futuro se siente más cerca cuando creamos juntos.",
              ),
            )}
          </h2>
          <Chapters />
        </div>
      </section>
      {/* Next workshop */}
      <section className="section pt-4 md:pt-6" aria-labelledby="next-heading">
        <div className="shell">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 id="next-heading" className="display-2 gradient-heading">
              {t(L("Learn it Sunday. Use it Monday.", "Apréndelo el domingo. Úsalo el lunes."))}
            </h2>
            <Link to="/events" className="text-link">
              {t(L("All events", "Todos los eventos"))}
            </Link>
          </div>
          <WorkshopFeature headingLevel={3} />
        </div>
      </section>

      <section className="section workflow-band">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">{t(L("Inside the workshop", "Dentro del taller"))}</p>
            <h2 className="display-2 mt-4">
              {t(L("One birthday. Four useful steps.", "Un cumpleaños. Cuatro pasos útiles."))}
            </h2>
            <p className="body-copy mt-4">
              {t(
                L(
                  "The birthday helper you’ll build in Make.com — with a human review before anything is sent.",
                  "El asistente de cumpleaños que crearás en Make.com, con revisión humana antes de enviar algo.",
                ),
              )}
            </p>
          </div>
          <BirthdayFlow />
        </div>
      </section>
      {/* Starting points */}
      <section className="section" aria-labelledby="paths-heading">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">
              {t(L("Choose your own starting point", "Elige tu punto de partida"))}
            </p>
            <h2 id="paths-heading" className="display-2 mt-4">
              {t(L("What brings you here?", "¿Qué te trae por aquí?"))}
            </h2>
            <p className="lede mt-4">
              {t(
                L(
                  "A conversation. An experiment. That thing you have been meaning to make. Take the next step that feels like you.",
                  "Una conversación. Un experimento. Eso que llevas tiempo queriendo crear. Da el siguiente paso a tu manera.",
                ),
              )}
            </p>
          </div>
          <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {paths.map((p, i) => (
              <li key={p.to} className="flex flex-col border-t border-border pt-6">
                <p className="text-sm font-semibold text-primary">
                  <span className="mr-2 font-display text-muted-foreground">0{i + 1}</span>
                  {t(p.kicker)}
                </p>
                <h3 className="display-3 mt-3">{t(p.title)}</h3>
                <p className="body-copy mt-3">{t(p.body)}</p>
                <Link to={p.to} className="text-link mt-auto pt-5">
                  {t(p.cta)} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Prompt library preview */}
      <section className="section" aria-labelledby="prompts-heading">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="order-last lg:order-first">
            <div className="field-guide-art aspect-[16/9]">
              <Img pic={images.prompts} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <ol className="library-howto">
              {howTo.map((h, i) => (
                <li key={h.en}>
                  <span className="flow-number">0{i + 1}</span>
                  <span>{t(h)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow">{t(L("The prompt library", "La guía de prompts"))}</p>
            <h2 id="prompts-heading" className="display-2 mt-4">
              {t(
                L(
                  "Less blank page. More possibility.",
                  "Menos página en blanco. Más posibilidades.",
                ),
              )}
            </h2>
            <p className="lede mt-4">
              {t(
                L(
                  `${prompts.length} real workflows, with the missing middle filled in: what to provide, how to work, and how to check the result. Editable, saveable and in English and Spanish.`,
                  `${prompts.length} flujos completos: qué aportar, cómo trabajar y cómo revisar el resultado. Editables, guardables y en inglés y español.`,
                ),
              )}
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {featured.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/prompt-library/$slug"
                    params={{ slug: p.slug }}
                    className="group grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
                  >
                    <span className="font-display text-lg font-semibold transition-colors group-hover:text-primary">
                      {t(p.title)}
                    </span>
                    <span className="text-sm text-muted-foreground">{t(p.category)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/prompt-library" className="btn btn-ghost mt-8">
              {t(L("Browse all prompts", "Ver todos los prompts"))}
            </Link>
          </div>
        </div>
      </section>

      {/* People */}
      <section className="section" aria-labelledby="people-heading">
        <div className="shell">
          <div className="people-invitation grid gap-8 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow">
                {t(L("It’s about the people", "Lo importante son las personas"))}
              </p>
              <h2 id="people-heading" className="display-2 mt-4 gradient-heading">
                {t(
                  L(
                    "Come for the tools. Stay for the people.",
                    "Ven por las herramientas. Quédate por las personas.",
                  ),
                )}
              </h2>
            </div>
            <div>
              <p className="body-copy">
                {t(
                  L(
                    "You don’t need a perfect project or every answer. Bring the question, the rough version, the idea that won’t leave you alone. There’s a place for that here.",
                    "No necesitas un proyecto perfecto ni todas las respuestas. Trae tu pregunta, tu primer borrador, esa idea que no te deja en paz. Aquí hay espacio para eso.",
                  ),
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={MEETUP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  {t(L("Follow on Meetup", "Síguenos en Meetup"))}
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  {t(L("Follow on LinkedIn", "Síguenos en LinkedIn"))}
                </a>
                <Link to="/contact" className="btn btn-ghost btn-sm">
                  {t(L("Contact & collaborate", "Contacto y colaboración"))}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
