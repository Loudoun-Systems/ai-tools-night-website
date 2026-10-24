import { siteUrl } from "@/content/published-site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLocale, L } from "@/lib/locale-context";
import { images, MEETUP_URL } from "@/content/site";
import { Img, PageIntro } from "@/components/site/ui";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Community Projects & Practice Ideas | We've Got Now" },
      {
        name: "description",
        content:
          "Small project ideas, useful starting points and a clear way to share what you learned with the WGN community.",
      },
      { property: "og:title", content: "Less someday. More something. — We've Got Now" },
      {
        property: "og:description",
        content: "Practice briefs and a simple way to share a work in progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/projects") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/projects") }],
  }),
  component: ProjectsPage,
});

const ideas = [
  {
    kind: L("A useful workflow", "Un flujo útil"),
    title: L(
      "From scattered notes to a clear next step.",
      "De notas dispersas a un siguiente paso claro.",
    ),
    body: L(
      "Design a small workflow that turns sample notes into decisions, questions and a task list. Show what a human still needs to review.",
      "Diseña un flujo pequeño que convierta notas de ejemplo en decisiones, preguntas y tareas. Muestra qué necesita revisión humana.",
    ),
    deliverable: L(
      "A process map, sample inputs and a checked result.",
      "Un mapa del proceso, datos de ejemplo y un resultado revisado.",
    ),
    to: "/prompt-library/$slug" as const,
    slug: "notes-to-next-steps",
    link: L("Start with a planning prompt", "Empieza con un prompt de planificación"),
  },
  {
    kind: L("A small web experience", "Una experiencia web pequeña"),
    title: L("A page someone can actually use.", "Una página que alguien pueda usar."),
    body: L(
      "Choose a local idea or community activity. Build an accessible page that explains it clearly, works on a phone, and makes its next action obvious.",
      "Elige una idea local o actividad comunitaria. Crea una página accesible que la explique, funcione en móvil y tenga una acción clara.",
    ),
    deliverable: L(
      "A working prototype and a short usability review.",
      "Un prototipo funcional y una breve revisión de uso.",
    ),
    to: "/careers" as const,
    slug: null,
    link: L("Explore building skills", "Explora habilidades para crear"),
  },
  {
    kind: L("A practical explainer", "Una explicación práctica"),
    title: L(
      "Make one useful idea easier to understand.",
      "Haz que una idea útil sea fácil de entender.",
    ),
    body: L(
      "Explain a task with a short guide, an example and a visual. Keep your sources close and identify where the approach stops being reliable.",
      "Explica una tarea con una guía breve, un ejemplo y una imagen. Incluye fuentes e indica los límites del método.",
    ),
    deliverable: L(
      "A clear guide, one example and a source list.",
      "Una guía clara, un ejemplo y una lista de fuentes.",
    ),
    to: "/prompt-library/$slug" as const,
    slug: "learn-by-doing",
    link: L("Plan a learning experiment", "Planifica una experiencia de aprendizaje"),
  },
];

const notes = [
  {
    title: L("The problem.", "El problema."),
    body: L(
      "What were you trying to make easier, faster or clearer? Start with the task, not the tool.",
      "¿Qué intentabas hacer más fácil, rápido o claro? Empieza con la tarea, no con la herramienta.",
    ),
  },
  {
    title: L("The approach.", "La forma de hacerlo."),
    body: L(
      "Explain the choices you made. Share a safe public demo or example, without private information.",
      "Explica tus decisiones. Comparte una demo o ejemplo público seguro, sin información privada.",
    ),
  },
  {
    title: L("What you learned.", "Lo que aprendiste."),
    body: L(
      "What worked, what did not, and what would you change next? The lesson matters as much as the result.",
      "¿Qué funcionó, qué no y qué cambiarías? El aprendizaje importa tanto como el resultado.",
    ),
  },
];

