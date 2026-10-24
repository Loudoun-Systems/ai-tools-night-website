import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import { useWorkshopCopy } from "@/lib/workshop-copy";
import { REGISTER_URL, WORKSHOP_MEETUP_URL, WORKSHOP_SLUG, images } from "@/content/site";
import { Img } from "./ui";

export function RegisterActions({
  showDetails = false,
  size = "",
}: {
  showDetails?: boolean;
  size?: string;
}) {
  const { t } = useLocale();
  const w = useWorkshopCopy();
  const nt = t(L(" (opens in a new tab)", " (se abre en una pestaña nueva)"));
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a className={`btn btn-primary ${size}`} href={REGISTER_URL} target="_blank" rel="noreferrer">
        {w.primary_cta}
        <span className="sr-only">{nt}</span>
      </a>
      <a
        className={`btn btn-ghost ${size}`}
        href={WORKSHOP_MEETUP_URL}
        target="_blank"
        rel="noreferrer"
      >
        {w.secondary_cta}
        <span className="sr-only">{nt}</span>
      </a>
      {showDetails && (
        <Link to="/events/$slug" params={{ slug: WORKSHOP_SLUG }} className="text-link ml-1">
          {t(L("Workshop details", "Detalles del taller"))}
        </Link>
      )}
    </div>
  );
}

/** Image-led feature of the confirmed workshop, used on home, workshops and events. */
export function WorkshopFeature({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const { t } = useLocale();
  const w = useWorkshopCopy();
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="workshop-ticket overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Link
          to="/events/$slug"
          params={{ slug: WORKSHOP_SLUG }}
          className="zoom-img relative block aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-full"
          tabIndex={-1}
          aria-hidden
        >
          <Img
            pic={images.workshopCover}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Link>
        <div className="ticket-stub flex min-w-0 flex-col gap-5 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="pill pill-live">{t(L("What’s next", "Lo que viene"))}</span>
            <span className="pill pill-free">
              {t(L("Free first pilot", "Primera sesión piloto gratuita"))}
            </span>
          </div>
          <H className="display-3">
            <Link
              to="/events/$slug"
              params={{ slug: WORKSHOP_SLUG }}
              className="transition-colors hover:text-primary"
            >
              {w.home_card.title}
            </Link>
          </H>
          <p className="font-display text-lg text-gradient font-semibold">{w.tagline}</p>
          <dl className="grid gap-2.5 text-[0.975rem]">
            <div className="flex gap-3">
              <dt className="sr-only">{t(L("Date", "Fecha"))}</dt>
              <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <dd>{w.home_card.date_time}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="sr-only">{t(L("Location", "Lugar"))}</dt>
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <dd>1920 Association Dr, Reston, VA 20191</dd>
            </div>
          </dl>
          <p className="body-copy">{w.home_card.summary}</p>
          <div className="mt-auto pt-2">
            <RegisterActions showDetails size="btn-sm" />
          </div>
        </div>
      </div>
    </article>
  );
}
