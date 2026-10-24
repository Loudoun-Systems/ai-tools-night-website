import { useRef, useState } from "react";
import { useLocale, L } from "@/lib/locale-context";
import { brands } from "@/content/brands";
import { promptFamilies } from "@/content/prompt-families";
import { External } from "./ui";
import { Control } from "./Control";

export function BrandPanels({ onPickFamily }: { onPickFamily: (key: string) => void }) {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const brand = brands[active]!;
  return (
    <section className="pb-16" aria-labelledby="brands-h">
      <div className="shell">
        <h2 id="brands-h" className="sr-only">
          {t(L("Our brands", "Nuestras marcas"))}
        </h2>
        <p className="body-copy max-w-2xl">
          {t(
            L(
              "Teams from our wider circle that work on practical AI. The prompt workflows remain WGN community resources.",
              "Equipos de nuestro círculo que trabajan con IA práctica. Los flujos de prompts siguen siendo recursos de la comunidad WGN.",
            ),
          )}
        </p>
        <div className="brand-layout mt-6">
          <div
            role="tablist"
            aria-label={t(L("Our brands", "Nuestras marcas"))}
            aria-orientation="vertical"
            className="brand-tabs"
          >
            {brands.map((b, i) => (
              <button
                key={b.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`brand-tab-${b.key}`}
                aria-controls={`brand-panel-${b.key}`}
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                className="brand-tab"
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
                  if (!keys.includes(e.key)) return;
                  e.preventDefault();
                  const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
                  const next = (i + dir + brands.length) % brands.length;
                  setActive(next);
                  tabs.current[next]?.focus();
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={`brand-panel-${brand.key}`}
            aria-labelledby={`brand-tab-${brand.key}`}
            className="brand-panel"
          >
            <p className="eyebrow">{brand.host}</p>
            <h3 className="display-3 mt-3 gradient-heading">{brand.name}</h3>
            <p className="lede mt-4 max-w-xl">{t(brand.summary)}</p>
            <External href={brand.url} className="btn btn-primary mt-6">
              {t(L(`Visit ${brand.name}`, `Visitar ${brand.name}`))} ↗
            </External>
            {brand.relatedFamilies.length > 0 && (
              <div className="mt-8 border-t border-border pt-5">
                <p className="text-sm font-semibold">
                  {t(L("Relevant tasks in the library", "Tareas relacionadas en la guía"))}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {brand.relatedFamilies.map((k) => {
                    const fam = promptFamilies.find((f) => f.key === k);
                    if (!fam) return null;
                    return (
                      <Control
                        key={k}
                        className="btn btn-ghost btn-sm"
                        onClick={() => onPickFamily(k)}
                      >
                        {t(fam.label)} →
                      </Control>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
