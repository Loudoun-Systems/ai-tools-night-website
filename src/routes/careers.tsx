import { siteUrl } from "@/content/published-site";
import { createFileRoute } from "@tanstack/react-router";
import { useLocale, L } from "@/lib/locale-context";
import { tracks } from "@/content/prompts-tracks";
import { images, LINKEDIN_URL, MEETUP_URL } from "@/content/site";
import type { Localized } from "@/content/types";
import { Img, PageIntro } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Contribution Paths | We've Got Now" },
      {
        name: "description",
        content:
          "Explore practical roles, skills and ways to contribute across web, AI automation, content, community and research. Learning paths, not paid job openings.",
      },
      { property: "og:title", content: "Find your way into building — We've Got Now" },
      {
        property: "og:description",
        content: "Five contribution paths with skills to practice and a starter project for each.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/careers") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/careers") }],
  }),
  component: CareersPage,
});

const paths: Record<string, { skills: Localized; project: Localized; question: Localized }> = {
  "web-app": {
    skills: L(
      "Clear page structure, accessible interactions, version control, and testing a real visitor task.",
      "Estructura clara de páginas, interacciones accesibles, control de versiones y pruebas de tareas reales.",
    ),
    project: L(
      "Build a small event page with a usable mobile menu, bilingual copy, and honest pending states. Explain how you tested it.",
      "Crea una página de evento con menú móvil usable, textos bilingües y estados pendientes honestos. Explica cómo la probaste.",
    ),
    question: L(
      "Can another person use what I built without an explanation?",
      "¿Otra persona puede usar lo que creé sin una explicación?",
    ),
  },
  "ai-automation": {
    skills: L(
      "Mapping a process, structured inputs, clear handoffs, failure handling, and documenting what the workflow changes.",
      "Mapeo de procesos, datos estructurados, entregas claras, manejo de errores y documentación de los cambios del flujo.",
    ),
    project: L(
      "Map a repetitive task from trigger to result. Prototype it with sample data and show the failure path as well as the happy path.",
      "Mapea una tarea repetitiva desde el inicio hasta el resultado. Crea un prototipo con datos de ejemplo y muestra el manejo de errores.",
    ),
    question: L(
      "What happens when an input is missing or a service fails?",
      "¿Qué ocurre si falta un dato o falla un servicio?",
    ),
  },
  "content-media": {
    skills: L(
      "Audience awareness, storytelling, visual hierarchy, editing, and a repeatable review process.",
      "Conocimiento de la audiencia, narrativa, jerarquía visual, edición y un proceso de revisión repetible.",
    ),
    project: L(
      "Turn one practical idea into a short explainer and a matching visual. Include the source, the intended audience, and your editing choices.",
      "Convierte una idea práctica en una explicación breve y una imagen. Incluye la fuente, la audiencia y tus decisiones de edición.",
    ),
    question: L(
      "What should the viewer understand or do after seeing this?",
      "¿Qué debería entender o hacer la persona después de verlo?",
    ),
  },
  "community-events": {
    skills: L(
      "Welcoming communication, event checklists, accessible materials, logistics, and respectful follow-up.",
      "Comunicación acogedora, listas de preparación, materiales accesibles, logística y seguimiento respetuoso.",
    ),
    project: L(
      "Prepare a small meetup runbook: arrival, introductions, a demo, questions, and follow-up. Identify which details still need an owner.",
      "Prepara una guía para un encuentro: llegada, presentaciones, demo, preguntas y seguimiento. Indica qué detalles necesitan una persona responsable.",
    ),
    question: L(
      "Would someone coming for the first time know what to expect?",
      "¿Alguien que viene por primera vez sabría qué esperar?",
    ),
  },
  "research-enablement": {
    skills: L(
      "Finding primary sources, comparing evidence, teaching one task clearly, and recording what remains uncertain.",
      "Buscar fuentes originales, comparar evidencia, enseñar una tarea con claridad y registrar lo que sigue sin confirmarse.",
    ),
    project: L(
      "Write a practical learning guide for one task. Include a worked example, a check for understanding, sources, and a way to spot mistakes.",
      "Escribe una guía práctica para una tarea. Incluye un ejemplo, una pregunta de comprensión, fuentes y una forma de detectar errores.",
    ),
    question: L(
      "Can a beginner repeat this and check their own result?",
      "¿Una persona principiante puede repetirlo y comprobar su resultado?",
    ),
  },
};

