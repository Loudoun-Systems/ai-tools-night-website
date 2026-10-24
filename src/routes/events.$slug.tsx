import { siteUrl } from "@/content/published-site";
import { useWorkshopCopy } from "@/lib/workshop-copy";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MapPin, Ticket, User, Users } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import {
  events,
  eventPhase,
  formatDate,
  formatTimeRange,
  images,
  legacyEventSlugs,
  MEETUP_URL,
  REGISTER_URL,
  WORKSHOP_MEETUP_URL,
  WORKSHOP_SLUG,
  type SiteEvent,
} from "@/content/site";
import { workshop } from "@/content/workshop-data";
import { WORKSHOP_SOCIAL_URL } from "@/content/published-site";
import { Img } from "@/components/site/ui";
import { BirthdayFlow } from "@/components/site/BirthdayFlow";
import { RegisterActions } from "@/components/site/workshop";

export const Route = createFileRoute("/events/$slug")({
  beforeLoad: ({ params }) => {
    const target = legacyEventSlugs[params.slug];
    if (target) throw redirect({ to: "/events/$slug", params: { slug: target }, statusCode: 301 });
  },
  loader: ({ params }) => {
    const event = events.find((e) => e.slug === params.slug);
    if (!event) throw notFound();
    return { slug: event.slug };
  },
  head: ({ params, loaderData }) => {
    const event = events.find((e) => e.slug === loaderData?.slug);
    if (!event)
      return {
        meta: [
          { title: "Event not found | We've Got Now" },
          { name: "robots", content: "noindex" },
        ],
      };
    const url = `/events/${params.slug}`;
    if (event.slug === WORKSHOP_SLUG) {
      const m = workshop.en.metadata;
      return {
        meta: [
          { title: m.title },
          { name: "description", content: m.description },
          { property: "og:title", content: workshop.en.title },
          { property: "og:description", content: m.description },
          { property: "og:image", content: WORKSHOP_SOCIAL_URL },
          { name: "twitter:image", content: WORKSHOP_SOCIAL_URL },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:url", content: siteUrl(url) },
        ],
        links: [{ rel: "canonical", href: siteUrl(url) }],
        scripts: [{ type: "application/ld+json", children: JSON.stringify(workshopJsonLd()) }],
      };
    }
    const title = `${event.title.en} — ${formatDate(event.dateStart ?? "", "en")} | We've Got Now`;
    return {
      meta: [
        { title },
        { name: "description", content: event.summary.en },
        { property: "og:title", content: title },
        { property: "og:description", content: event.summary.en },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: siteUrl(url) },
      ],
      links: [{ rel: "canonical", href: siteUrl(url) }],
    };
  },
  component: EventDetail,
});

function workshopJsonLd() {
  const e = workshop.event;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: workshop.en.title,
    image: WORKSHOP_SOCIAL_URL,
    description: workshop.en.short_description,
    startDate: e.start_iso,
    endDate: e.end_iso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: ["en", "es"],
    isAccessibleForFree: true,
    location: {
      "@type": "Place",
      name: "Reston, Virginia",
      address: {
        "@type": "PostalAddress",
        streetAddress: e.street_address,
        addressLocality: e.locality,
        addressRegion: e.region,
        postalCode: e.postal_code,
        addressCountry: e.country,
      },
    },
    organizer: { "@type": "Person", name: workshop.event.host },
    performer: [
      { "@type": "Person", name: "Gus Gonzalez" },
      { "@type": "Person", name: "Haytham" },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: REGISTER_URL,
      availability: "https://schema.org/LimitedAvailability",
      validThrough: e.start_iso,
    },
    sameAs: WORKSHOP_MEETUP_URL,
  };
}

function EventDetail() {
  const { slug } = Route.useLoaderData();
  const event = events.find((e) => e.slug === slug);
  if (!event) return null;
  return event.slug === WORKSHOP_SLUG ? <WorkshopDetail /> : <MeetupDetail event={event} />;
}

function BackLink() {
  const { t } = useLocale();
  return (
    <Link to="/events" className="text-link text-sm">
      <ArrowLeft className="h-4 w-4" aria-hidden /> {t(L("All events", "Todos los eventos"))}
    </Link>
  );
}

