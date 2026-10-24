import { siteUrl } from "@/content/published-site";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Bookmark, BookmarkCheck, Copy, RotateCcw } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import { prompts } from "@/content/prompts-tracks";
import { difficultyLabel, relatedPrompts } from "@/content/prompt-helpers";
import { Control } from "@/components/site/Control";
import { useSavedPrompts } from "@/lib/saved-prompts";

export const Route = createFileRoute("/prompt-library/$slug")({
  loader: ({ params }) => {
    const prompt = prompts.find((p) => p.slug === params.slug);
    if (!prompt) throw notFound();
    return { slug: prompt.slug };
  },
  head: ({ params, loaderData }) => {
    const p = prompts.find((x) => x.slug === loaderData?.slug);
    if (!p)
      return {
        meta: [
          { title: "Prompt not found | We've Got Now" },
          { name: "robots", content: "noindex" },
        ],
      };
    const url = `/prompt-library/${params.slug}`;
    return {
      meta: [
        { title: `${p.title.en} — Prompt Library | We've Got Now` },
        { name: "description", content: p.usefulFor.en },
        { property: "og:title", content: p.title.en },
        { property: "og:description", content: p.usefulFor.en },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: siteUrl(url) },
      ],
      links: [{ rel: "canonical", href: siteUrl(url) }],
    };
  },
  component: PromptDetail,
});

const slugs = prompts.map((p) => p.slug);

