import type { EventRecord, Locale, Localized } from "./types";
import { workshop } from "./workshop-data";
import heroImg from "@/assets/wgn-hero-1536.webp.asset.json";
import logoImg from "@/assets/wgn-logo-256.webp.asset.json";
import cover1672 from "@/assets/workshop-cover-1672.webp.asset.json";
import cover900 from "@/assets/workshop-cover-900.webp.asset.json";
import hands1280 from "@/assets/workshop-hands-on-1280.webp.asset.json";
import hands768 from "@/assets/workshop-hands-on-768.webp.asset.json";
import demo1280 from "@/assets/community-live-demo-1280.webp.asset.json";
import demo768 from "@/assets/community-live-demo-768.webp.asset.json";
import careers1280 from "@/assets/careers-builders-1280.webp.asset.json";
import careers768 from "@/assets/careers-builders-768.webp.asset.json";
import prompts1280 from "@/assets/prompt-library-1280.webp.asset.json";
import prompts768 from "@/assets/prompt-library-768.webp.asset.json";
import projects1280 from "@/assets/project-sharing-1280.webp.asset.json";
import projects768 from "@/assets/project-sharing-768.webp.asset.json";
import about1280 from "@/assets/learn-build-share-connect-1280.webp.asset.json";
import about768 from "@/assets/learn-build-share-connect-768.webp.asset.json";

export const SITE_NAME = "We've Got Now";
export const EVENT_SERIES = "AI Tools Explorers Night";
export const MEETUP_URL = "https://www.meetup.com/weve_got_now/";
export const LINKEDIN_URL = "https://www.linkedin.com/company/ai-tools-explorers-night/";
export const CONTACT_EMAIL = "hello@aitoolsexplorers.com";

export type Picture = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: Localized;
};

export const logo = { src: logoImg.url, width: 256, height: 256 };

// Alt text describes conceptual artwork truthfully; it never claims to show real attendees or venues.
export const images = {
  hero: {
    src: heroImg.url,
    width: 1536,
    height: 1024,
    alt: {
      en: "Illustrated night skyline in neon blue and pink with a hooded figure pointing toward the city and the We've Got Now wordmark.",
      es: "Ilustración de una ciudad nocturna en azul y rosa neón con una figura señalando hacia la ciudad y el logotipo de We've Got Now.",
    },
  },
  workshopCover: {
    src: cover1672.url,
    srcSet: `${cover900.url} 900w, ${cover1672.url} 1672w`,
    width: 1672,
    height: 941,
    alt: {
      en: workshop.en.metadata.social_image_alt,
      es: workshop.es.metadata.social_image_alt,
    },
  },
  workshops: {
    src: hands1280.url,
    srcSet: `${hands768.url} 768w, ${hands1280.url} 1280w`,
    width: 1280,
    height: 720,
    alt: {
      en: "Concept illustration of three learners working together with a laptop and notebook at night.",
      es: "Ilustración conceptual de tres personas aprendiendo juntas con una laptop y un cuaderno de noche.",
    },
  },
  events: {
    src: demo1280.url,
    srcSet: `${demo768.url} 768w, ${demo1280.url} 1280w`,
    width: 1280,
    height: 720,
    alt: {
      en: "Concept illustration of a presenter demonstrating an idea to a small group at night.",
      es: "Ilustración conceptual de una presentadora mostrando una idea a un grupo pequeño de noche.",
    },
  },
  careers: {
    src: careers1280.url,
    srcSet: `${careers768.url} 768w, ${careers1280.url} 1280w`,
    width: 1280,
    height: 720,
    alt: {
      en: "Concept illustration of three collaborators discussing a prototype beside a laptop.",
      es: "Ilustración conceptual de tres personas colaborando en un prototipo junto a una laptop.",
    },
  },
  prompts: {
    src: prompts1280.url,
    srcSet: `${prompts768.url} 768w, ${prompts1280.url} 1280w`,
    width: 1280,
    height: 720,
    alt: {
      en: "Concept illustration of a laptop and a planning notebook in a neon-lit workspace.",
      es: "Ilustración conceptual de una laptop y un cuaderno de planificación en un espacio con luz de neón.",
    },
  },
  projects: {
    src: projects1280.url,
    srcSet: `${projects768.url} 768w, ${projects1280.url} 1280w`,
    width: 1280,
    height: 720,
    alt: {
      en: "Concept illustration of three collaborators sharing a project around a laptop.",
      es: "Ilustración conceptual de tres personas compartiendo un proyecto alrededor de una laptop.",
    },
  },
  about: {
    src: about1280.url,
    srcSet: `${about768.url} 768w, ${about1280.url} 1280w`,
    width: 1280,
    height: 720,
    alt: {
      en: "Concept illustration of four people collaborating around a table beneath a neon skyline.",
      es: "Ilustración conceptual de cuatro personas colaborando en una mesa frente a una ciudad iluminada con neón.",
    },
  },
} satisfies Record<string, Picture>;

