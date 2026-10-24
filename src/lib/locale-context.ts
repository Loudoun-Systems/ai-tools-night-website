import { createContext, useContext } from "react";
import type { Locale, Localized } from "@/content/types";

export const LOCALE_STORAGE_KEY = "wgn-locale";

export type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (v: Localized) => string;
  drafts: Record<string, string>;
  setDraft: (key: string, value: string | undefined) => void;
};

export const LocaleContext = createContext<Ctx | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}

/** Inline bilingual helper: L("Hello", "Hola") */
export const L = (en: string, es: string): Localized => ({ en, es });
