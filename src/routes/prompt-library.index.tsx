import { siteUrl } from "@/content/published-site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, BookmarkCheck, Search, SlidersHorizontal, X } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import { prompts } from "@/content/prompts-tracks";
import { useSavedPrompts } from "@/lib/saved-prompts";
import { difficultyLabel, orderedPrompts, filterPrompts } from "@/content/prompt-helpers";
import { promptFamilies, inFamily } from "@/content/prompt-families";
import { Control } from "@/components/site/Control";
import { BrandPanels } from "@/components/site/BrandPanels";

export const Route = createFileRoute("/prompt-library/")({
  head: () => ({
    meta: [
      { title: "Prompt Library — 37 Bilingual AI Workflows | We've Got Now" },
      {
        name: "description",
        content:
          "Explore 37 editable bilingual workflows for research, automation, content, product work and learning.",
      },
      { property: "og:title", content: "The WGN prompt field guide" },
      {
        property: "og:description",
        content: "Find a real task. Add your context. Make the workflow your own.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/prompt-library") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/prompt-library") }],
  }),
  component: PromptLibrary,
});
const slugs = prompts.map((p) => p.slug);
function PromptLibrary() {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [category, setCategory] = useState("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [area, setArea] = useState<"prompts" | "brands">("prompts");
  const { saved, toggle, status } = useSavedPrompts(slugs);
  const drawerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const activeFamily = promptFamilies.find((f) => f.key === family);
  const base = useMemo(
    () => filterPrompts(orderedPrompts, { query, category, savedOnly, saved, locale }),
    [query, category, savedOnly, saved, locale],
  );
  const visible = base.filter((p) => inFamily(p, family));
  const filtered = query.trim() !== "" || family !== "all" || category !== "all";
  const filterCount = Number(family !== "all") + Number(category !== "all");
  const clear = () => {
    setQuery("");
    setFamily("all");
    setCategory("all");
  };
  useEffect(() => {
    if (!drawer) return;
    const dialog = drawerRef.current;
    const previous = document.activeElement;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(false);
      }
      if (e.key === "Tab" && dialog) {
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>("button, select, [href], input"),
        ).filter((el) => !el.hasAttribute("disabled"));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [drawer]);
  const collectionIndex = (
    <>
      <p className="eyebrow mb-4">{t(L("Collections", "Colecciones"))}</p>
      <div role="group" aria-label={t(L("Collection", "Colección"))}>
        <Control
          className="collection-button"
          aria-pressed={family === "all"}
          onClick={() => {
            setFamily("all");
            setCategory("all");
          }}
        >
          <span>{t(L("All collections", "Todas las colecciones"))}</span>
          <span className="text-muted-foreground tabular-nums">{base.length}</span>
        </Control>
        {promptFamilies.map((f) => (
          <Control
            className="collection-button"
            key={f.key}
            aria-pressed={family === f.key}
            onClick={() => {
              setFamily(f.key);
              setCategory("all");
            }}
          >
            <span>{t(f.label)}</span>
            <span className="text-muted-foreground tabular-nums">
              {
                filterPrompts(orderedPrompts, {
                  query,
                  category: "all",
                  savedOnly,
                  saved,
                  locale,
                }).filter((p) => inFamily(p, f.key)).length
              }
            </span>
          </Control>
        ))}
      </div>
      {activeFamily && activeFamily.categories.length > 1 && (
        <label className="block mt-6 text-sm">
          {t(L("Category", "Categoría"))}
          <select
            aria-label={t(L("Category", "Categoría"))}
            className="field mt-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">{t(L("All categories", "Todas las categorías"))}</option>
            {activeFamily.categories.map((c) => (
              <option key={c} value={c}>
                {t(prompts.find((p) => p.category.en === c)?.category ?? L(c, c))}
              </option>
            ))}
          </select>
        </label>
      )}
    </>
  );
  return (
    <>
      <section className="prompt-heading">
        <div className="shell">
          <p className="eyebrow">
            {t(L("WGN / Field guide / 37 workflows", "WGN / Guía práctica / 37 flujos"))}
          </p>
          <h1 className="display-2 mt-3">{t(L("The prompt library.", "La guía de prompts."))}</h1>
          <p className="body-copy mt-3">
            {t(
              L(
                "Find a workflow for the work you actually want to do.",
                "Encuentra un flujo para el trabajo que quieres hacer.",
              ),
            )}
          </p>
          <div
            className="seg seg-wrap mt-6"
            role="group"
            aria-label={t(L("Library area", "Sección de la guía"))}
          >
            <Control
              className="seg-item"
              aria-pressed={area === "prompts"}
              onClick={() => setArea("prompts")}
            >
              {t(L("Prompt workflows", "Flujos de prompts"))}
            </Control>
            <Control
              className="seg-item"
              aria-pressed={area === "brands"}
              onClick={() => setArea("brands")}
            >
              {t(L("Our brands", "Nuestras marcas"))}
            </Control>
          </div>
          <div className="relative mt-6" hidden={area !== "prompts"}>
            <label className="sr-only" htmlFor="prompt-search">
              {t(L("Search prompt templates", "Buscar plantillas de prompts"))}
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <input
              id="prompt-search"
              ref={searchRef}
              type="search"
              className="field pl-12 pr-14"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(
                L("Search by task, tool or topic", "Busca por tarea, herramienta o tema"),
              )}
            />
            {query && (
              <Control
                className="absolute right-2 top-1 icon-control"
                aria-label={t(L("Clear search", "Borrar búsqueda"))}
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Control>
            )}
          </div>
        </div>
      </section>
      {area === "brands" && (
        <BrandPanels
          onPickFamily={(k) => {
            setFamily(k);
            setCategory("all");
            setArea("prompts");
          }}
        />
      )}
      <section className="pb-16" hidden={area !== "prompts"}>
        <div className="shell">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-5">
            <div
              className="flex gap-1"
              role="group"
              aria-label={t(L("Prompt view", "Vista de prompts"))}
            >
              <Control
                className="seg-item"
                aria-pressed={!savedOnly}
                onClick={() => setSavedOnly(false)}
              >
                {t(L("All prompts", "Todos"))}
                <span className="seg-count">37</span>
              </Control>
              <Control
                className="seg-item"
                aria-pressed={savedOnly}
                onClick={() => setSavedOnly(true)}
              >
                <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                {t(L("Saved", "Guardados"))}
                <span className="seg-count">{saved.length}</span>
              </Control>
            </div>
            <Control
              ref={filtersRef}
              className="filter-mobile btn btn-ghost btn-sm"
              aria-haspopup="dialog"
              aria-expanded={drawer}
              onClick={() => setDrawer(true)}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              {t(L("Filters", "Filtros"))}
              {filterCount > 0 && <span>{filterCount}</span>}
            </Control>
          </div>
          <div className="prompt-layout mt-6">
            <aside className="collection-rail">{collectionIndex}</aside>
            <div className="min-w-0">
              <div className="flex flex-wrap justify-between gap-3 text-sm text-muted-foreground mb-4">
                <p role="status">
                  {t(L(`Showing ${visible.length} of 37`, `Mostrando ${visible.length} de 37`))}
                  {family !== "all" && ` · ${t(activeFamily?.label ?? L("", ""))}`}
                  {category !== "all" &&
                    ` · ${t(prompts.find((p) => p.category.en === category)?.category ?? L(category, category))}`}
                  {query.trim() && ` · “${query.trim()}”`}
                </p>
                {filtered && (
                  <Control className="text-link" onClick={clear}>
                    {t(L("Clear filters", "Quitar filtros"))}
                  </Control>
                )}
              </div>
              {status === "error" && (
                <p role="alert" className="mb-4 text-destructive">
                  {t(
                    L(
                      "This browser blocked saving, so the bookmark was not kept. You can still open and copy prompts.",
                      "Este navegador bloqueó el guardado; el marcador no se conservó. Puedes abrir y copiar prompts.",
                    ),
                  )}
                </p>
              )}
              {visible.length === 0 ? (
                <div className="py-10 border-t border-border">
                  <h2 className="display-3">
                    {savedOnly && saved.length === 0
                      ? t(L("Your field guide starts here.", "Tu guía empieza aquí."))
                      : t(L("No matching workflows.", "No hay flujos que coincidan."))}
                  </h2>
                  <p className="body-copy mt-3">
                    {savedOnly && saved.length === 0
                      ? t(L("No prompts saved yet.", "Aún no hay prompts guardados."))
                      : t(
                          L(
                            "Try another word or clear the filters.",
                            "Prueba otra palabra o elimina los filtros.",
                          ),
                        )}
                  </p>
                </div>
              ) : (
                <ol>
                  {visible.map((p, i) => {
                    const isSaved = saved.includes(p.slug);
                    return (
                      <li key={p.slug} className="prompt-result">
                        <span className="prompt-result-number" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs text-primary font-semibold mb-2">
                            {t(p.category)} / {t(difficultyLabel(p))}
                          </p>
                          <h2 className="prompt-result-title">
                            <Link
                              to="/prompt-library/$slug"
                              params={{ slug: p.slug }}
                              className="hover:text-primary transition-colors"
                            >
                              {t(p.title)}
                            </Link>
                          </h2>
                          <p className="body-copy mt-3 text-[0.975rem] max-w-[65ch]">
                            {t(p.outcome ?? p.usefulFor)}
                          </p>
                        </div>
                        <div className="prompt-result-actions">
                          <Link
                            className="btn btn-ghost btn-sm"
                            to="/prompt-library/$slug"
                            params={{ slug: p.slug }}
                            aria-label={`${t(L("Open", "Abrir"))}: ${t(p.title)}`}
                          >
                            {t(L("Open", "Abrir"))}
                          </Link>
                          <Control
                            className="icon-control"
                            aria-pressed={isSaved}
                            aria-label={`${isSaved ? t(L("Remove from saved", "Quitar de guardados")) : t(L("Save", "Guardar"))}: ${t(p.title)}`}
                            title={t(L("Save prompt", "Guardar prompt"))}
                            onClick={() => toggle(p.slug)}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                            ) : (
                              <Bookmark className="h-5 w-5" aria-hidden="true" />
                            )}
                          </Control>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>
      {drawer && (
        <div
          className="filter-sheet"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDrawer(false);
          }}
        >
          <div
            className="filter-sheet-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
            ref={drawerRef}
          >
            <div className="flex justify-between items-center gap-4 mb-8">
              <h2 id="filter-title" className="text-xl">
                {t(L("Filters", "Filtros"))}
              </h2>
              <Control
                className="icon-control"
                aria-label={t(L("Close filters", "Cerrar filtros"))}
                onClick={() => setDrawer(false)}
              >
                <X className="h-5 w-5" />
              </Control>
            </div>
            {collectionIndex}
            <Control className="btn btn-primary mt-8 w-full" onClick={() => setDrawer(false)}>
              {t(L(`Show ${visible.length} prompts`, `Ver ${visible.length} prompts`))}
            </Control>
          </div>
        </div>
      )}
    </>
  );
}