function ProjectsPage() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        eyebrow={L("The community notebook", "El cuaderno de la comunidad")}
        title={t(L("Less someday. More something.", "Menos «algún día». Más empezar."))}
        lead={L(
          "A useful project starts with a question worth trying. Explore an idea, make a small version, and share what you learn along the way.",
          "Un proyecto útil empieza con una pregunta que vale la pena probar. Explora una idea, crea una versión pequeña y comparte lo que aprendes.",
        )}
        aside={
          <div className="frame aspect-[3/2]">
            <Img pic={images.projects} eager sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        }
      >
        <p className="mt-6 max-w-xl text-sm text-muted-foreground">
          {t(
            L(
              "Community project stories will appear here after review and permission to publish. Until then, the practice ideas below offer somewhere useful to begin.",
              "Publicaremos historias de proyectos de la comunidad después de revisarlas y obtener permiso. Mientras tanto, estas ideas de práctica ofrecen un punto de partida útil.",
            ),
          )}
        </p>
      </PageIntro>

      <section className="section pt-6" aria-labelledby="ideas-h">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">{t(L("Practice ideas", "Ideas para practicar"))}</p>
            <h2 id="ideas-h" className="display-2 mt-4">
              {t(L("Small enough to start.", "Lo bastante pequeño para empezar."))}
            </h2>
            <p className="body-copy mt-4">
              {t(
                L(
                  "Use these as practice briefs. They are possibilities to explore, not products, client work or promised outcomes.",
                  "Úsalas como ejercicios. Son posibilidades para explorar, no productos, trabajo para clientes ni resultados prometidos.",
                ),
              )}
            </p>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {ideas.map((idea) => (
              <li key={idea.title.en} className="surface flex flex-col p-6 sm:p-7">
                <span className="pill">{t(L("Practice idea", "Idea de práctica"))}</span>
                <p className="mt-5 text-sm font-semibold text-primary">{t(idea.kind)}</p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
                  {t(idea.title)}
                </h3>
                <p className="body-copy mt-3 text-[0.975rem]">{t(idea.body)}</p>
                <p className="mt-5 text-sm">
                  <span className="font-semibold">{t(L("What to make: ", "Qué crear: "))}</span>
                  <span className="text-muted-foreground">{t(idea.deliverable)}</span>
                </p>
                <div className="mt-auto pt-5">
                  {idea.slug ? (
                    <Link
                      to="/prompt-library/$slug"
                      params={{ slug: idea.slug }}
                      className="text-link"
                    >
                      {t(idea.link)}
                    </Link>
                  ) : (
                    <Link to="/careers" className="text-link">
                      {t(idea.link)}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="share-h">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <h2 id="share-h" className="display-2">
              {t(L("Give the idea a little context.", "Dale un poco de contexto a la idea."))}
            </h2>
            <p className="body-copy mt-4 max-w-md">
              {t(
                L(
                  "You do not need a finished product. A clear question, an honest experiment and a useful lesson can start a good conversation — bring it to a meetup.",
                  "No necesitas un producto terminado. Una pregunta clara, una prueba honesta y un aprendizaje útil pueden iniciar una buena conversación; tráelo a un encuentro.",
                ),
              )}
            </p>
            <a href={MEETUP_URL} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6">
              {t(L("Find the next meetup", "Busca el próximo encuentro"))}
            </a>
          </div>
          <ol className="grid gap-6">
            {notes.map((n, i) => (
              <li
                key={n.title.en}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-border pt-5"
              >
                <span className="font-display text-lg font-semibold text-primary">0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">{t(n.title)}</h3>
                  <p className="body-copy mt-1.5">{t(n.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="team-h">
        <div className="shell">
          <div className="rule mb-8" />
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <h2 id="team-h" className="font-display text-xl font-semibold">
                {t(L("Around the team", "Más del equipo"))}
              </h2>
              <p className="body-copy mt-1 max-w-2xl text-[0.975rem]">
                {t(
                  L(
                    "Related team sites with their own services and scope, separate from the WGN project notebook.",
                    "Sitios relacionados del equipo, cada uno con sus servicios y alcance, distintos del cuaderno de proyectos de WGN.",
                  ),
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="btn btn-ghost btn-sm"
                href="https://automatewithgus.com/"
                target="_blank"
                rel="noreferrer"
              >
                Automate With Gus
              </a>
              <a
                className="btn btn-ghost btn-sm"
                href="https://aienablementworks.com/"
                target="_blank"
                rel="noreferrer"
              >
                AI Enablement Works
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
