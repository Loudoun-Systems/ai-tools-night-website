import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "@/content/types";
import { LocaleContext, LOCALE_STORAGE_KEY, type Ctx } from "./locale-context";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  // Working prompt drafts live in memory only, keyed by slug:locale.
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored === "en" || stored === "es") setLocaleState(stored);
    } catch {
      /* storage unavailable: keep default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* preference simply isn't remembered */
    }
  }, []);

  const setDraft = useCallback((key: string, value: string | undefined) => {
    setDrafts((prev) => {
      const next = { ...prev };
      if (value === undefined) delete next[key];
      else next[key] = value;
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t: (v) => v[locale], drafts, setDraft }),
    [locale, setLocale, drafts, setDraft],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