function PromptDetail() {
  const { slug } = Route.useLoaderData();
  const prompt = prompts.find((p) => p.slug === slug) ?? prompts[0];
  const { t, locale, drafts, setDraft } = useLocale();
  const key = `${prompt?.slug ?? slug}:${locale}`;
  const value = drafts[key] ?? prompt?.prompt[locale] ?? "";
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const editor = useRef<HTMLTextAreaElement>(null);
  const { saved, toggle, status } = useSavedPrompts(slugs);
  const isSaved = saved.includes(prompt?.slug ?? slug);
  const inputs = prompt?.inputs ?? [
    {
      en: "Your task, relevant context and the constraints that matter.",
      es: "Tu tarea, el contexto relevante y las restricciones importantes.",
    },
  ];
  const related = prompt ? relatedPrompts(prompt) : [];

  useEffect(() => setCopyState("idle"), [locale, prompt?.slug]);

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("no clipboard");
      await navigator.clipboard.writeText(value);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
      editor.current?.focus();
      editor.current?.select();
    }
  }

  if (!prompt) return null;
  return (
    <>
      <section className="glow-hero">
        <div className="shell pb-8 pt-8 md:pt-10">
          <Link to="/prompt-library" className="text-link text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden /> {t(L("All prompts", "Todos los prompts"))}
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow">{t(prompt.category)}</p>
              <h1 className="display-2 mt-4">{t(prompt.title)}</h1>
            </div>
            <div>
              <p className="lede">{t(prompt.usefulFor)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="pill">{t(difficultyLabel(prompt))}</span>
                <span className="pill">EN + ES</span>
                {prompt.tags?.map((tag) => (
                  <span key={tag} className="pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12">
          <div className="surface min-w-0 p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="display-3">
                  {t(L("Your working copy.", "Tu borrador de trabajo."))}
                </h2>
                <p className="body-copy mt-2 max-w-[60ch] text-[0.975rem]">
                  {t(
                    L(
                      "Replace the bracketed inputs, adjust the brief, then copy it into the AI tool you use. Your edits stay here while the site is open, separately for English and Spanish.",
                      "Reemplaza los datos entre corchetes, ajusta las instrucciones y copia el texto en tu herramienta de IA. Tus cambios se conservan mientras el sitio esté abierto, por separado en inglés y español.",
                    ),
                  )}
                </p>
              </div>
              <Control
                type="button"
                className="btn btn-ghost btn-sm"
                aria-pressed={isSaved}
                onClick={() => toggle(prompt.slug)}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" aria-hidden />
                ) : (
                  <Bookmark className="h-4 w-4" aria-hidden />
                )}
                {isSaved ? t(L("Saved", "Guardado")) : t(L("Save", "Guardar"))}
              </Control>
            </div>
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-semibold">
                {t(L("Editable prompt text", "Texto editable del prompt"))}
              </span>
              <textarea
                ref={editor}
                className="field editor"
                value={value}
                lang={locale}
                spellCheck={false}
                onChange={(e) => {
                  setDraft(key, e.target.value);
                  setCopyState("idle");
                }}
              />
            </label>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Control type="button" className="btn btn-primary" onClick={copy}>
                <Copy className="h-4 w-4" aria-hidden />
                {copyState === "copied"
                  ? t(L("Copied", "Copiado"))
                  : t(L("Copy prompt", "Copiar prompt"))}
              </Control>
              <Control
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setDraft(key, undefined);
                  setCopyState("idle");
                }}
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                {t(L("Reset", "Restablecer"))}
              </Control>
              <span role="status" className="text-sm text-muted-foreground">
                {copyState === "copied"
                  ? t(L("Prompt copied.", "Prompt copiado."))
                  : status === "saved"
                    ? t(L("Saved on this device.", "Guardado en este dispositivo."))
                    : status === "removed"
                      ? t(L("Removed from saved.", "Quitado de guardados."))
                      : t(L("Not sent to a model.", "No se envía a un modelo."))}
              </span>
            </div>
            {copyState === "failed" && (
              <p role="alert" className="mt-4 rounded-lg border border-pink/50 px-4 py-3 text-sm">
                {t(
                  L(
                    "Clipboard access was blocked. The text is selected; copy it manually with your keyboard or device menu.",
                    "El portapapeles está bloqueado. El texto está seleccionado; cópialo con el teclado o el menú del dispositivo.",
                  ),
                )}
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-destructive/50 px-4 py-3 text-sm text-destructive"
              >
                {t(
                  L(
                    "This browser blocked saving, so the bookmark was not kept.",
                    "Este navegador bloqueó el guardado, así que el marcador no se conservó.",
                  ),
                )}
              </p>
            )}
          </div>

          <aside className="grid content-start gap-8">
            <div>
              <h2 className="text-sm font-semibold text-primary">
                {t(L("The intended result", "El resultado buscado"))}
              </h2>
              <p className="mt-2 font-display text-xl font-semibold leading-snug">
                {prompt.outcome
                  ? t(prompt.outcome)
                  : t(
                      L(
                        "A useful result begins with useful context.",
                        "Un resultado útil empieza con buen contexto.",
                      ),
                    )}
              </p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">
                {t(L("Have these ready", "Ten esto a mano"))}
              </h2>
              <ul className="mt-3 grid gap-2">
                {inputs.map((i) => (
                  <li key={i.en} className="flex gap-3 text-[0.975rem] text-muted-foreground">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    {t(i)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">
                {t(L("Before you use the output", "Antes de usar el resultado"))}
              </h2>
              <ol className="mt-3 grid list-decimal gap-2 pl-5 text-[0.975rem] text-muted-foreground marker:text-primary">
                <li>
                  {t(
                    L(
                      "Compare it with your original task and constraints.",
                      "Compáralo con tu tarea y tus restricciones.",
                    ),
                  )}
                </li>
                <li>
                  {t(
                    L(
                      "Check sources, assumptions and any missing information.",
                      "Revisa las fuentes, los supuestos y la información que falta.",
                    ),
                  )}
                </li>
                <li>
                  {t(
                    L(
                      "Keep decisions and final approval with a person.",
                      "Mantén las decisiones y la aprobación final en manos de una persona.",
                    ),
                  )}
                </li>
              </ol>
            </div>
            <details className="surface group p-5">
              <summary className="cursor-pointer font-display font-semibold">
                {t(L("Synthetic example", "Ejemplo ficticio"))}
              </summary>
              <p className="body-copy mt-3 text-[0.95rem]">{t(prompt.example)}</p>
            </details>
            <p className="text-sm text-muted-foreground">
              {t(prompt.reviewStatus)} · {prompt.reviewedAt}
            </p>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="related-h">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-h" className="display-2">
              {t(L("Keep exploring.", "Sigue explorando."))}
            </h2>
            <Link to="/prompt-library" className="text-link">
              {t(L("Browse the collection", "Explora la colección"))}
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  to="/prompt-library/$slug"
                  params={{ slug: r.slug }}
                  className="surface lift block h-full p-6 hover:border-primary/40"
                >
                  <span className="text-sm font-semibold text-primary">{t(r.category)}</span>
                  <span className="mt-2 block font-display text-xl font-semibold leading-snug">
                    {t(r.title)}
                  </span>
                  <span className="body-copy mt-2 block text-[0.975rem]">
                    {t(r.outcome ?? r.usefulFor)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
