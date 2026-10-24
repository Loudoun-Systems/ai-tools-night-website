import { useCallback, useEffect, useState } from "react";

export const SAVED_PROMPTS_KEY = "wgn-saved-prompts-v1";

export function readSaved(validSlugs: readonly string[]): string[] {
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(SAVED_PROMPTS_KEY) ?? "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter((s): s is string => typeof s === "string" && validSlugs.includes(s));
  } catch {
    return [];
  }
}

/** Returns the next list, or null when storage refused the write. */
export function toggleSavedIn(current: string[], slug: string): string[] | null {
  const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
  try {
    window.localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(next));
    return next;
  } catch {
    return null;
  }
}

export function useSavedPrompts(validSlugs: readonly string[]) {
  const [saved, setSaved] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "saved" | "removed" | "error">("idle");
  useEffect(() => {
    setSaved(readSaved(validSlugs));
  }, [validSlugs]);
  const toggle = useCallback(
    (slug: string) => {
      const wasSaved = saved.includes(slug);
      const next = toggleSavedIn(saved, slug);
      if (next === null) setStatus("error");
      else {
        setSaved(next);
        setStatus(wasSaved ? "removed" : "saved");
      }
    },
    [saved],
  );
  return { saved, toggle, status };
}
