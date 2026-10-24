import { Control } from "./Control";
import { useLocale } from "@/lib/locale-context";

export function LanguageSwitch() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="seg" role="group" aria-label={locale === "en" ? "Language" : "Idioma"}>
      {(["en", "es"] as const).map((l) => (
        <Control
          key={l}
          type="button"
          lang={l}
          className="seg-item !min-h-8 !px-3 !text-[0.8rem]"
          aria-pressed={locale === l}
          onClick={() => setLocale(l)}
        >
          <span aria-hidden>{l.toUpperCase()}</span>
          <span className="sr-only">{l === "en" ? "English" : "Español"}</span>
        </Control>
      ))}
    </div>
  );
}