function CareersPage() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        eyebrow={L("Careers & contribution", "Carreras y colaboración")}
        title={t(L("Find your way into building.", "Encuentra tu forma de crear."))}
        lead={L(
          "Explore practical roles, skills and ways to contribute across technology, creativity and community.",
          "Explora roles, habilidades y formas de aportar desde la tecnología, la creatividad y la comunidad.",
        )}
        aside={
          <div className="frame aspect-[3/2]">
            <Img pic={images.careers} eager sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        }
      >
        <p className="mt-6 text-sm text-muted-foreground">
          {t(
            L(
              "These are learning and contribution areas, not confirmed paid job openings.",
              "Estas son áreas de aprendizaje y colaboración; no son vacantes remuneradas confirmadas.",
            ),
          )}
        </p>
      </PageIntro>

      <section className="section pt-6" aria-labelledby="paths-h">
        <div className="shell">
          <h2 id="paths-h" className="display-2">
            {t(L("Five paths to practice.", "Cinco caminos para practicar."))}
          </h2>
          <ol className="mt-8 border-t border-border">
            {tracks.map((tr, i) => {
              const p = paths[tr.id];
              return (
                <li
                  key={tr.id}
                  className="grid gap-6 border-b border-border py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14"
                >
                  <div>
                    <p className="font-display text-sm font-semibold text-muted-foreground">
                      0{i + 1}
                    </p>
                    <h3 className="display-3 mt-1">{t(tr.title)}</h3>
                    <p className="body-copy mt-3">{t(tr.build)}</p>
                    {p && (
                      <p className="mt-4 font-display text-lg italic text-primary">
                        “{t(p.question)}”
                      </p>
                    )}
                  </div>
                  {p && (
                    <dl className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-semibold">
                          {t(L("Skills to practice", "Habilidades para practicar"))}
                        </dt>
                        <dd className="body-copy mt-1.5 text-[0.975rem]">{t(p.skills)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-semibold">
                          {t(L("A starter project", "Un proyecto inicial"))}
                        </dt>
                        <dd className="body-copy mt-1.5 text-[0.975rem]">{t(p.project)}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-semibold">
                          {t(L("What to share", "Qué compartir"))}
                        </dt>
                        <dd className="body-copy mt-1.5 text-[0.975rem]">{t(tr.share)}</dd>
                      </div>
                    </dl>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="join-h">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2 id="join-h" className="display-2 gradient-heading">
              {t(L("Tell us where you want to grow.", "Cuéntanos dónde quieres crecer."))}
            </h2>
            <p className="body-copy mt-4">
              {t(
                L(
                  "Share the path that interests you and how you would like to contribute. Organizers review every message and can tell you where help is useful right now. No resume upload needed.",
                  "Comparte el camino que te interesa y cómo te gustaría aportar. Las personas organizadoras revisan cada mensaje y te dirán dónde se necesita ayuda ahora. No necesitas subir tu currículum.",
                ),
              )}
            </p>
            <p className="body-copy mt-4">
              {t(
                L(
                  "You can also come to a meetup or follow our LinkedIn page.",
                  "También puedes venir a un encuentro o seguir nuestra página de LinkedIn.",
                ),
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn btn-ghost btn-sm"
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
          <div className="surface p-6 sm:p-8">
            <InquiryForm kinds={["careers"]} initial="careers" />
          </div>
        </div>
      </section>
    </>
  );
}
