import { siteUrl } from "@/content/published-site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLocale, L } from "@/lib/locale-context";
import {
  dateParts,
  formatDate,
  images,
  MEETUP_URL,
  pastEvents,
  upcomingEvents,
  WORKSHOP_SLUG,
} from "@/content/site";
import { Img, Segmented } from "@/components/site/ui";
import { WorkshopFeature } from "@/components/site/workshop";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — AI Tools Explorers Night & Workshops | We've Got Now" },
      {
        name: "description",
        content:
          "What's next at We've Got Now: the November 8 Make.com workshop in Reston, plus past AI Tools Explorers Night meetups in Herndon.",
      },
      { property: "og:title", content: "Events — Good ideas. Better company." },
      {
        property: "og:description",
        content:
          "Upcoming workshops and past AI Tools Explorers Night meetups from the We've Got Now community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: siteUrl("/events") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/events") }],
  }),
  component: EventsPage,
});

type Filter = "all" | "meetup" | "workshop";

function EventsPage() {
  const { t, locale } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const shown = past.filter((e) => filter === "all" || e.type === filter);
  const count = (f: Filter) => past.filter((e) => f === "all" || e.type === f).length;

  return (
    <>
      <section className="glow-hero">
        <div className="shell grid gap-10 pb-10 pt-12 md:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="rise">
            <p className="eyebrow">
              {t(L("AI Tools Explorers Night & workshops", "AI Tools Explorers Night y talleres"))}
            </p>
            <h1 className="display-1 mt-4">
              <span className="block">{t(L("Good ideas.", "Buenas ideas."))}</span>
              <span className="phrase text-gradient">
                {t(L("Better company.", "Mejor compañía."))}
              </span>
            </h1>
            <p className="lede mt-6 max-w-xl">
              {t(
                L(
                  "Community meetups for demos, questions and practical connections — and hands-on workshops when you want to build something together.",
                  "Encuentros de la comunidad para ver demos, hacer preguntas y conectar, y talleres prácticos cuando quieras crear algo en grupo.",
                ),
              )}
            </p>
          </div>
          <div className="frame rise rise-2 aspect-[3/2]">
            <Img pic={images.events} eager sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="section pt-6" aria-labelledby="next-h">
        <div className="shell">
          <h2 id="next-h" className="display-2 mb-6">
            {t(L("What’s next", "Lo que viene"))}
          </h2>
          {upcoming.some((e) => e.slug === WORKSHOP_SLUG) ? (
            <WorkshopFeature headingLevel={3} />
          ) : (
            <div className="surface p-8">
              <p className="lede">
                {t(
                  L(
                    "The next date has not been announced.",
                    "La próxima fecha aún no se ha anunciado.",
                  ),
                )}
              </p>
              <a
                className="btn btn-primary mt-6"
                href={MEETUP_URL}
                target="_blank"
                rel="noreferrer"
              >
                {t(L("Follow on Meetup", "Síguenos en Meetup"))}
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="past-h">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 id="past-h" className="display-2">
                {t(L("Previously at WGN", "Antes en WGN"))}
              </h2>
              <p className="body-copy mt-3 max-w-xl">
                {t(
                  L(
                    "Past gatherings, newest first.",
                    "Encuentros anteriores, del más reciente al más antiguo.",
                  ),
                )}
              </p>
            </div>
            <Segmented
              label={t(L("Filter past events", "Filtrar eventos anteriores"))}
              value={filter}
              onChange={setFilter}
              options={[
                { value: "all", label: t(L("All", "Todos")), count: count("all") },
                { value: "meetup", label: t(L("Meetups", "Encuentros")), count: count("meetup") },
                {
                  value: "workshop",
                  label: t(L("Workshops", "Talleres")),
                  count: count("workshop"),
                },
              ]}
            />
          </div>

          <ol className="mt-8 border-t border-border" aria-live="polite">
            {shown.length === 0 && (
              <li className="py-8 body-copy">
                {t(
                  L(
                    "No past events of this type yet.",
                    "Aún no hay eventos anteriores de este tipo.",
                  ),
                )}
              </li>
            )}
            {shown.map((e) => {
              const d = dateParts(e.dateStart ?? "", locale);
              return (
                <li key={e.slug} className="border-b border-border">
                  <Link
                    to="/events/$slug"
                    params={{ slug: e.slug }}
                    className="archive-entry group"
                  >
                    {e.image && (
                      <div className="event-cover aspect-[3/2]">
                        <Img pic={e.image} sizes="(min-width: 768px) 280px, 100vw" />
                      </div>
                    )}
                    <time dateTime={e.dateStart ?? ""} className="row-span-2 sm:row-span-1">
                      <span className="block text-sm font-semibold uppercase tracking-wide text-primary">
                        {d.month}
                      </span>
                      <span className="block font-display text-4xl font-semibold leading-none">
                        {d.day}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{d.year}</span>
                      <span className="sr-only">{formatDate(e.dateStart ?? "", locale)}</span>
                    </time>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-primary">
                        {t(e.title)}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t(e.venue)}</p>
                      <p className="body-copy mt-2 max-w-2xl text-[0.975rem]">{t(e.summary)}</p>
                    </div>
                    <span className="pill">
                      {e.type === "meetup"
                        ? t(L("Meetup", "Encuentro"))
                        : t(L("Workshop", "Taller"))}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
