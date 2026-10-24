import { useLocale } from "@/lib/locale-context";
import type { Localized } from "@/content/types";
import { PageIntro } from "./ui";

export function LegalPage({
  eyebrow,
  title,
  lead,
  sections,
}: {
  eyebrow: Localized;
  title: Localized;
  lead: Localized;
  sections: { h: Localized; p: Localized }[];
}) {
  const { t } = useLocale();
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={t(title)} lead={lead} />
      <section className="section pt-2">
        <div className="shell">
          <div className="max-w-[46rem] divide-y divide-border border-y border-border">
            {sections.map((s) => (
              <div
                key={s.h.en}
                className="grid gap-2 py-7 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8"
              >
                <h2 className="font-display text-lg font-semibold">{t(s.h)}</h2>
                <p className="body-copy">{t(s.p)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
