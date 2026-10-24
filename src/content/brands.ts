import { L } from "@/lib/locale-context";
import type { Localized } from "./types";
import posterNetworking from "@/assets/poster-not-just-networking-900.webp.asset.json";
import posterInvitation from "@/assets/poster-next-invitation-900.webp.asset.json";
import posterDna from "@/assets/poster-our-dna-900.webp.asset.json";

export type Brand = {
  key: string;
  name: string;
  url: string;
  host: string;
  summary: Localized;
  /** Prompt families that are relevant tasks for this kind of work (not brand-authored). */
  relatedFamilies: string[];
};

export const MYGUYGUS: Brand = {
  key: "myguygus",
  name: "MyGuyGus",
  url: "https://myguygus.com/",
  host: "myguygus.com",
  summary: L(
    "AI consulting, implementation and enablement around the tools people already use.",
    "Consultoría, implementación y capacitación en IA alrededor de las herramientas que ya usas.",
  ),
  relatedFamilies: [],
};

export const brands: Brand[] = [
  {
    key: "your-ai-everything",
    name: "Your AI Everything",
    url: "https://myguygus.com/ai",
    host: "myguygus.com/ai",
    summary: L(
      "Custom AI systems, agents and command centers for individuals and teams.",
      "Sistemas de IA, agentes y centros de operaciones adaptados a personas y equipos.",
    ),
    relatedFamilies: ["operations"],
  },
  {
    key: "automate-with-gus",
    name: "Automate With Gus",
    url: "https://automatewithgus.com/",
    host: "automatewithgus.com",
    summary: L(
      "Connected workflows for outreach, content and operations, with human review.",
      "Flujos conectados para prospección, contenido y operaciones, con revisión humana.",
    ),
    relatedFamilies: ["operations", "content"],
  },
  {
    key: "norepsales",
    name: "NoRepSales",
    url: "https://norepsales.com/",
    host: "norepsales.com",
    summary: L(
      "Clear, self-service stories and explainers that help B2B buyers understand your value.",
      "Historias y explicaciones claras para que los compradores B2B entiendan tu valor a su ritmo.",
    ),
    relatedFamilies: ["sales", "content"],
  },
  {
    key: "ai-enablement-works",
    name: "AI Enablement Works",
    url: "https://aienablementworks.com/",
    host: "aienablementworks.com",
    summary: L(
      "Practical AI systems for onboarding, team knowledge, talk tracks and adoption.",
      "Sistemas prácticos de IA para incorporación, conocimiento del equipo, conversaciones comerciales y adopción.",
    ),
    relatedFamilies: ["learning"],
  },
];

export const posters: {
  key: string;
  src: string;
  alt: Localized;
  caption: Localized;
}[] = [
  {
    key: "not-just-networking",
    src: posterNetworking.url,
    alt: L(
      "We've Got Now poster: an explorer looks over a neon night city under the words “Not just networking.”",
      "Póster de We've Got Now: una persona exploradora mira una ciudad nocturna de neón bajo el texto en inglés “Not just networking”.",
    ),
    caption: L(
      "Not just networking: a night for trying tools, asking questions and building with people.",
      "Más que networking: una noche para probar herramientas, hacer preguntas y crear con otras personas. (Texto del póster en inglés.)",
    ),
  },
  {
    key: "next-invitation",
    src: posterInvitation.url,
    alt: L(
      "We've Got Now invitation poster inviting people to the next gathering.",
      "Póster de invitación de We've Got Now al próximo encuentro, con texto en inglés.",
    ),
    caption: L(
      "An open invitation. Confirmed dates and registration always live on the event pages.",
      "Una invitación abierta. Las fechas confirmadas y la inscripción siempre están en las páginas de eventos. (Texto del póster en inglés.)",
    ),
  },
  {
    key: "our-dna",
    src: posterDna.url,
    alt: L(
      "We've Got Now poster with a community group photo and the values that shape the community.",
      "Póster de We've Got Now con una foto grupal de la comunidad y sus valores, con texto en inglés.",
    ),
    caption: L(
      "Our DNA: curious, practical and welcoming — the values behind every night.",
      "Nuestro ADN: curiosidad, práctica y bienvenida, los valores detrás de cada noche. (Texto del póster en inglés.)",
    ),
  },
];
