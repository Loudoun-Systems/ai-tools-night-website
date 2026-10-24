import { siteUrl } from "@/content/published-site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLocale, L } from "@/lib/locale-context";
import { images, LINKEDIN_URL, MEETUP_URL, WORKSHOP_SLUG } from "@/content/site";
import { NightStage } from "@/components/site/NightStage";
import { Chapters } from "@/components/site/Chapters";
import { PosterCarousel } from "@/components/site/PosterCarousel";
import { useWorkshopCopy } from "@/lib/workshop-copy";
import { External } from "@/components/site/ui";
import { brands, MYGUYGUS } from "@/content/brands";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Community — Learn, Build, Share, Connect | We've Got Now" },
      {
        name: "description",
        content:
          "We've Got Now is a community for practical AI exploration, useful experiments and people learning together in Northern Virginia.",
      },
      { property: "og:title", content: "Our community — We've Got Now" },
      { property: "og:description", content: "The future feels closer when we build it together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/about") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/about") }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLocale();
  const w = useWorkshopCopy();
  return (
    <>
      <NightStage compact>
        <p className="eyebrow">
          {t(L("Our community · We’ve Got Now", "Nuestra comunidad · We’ve Got Now"))}
        </p>
        <h1 className="display-1 mt-5 max-w-2xl opening-2">
          {t(
            L(
              "The future feels closer when we build it together.",
              "El futuro se siente más cerca cuando creamos juntos.",
            ),
          )}
        </h1>
        <p className="night-lead mt-6">
          {t(
            L(
              "A place for curious people, practical ideas, and the confidence that grows when someone says: let’s try it.",
              "Un espacio para personas curiosas, ideas prácticas y la confianza que nace cuando alguien dice: vamos a probar.",
            ),
          )}
        </p>
        <Link to="/events/$slug" params={{ slug: WORKSHOP_SLUG }} className="community-next">
          <span className="eyebrow">{t(L("Next workshop", "Próximo taller"))}</span>
          <strong>{w.home_card.title}</strong>
          <span>{w.home_card.date_time} · Reston ↗</span>
        </Link>
        <div className="mt-5 flex flex-wrap gap-5">
          <External href={MEETUP_URL} className="text-link">
            Meetup ↗
          </External>
          <External href={LINKEDIN_URL} className="text-link">
            {t(L("Follow on LinkedIn", "Síguenos en LinkedIn"))} ↗
          </External>
        </div>
      </NightStage>
      {/* Start with a question + four values */}
      <section className="section" aria-labelledby="question-h">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div className="max-w-xl">
            <h2 id="question-h" className="display-2">
              {t(L("You can start with a question.", "Puedes empezar con una pregunta."))}
            </h2>
            <div className="body-copy mt-6 text-[1.0625rem]">
              <p>
                {t(
                  L(
                    "AI Tools Explorers Night brings together practical demonstrations, thoughtful questions and people who want to understand what the tools can help them do. You do not have to arrive with all the answers.",
                    "AI Tools Explorers Night reúne demostraciones prácticas, preguntas útiles y personas que quieren entender qué pueden hacer con estas herramientas. No necesitas llegar con todas las respuestas.",
                  ),
                )}
              </p>
              <p>
                {t(
                  L(
                    "Bring something you want to learn. Share something you tried. Listen to another way of looking at the same task. Useful connections often start there.",
                    "Trae algo que quieras aprender. Comparte algo que hayas probado. Escucha otra forma de ver la misma tarea. Las conexiones útiles suelen empezar ahí.",
                  ),
                )}
              </p>
            </div>
          </div>
          <Chapters />
        </div>
      </section>

      {/* Formats */}
      <section className="section" aria-labelledby="formats-h">
        <div className="shell">
          <h2 id="formats-h" className="display-2 max-w-2xl">
            {t(L("Two ways to take part.", "Dos formas de participar."))}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="flex flex-col border-t border-border py-7 sm:py-9">
              <p className="eyebrow">AI Tools Explorers Night</p>
              <h3 className="display-3 mt-4">
                {t(L("Community meetups", "Encuentros de la comunidad"))}
              </h3>
              <p className="body-copy mt-3">
                {t(
                  L(
                    "Community meetups make room for demos, questions and practical connections. Follow the community for confirmed event details.",
                    "Los encuentros de la comunidad ofrecen demos, preguntas y conexiones prácticas. Sigue a la comunidad para conocer los eventos confirmados.",
                  ),
                )}
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <a
                  className="btn btn-primary btn-sm"
                  href={MEETUP_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Meetup
                </a>
                <a
                  className="btn btn-ghost btn-sm"
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(L("LinkedIn page", "Página de LinkedIn"))}
                </a>
              </div>
            </div>
            <div className="flex flex-col border-t border-border py-7 sm:py-9">
              <p className="eyebrow">MyGuyGus</p>
              <h3 className="display-3 mt-4">{t(L("Hands-on workshops", "Talleres prácticos"))}</h3>
              <p className="body-copy mt-3">
                {t(
                  L(
                    "A separate hands-on format built around useful everyday tasks. The first free pilot — building a Make.com automation — is Sunday, November 8 in Reston.",
                    "Un formato práctico y distinto para trabajar con tareas cotidianas. La primera sesión piloto gratuita, para crear una automatización en Make.com, es el domingo 8 de noviembre en Reston.",
                  ),
                )}
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Link
                  to="/events/$slug"
                  params={{ slug: WORKSHOP_SLUG }}
                  className="btn btn-primary btn-sm"
                >
                  {t(L("See the workshop", "Ver el taller"))}
                </Link>
                <Link to="/code-of-conduct" className="btn btn-ghost btn-sm">
                  {t(L("Code of conduct", "Código de conducta"))}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="posters-h">
        <div className="shell">
          <h2 id="posters-h" className="display-2 max-w-2xl">
            {t(L("Poster", "Póster"))}
          </h2>
          <div className="mt-8">
            <PosterCarousel />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="wider-h">
        <div className="shell">
          <div className="wider-team py-10">
            <p className="eyebrow">{t(L("From our wider team", "De nuestro equipo ampliado"))}</p>
            <h2 id="wider-h" className="display-3 mt-4">
              MyGuyGus · Your AI Everything
            </h2>
            <p className="body-copy mt-4 max-w-3xl">
              {t(
                L(
                  "Two connected parts of our wider team: practical guidance for the tools you use, and AI systems shaped around your work.",
                  "Dos partes conectadas de nuestro equipo ampliado: orientación práctica para las herramientas que usas y sistemas de IA adaptados a tu trabajo.",
                ),
              )}
            </p>
            <div className="team-cards mt-8">
              {[MYGUYGUS, ...brands.filter((b) => b.key === "your-ai-everything")].map((b) => (
                <article key={b.key} className={`team-card team-${b.key}`}>
                  <p className="eyebrow">{b.key === "myguygus" ? "MyGuyGus" : "YAE"}</p>
                  <h3 className="display-3 mt-5">{b.name}</h3>
                  <p className="body-copy mt-4">{t(b.summary)}</p>
                  <External href={b.url} className="text-link mt-auto pt-7 inline-block">
                    {b.host} ↗
                  </External>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              search={{ intent: "cohost-speaker" }}
              className="btn btn-primary btn-sm"
            >
              {t(L("Co-host or speak", "Coorganiza o presenta"))}
            </Link>
            <Link
              to="/contact"
              search={{ intent: "host-an-event" }}
              className="btn btn-ghost btn-sm"
            >
              {t(L("Host at our Reston space", "Organiza en nuestro espacio de Reston"))}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
