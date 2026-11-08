// made_by: Team ChatGPT | asked_by: Haytham | project: Reston Office & AI Workshop
// source_chat: https://chatgpt.com/g/g-p-6abeece7e1308191be8ee72c8f6a3dd1/c/6ae91b70-60c4-83ea-b4f4-d0644c625813
// date: 2026-11-08 | supersedes: workshop date approved 2026-11-02
// Confirmed facts for the second free community workshop (rescheduled to December 6, 2026). Public fields only.

/** Same Meetup event rescheduled from November 15; separate from November 8 registration. */
export const NOV15_MEETUP_URL = "https://www.meetup.com/weve_got_now/events/317263389/";

export const NOV15_SLUG = "practical-ai-workshop-2026-12-06";
export const OWNED_ORIGIN = "https://wevegotnow.com";
export const NOV15_COVER_PATH = "/media/2026-11-02_workshop-cover__ChatGPT@Team-Haytham.webp";
export const NOV15_COVER_URL = `${OWNED_ORIGIN}/media/2026-11-02_workshop-social__ChatGPT@Team-Haytham.jpg`;

export const workshopNov15 = {
  event: {
    start_iso: "2026-12-06T14:00:00-05:00",
    end_iso: "2026-12-06T16:00:00-05:00",
    previous_start_iso: "2026-11-15T14:00:00-05:00",
    timezone: "America/New_York",
    street_address: "1920 Association Dr",
    locality: "Reston",
    region: "VA",
    postal_code: "20191",
    country: "US",
    host: "Gus Gonzalez / MyGuyGus",
    cohost: "Haytham",
  },
  cover: { width: 1672, height: 941 },
  en: {
    title: "Practical AI Workshop to Level Up and Get Paid",
    label: "New date · Free community session",
    tagline: "See how the tools work, then try one real task.",
    short_description:
      "A free, beginner-friendly session with Gus and Haytham: what chat assistants, browser agents and agentic workflows are, which tools our team uses for which work, and one guided practical task.",
    intro:
      "This session has moved from November 15 to December 6. Join Gus Gonzalez of MyGuyGus and co-host Haytham for a free community session in Reston. We’ll keep it practical and in plain language.",
    learn: [
      "What an LLM or chat assistant is, what a browser agent does, and what makes a workflow agentic",
      "Which tools our team uses for which kind of work, shown live",
      "One practical task, guided step by step",
      "A short look at a video-production workflow",
      "A brief explanation of the real problems our products and services address",
      "Time for questions and networking",
    ],
    date_time: "Sunday, December 6 · 2–4 PM ET",
    admission: "Free community session",
    bring: "Laptop + charger. Beginner-friendly — no coding experience needed.",
    registration_note: "RSVP on Meetup. Invite a friend — each person registers separately.",
    rsvp_cta: "RSVP on Meetup",
    metadata: {
      title: "Practical AI Workshop | Reston · Dec 6",
      description:
        "Free beginner-friendly AI workshop with Gus and Haytham. Sunday, December 6, 2–4 PM ET in Reston. Chat assistants, browser agents, workflows and one guided task.",
      cover_alt:
        "Workshop concept artwork with We've Got Now branding. It is not a photograph of attendees or the actual venue.",
    },
  },
  es: {
    title: "Taller práctico de IA para avanzar y generar ingresos",
    label: "Nueva fecha · Sesión comunitaria gratuita",
    tagline: "Mira cómo funcionan las herramientas y prueba una tarea real.",
    short_description:
      "Una sesión gratuita para principiantes con Gus y Haytham: qué son los asistentes de chat, los agentes de navegador y los flujos agénticos, qué herramientas usa nuestro equipo para cada trabajo y una tarea práctica guiada.",
    intro:
      "Esta sesión se trasladó del 15 de noviembre al 6 de diciembre. Acompaña a Gus Gonzalez de MyGuyGus y a Haytham como coanfitrión en una sesión comunitaria gratuita en Reston. Lo mantendremos práctico y en lenguaje sencillo.",
    learn: [
      "Qué es un LLM o asistente de chat, qué hace un agente de navegador y qué hace que un flujo sea agéntico",
      "Qué herramientas usa nuestro equipo para cada tipo de trabajo, en demostración",
      "Una tarea práctica, guiada paso a paso",
      "Un vistazo breve a un flujo de producción de video",
      "Una explicación breve de los problemas reales que atienden nuestros productos y servicios",
      "Tiempo para preguntas y para conocer a otros participantes",
    ],
    date_time: "Domingo 6 de diciembre · 2–4 p. m., hora del Este",
    admission: "Sesión comunitaria gratuita",
    bring: "Laptop y cargador. Para principiantes; no necesitas saber programar.",
    registration_note:
      "Confirma tu asistencia en Meetup. Invita a alguien; cada persona se registra por separado.",
    rsvp_cta: "Confirmar asistencia en Meetup",
    metadata: {
      title: "Taller práctico de IA | Reston · 6 dic.",
      description:
        "Taller gratuito de IA para principiantes con Gus y Haytham. Domingo 6 de diciembre, 2–4 p. m., hora del Este, en Reston.",
      cover_alt:
        "Imagen conceptual del taller con la marca We've Got Now. No es una foto de asistentes ni del lugar real.",
    },
  },
  agenda: [
    { time_et: "2:00–2:10 PM", en: "Welcome and a real task", es: "Bienvenida y una tarea real" },
    {
      time_et: "2:10–2:35 PM",
      en: "Foundations: chat assistants, browser agents and agentic workflows",
      es: "Conceptos básicos: asistentes de chat, agentes de navegador y flujos agénticos",
    },
    {
      time_et: "2:35–3:00 PM",
      en: "Tools and demonstrations: what our team uses for which work",
      es: "Herramientas y demostraciones: qué usa nuestro equipo para cada trabajo",
    },
    { time_et: "3:00–3:30 PM", en: "Guided practical task", es: "Tarea práctica guiada" },
    {
      time_et: "3:30–3:45 PM",
      en: "Video-production example and a brief look at our products and services",
      es: "Ejemplo de producción de video y un vistazo breve a nuestros productos y servicios",
    },
    {
      time_et: "3:45–4:00 PM",
      en: "Questions and networking",
      es: "Preguntas y contactos",
    },
  ],
} as const;
