import type { Locale, Localized, PromptRecord } from "./types";
import { prompts } from "./prompts-tracks";

export const orderedPrompts: PromptRecord[] = [
  ...prompts.filter((p) => p.difficulty === "advanced"),
  ...prompts.filter((p) => p.difficulty === "intermediate"),
  ...prompts.filter((p) => !p.difficulty),
];

export const promptCategories: Localized[] = Array.from(
  new Map(orderedPrompts.map((p) => [p.category.en, p.category])).values(),
);

export function filterPrompts(
  list: PromptRecord[],
  o: { query: string; category: string; savedOnly: boolean; saved: string[]; locale: Locale },
) {
  const q = o.query.trim().toLocaleLowerCase(o.locale);
  return list.filter((p) => {
    const hay = [
      p.title[o.locale],
      p.category[o.locale],
      p.usefulFor[o.locale],
      p.outcome?.[o.locale] ?? "",
      p.prompt[o.locale],
      ...(p.tags ?? []),
    ]
      .join(" ")
      .toLocaleLowerCase(o.locale);
    return (
      (o.category === "all" || p.category.en === o.category) &&
      (!o.savedOnly || o.saved.includes(p.slug)) &&
      hay.includes(q)
    );
  });
}

export function relatedPrompts(p: PromptRecord) {
  return [
    ...prompts.filter((x) => x.slug !== p.slug && x.category.en === p.category.en),
    ...prompts.filter((x) => x.slug !== p.slug && x.category.en !== p.category.en),
  ].slice(0, 3);
}

export function difficultyLabel(p: PromptRecord): Localized {
  if (p.difficulty === "advanced") return { en: "Advanced workflow", es: "Flujo avanzado" };
  if (p.difficulty === "intermediate")
    return { en: "Intermediate workflow", es: "Flujo intermedio" };
  return { en: "Everyday starter", es: "Plantilla cotidiana" };
}