export const WORKSHOP_SLUG = "build-your-first-ai-automation-2026-11-08";
export const REGISTER_URL = workshop.links.primary;
export const WORKSHOP_MEETUP_URL = workshop.links.secondary;

export type SiteEvent = EventRecord & { image?: Picture; host?: string };

// Visible titles carry no dates — the canonical dateStart is shown once as metadata.
export const events: SiteEvent[] = [
  {
    slug: WORKSHOP_SLUG,
    type: "workshop",
    status: "upcoming",
    title: { en: workshop.en.title, es: workshop.es.title },
    summary: { en: workshop.en.short_description, es: workshop.es.short_description },
    dateStart: workshop.event.start_iso,
    dateEnd: workshop.event.end_iso,
    timezone: "America/New_York",
    venue: { en: "Reston, Virginia", es: "Reston, Virginia" },
    address: "1920 Association Dr, Reston, VA 20191",
    rsvpUrl: workshop.links.secondary,
    source: "signed-off workshop brief 2026-10-21",
    reviewedAt: "2026-10-22",
    image: images.workshopCover,
    host: workshop.event.host,
  },
  {
    slug: "ai-tools-explorers-night-april-22-2026",
    type: "meetup",
    status: "past",
    title: { en: EVENT_SERIES, es: EVENT_SERIES },
    summary: {
      en: "A builder-focused meetup for students, founders and curious operators exploring practical AI tools, workflows and automation.",
      es: "Un encuentro para estudiantes, fundadores y personas curiosas que exploran herramientas, flujos y automatización con IA.",
    },
    dateStart: "2026-04-22T18:00:00-04:00",
    dateEnd: "2026-04-22T20:00:00-04:00",
    timezone: "America/New_York",
    venue: { en: "Aslin Beer Company — Herndon", es: "Aslin Beer Company — Herndon" },
    address: "767 Elden St, Herndon, VA",
    rsvpUrl: "https://meetu.ps/e/PVW3M/1dT7c7/i",
    image: images.hero,
    source: "legacy WGN event record at baseline 7dfd583",
    reviewedAt: "2026-10-14",
  },
  {
    slug: "ai-tools-explorers-night-april-1-2026",
    type: "meetup",
    status: "past",
    title: { en: EVENT_SERIES, es: EVENT_SERIES },
    summary: {
      en: "An evening of practical AI conversations, demonstrations and builder-focused discussion.",
      es: "Una noche de conversaciones prácticas, demostraciones y diálogo entre personas que crean con IA.",
    },
    dateStart: "2026-04-01T18:00:00-04:00",
    dateEnd: null,
    timezone: "America/New_York",
    venue: { en: "Aslin Beer Company — Herndon", es: "Aslin Beer Company — Herndon" },
    address: "767 Elden St, Herndon, VA",
    rsvpUrl: null,
    image: images.hero,
    source: "legacy WGN event record at baseline 7dfd583",
    reviewedAt: "2026-10-14",
  },
];

/** Old placeholder event slugs that now point somewhere real. */
export const legacyEventSlugs: Record<string, string> = { "ai-workshops": WORKSHOP_SLUG };

export function eventPhase(e: EventRecord, now = new Date()): "upcoming" | "past" {
  const end = e.dateEnd ?? e.dateStart;
  if (!end) return e.status === "past" ? "past" : "upcoming";
  return new Date(end).getTime() < now.getTime() ? "past" : "upcoming";
}

export function upcomingEvents(now = new Date()) {
  return events
    .filter((e) => eventPhase(e, now) === "upcoming" && e.dateStart)
    .sort((a, b) => +new Date(a.dateStart ?? 0) - +new Date(b.dateStart ?? 0));
}

export function pastEvents(now = new Date()) {
  return events
    .filter((e) => eventPhase(e, now) === "past")
    .sort((a, b) => +new Date(b.dateStart ?? 0) - +new Date(a.dateStart ?? 0));
}

const tz = "America/New_York";
const intl = (l: Locale) => (l === "en" ? "en-US" : "es-US");

export function formatDate(iso: string, l: Locale, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat(intl(l), {
    timeZone: tz,
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  }).format(new Date(iso));
}

export function formatTimeRange(start: string, end: string | null, l: Locale) {
  const f = new Intl.DateTimeFormat(intl(l), { timeZone: tz, hour: "numeric", minute: "2-digit" });
  const s = f.format(new Date(start));
  const label = l === "en" ? "ET" : "hora del Este";
  return end ? `${s} – ${f.format(new Date(end))} ${label}` : `${s} ${label}`;
}

export function dateParts(iso: string, l: Locale) {
  const d = new Date(iso);
  const p = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(intl(l), { timeZone: tz, ...o }).format(d);
  return {
    month: p({ month: "short" }).replace(".", ""),
    day: p({ day: "numeric" }),
    year: p({ year: "numeric" }),
    weekday: p({ weekday: "long" }),
  };
}
