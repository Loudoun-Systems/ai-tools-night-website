import type { Localized, PromptRecord } from "./types";

export const promptFamilies: { key: string; label: Localized; categories: string[] }[] = [
  {
    key: "research",
    label: { en: "Research & Strategy", es: "Investigación y estrategia" },
    categories: ["Research & Strategy", "Research & Decisions"],
  },
  {
    key: "operations",
    label: { en: "Automation & Operations", es: "Automatización y operaciones" },
    categories: ["Automation & Operations", "AI & Automation", "Work & Planning"],
  },
  {
    key: "content",
    label: { en: "Content & Media", es: "Contenido y medios" },
    categories: ["Content & Media", "Writing & Communication"],
  },
  {
    key: "learning",
    label: { en: "Learning & Workshops", es: "Aprendizaje y talleres" },
    categories: ["Learning & Workshops", "Learning & AI Practice"],
  },
  {
    key: "sales",
    label: { en: "Sales & Customer Work", es: "Ventas y clientes" },
    categories: ["Sales & Customer Work"],
  },
  {
    key: "product",
    label: { en: "Product & Web Development", es: "Producto y desarrollo web" },
    categories: ["Product & Web Development"],
  },
  {
    key: "data",
    label: { en: "Data & Analysis", es: "Datos y análisis" },
    categories: ["Data & Analysis"],
  },
  {
    key: "careers",
    label: { en: "Careers & Portfolio", es: "Carreras y portafolio" },
    categories: ["Careers & Portfolio"],
  },
];

export function inFamily(prompt: PromptRecord, key: string) {
  return (
    key === "all" ||
    promptFamilies.find((family) => family.key === key)?.categories.includes(prompt.category.en) ===
      true
  );
}