function WorkshopDetail() {
  const { t, locale } = useLocale();
  const w = useWorkshopCopy();
  const e = workshop.event;
  const paragraphs = w.full_description
    .split("\n\n")
    .slice(1)
    .filter((p) => !p.includes("1920 Association"));
  const [intro, ...rest] = paragraphs;
  const facts = [
    {
      icon: CalendarDays,
      label: L("Date", "Fecha"),
      value: formatDate(e.start_iso, locale, { weekday: "long" }),
    },
    {
      icon: Clock,
      label: L("Time", "Hora"),
      value: formatTimeRange(e.start_iso, e.end_iso, locale),
    },
    { icon: MapPin, label: L("Location", "Lugar"), value: "1920 Association Dr, Reston, VA 20191" },
    {
      icon: Ticket,
      label: L("Admission", "Entrada"),
      value: t(
        L(
          "Free first pilot · Space is limited",
          "Primera sesión piloto gratuita · Cupos limitados",
        ),
      ),
    },
    { icon: User, label: L("Host", "Anfitrión"), value: "Gus Gonzalez · MyGuyGus" },
    { icon: Users, label: L("Co-host", "Coanfitrión"), value: "Haytham" },
  ];

  return (
    <article>
      <header className="glow-hero">
        <div className="shell pt-8 md:pt-10">
          <BackLink />
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
            <div className="rise">
              <div className="flex flex-wrap gap-2">
                <span className="pill pill-live">{t(L("Workshop", "Taller"))}</span>
                <span className="pill pill-free">
                  {t(L("Free first pilot", "Primera sesión piloto gratuita"))}
                </span>
              </div>
              <h1 className="display-2 mt-5">{w.title}</h1>
              <p className="mt-4 font-display text-xl font-semibold text-gradient sm:text-2xl">
                {w.tagline}
              </p>
            </div>
            <p className="lede rise rise-2">{w.short_description}</p>
          </div>
          <div className="frame frame-clear rise rise-3 mt-10 aspect-[16/9]">
            <Img pic={images.workshopCover} eager sizes="(min-width: 1320px) 1240px, 100vw" />
          </div>
        </div>
      </header>

      <div className="shell section grid gap-12 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
        <div className="min-w-0">
          <p className="text-xl leading-relaxed text-foreground">{intro}</p>

          <section className="mt-12" aria-labelledby="build-h">
            <h2 id="build-h" className="display-3">
              {t(L("What you’ll build: four modules", "Lo que crearás: cuatro módulos"))}
            </h2>
            <BirthdayFlow />
          </section>

          <div className="body-copy mt-12 max-w-[68ch] text-[1.0625rem]">
            {rest.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <section className="mt-14" aria-labelledby="agenda-h">
            <h2 id="agenda-h" className="display-3">
              {t(L("Agenda", "Agenda"))}
            </h2>
            <p className="body-copy mt-2 text-sm">
              {t(L("All times Eastern.", "Todas las horas son del Este."))}
            </p>
            <ol className="mt-6 border-t border-border">
              {workshop.agenda.map((a) => (
                <li
                  key={a.time_et}
                  className="grid gap-1 border-b border-border py-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="font-semibold tabular-nums text-primary">
                    {locale === "en" ? a.time_et : a.time_et.replace(/ PM/g, " p. m.")}
                  </span>
                  <span>{a[locale]}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <div className="surface p-6 sm:p-7">
            <h2 className="font-display text-lg font-semibold">
              {t(L("Event details", "Detalles"))}
            </h2>
            <dl className="mt-5 grid gap-4">
              {facts.map((f) => (
                <div key={f.label.en} className="flex gap-3">
                  <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div className="min-w-0">
                    <dt className="text-sm text-muted-foreground">{t(f.label)}</dt>
                    <dd className="font-medium">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="rule my-6" />
            <p className="text-sm font-semibold">{t(L("What to bring", "Qué traer"))}</p>
            <p className="body-copy mt-1 text-[0.95rem]">{w.bring}</p>
            <div className="rule my-6" />
            <p className="text-[0.95rem] font-medium">{w.availability}</p>
            <div className="mt-5">
              <RegisterActions />
            </div>
            <p className="body-copy mt-4 text-sm">{w.registration_note}</p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function MeetupDetail({ event }: { event: SiteEvent }) {
  const { t, locale } = useLocale();
  const past = eventPhase(event) === "past";
  return (
    <article className="glow-hero">
      <div className="shell section">
        <BackLink />
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="pill">{t(L("Meetup", "Encuentro"))}</span>
              <span className="pill">
                {past ? t(L("Past", "Pasado")) : t(L("Upcoming", "Próximo"))}
              </span>
            </div>
            <h1 className="display-1 mt-5">{t(event.title)}</h1>
            <p className="lede mt-6 max-w-xl">{t(event.summary)}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">{t(L("Date", "Fecha"))}</dt>
                <dd className="font-medium">
                  {formatDate(event.dateStart ?? "", locale, { weekday: "long" })}
                  <br />
                  {formatTimeRange(event.dateStart ?? "", event.dateEnd, locale)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">{t(L("Venue", "Lugar"))}</dt>
                <dd className="font-medium">
                  {t(event.venue)}
                  {event.address && (
                    <>
                      <br />
                      {event.address}
                    </>
                  )}
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {event.rsvpUrl && (
                <a className="btn btn-ghost" href={event.rsvpUrl} target="_blank" rel="noreferrer">
                  {t(L("View on Meetup", "Ver en Meetup"))}
                </a>
              )}
              <a className="btn btn-primary" href={MEETUP_URL} target="_blank" rel="noreferrer">
                {t(L("Follow the community", "Sigue a la comunidad"))}
              </a>
            </div>
          </div>
          <div className="event-cover aspect-[3/2]">
            <Img pic={event.image ?? images.hero} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </div>
    </article>
  );
}
