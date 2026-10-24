import { useEffect, useRef, useState } from "react";
import { useLocale, L } from "@/lib/locale-context";
import { Control } from "./Control";

const chapters = [
  {
    verb: L("Learn", "Aprende"),
    title: L("Start with a real question.", "Empieza con una pregunta real."),
    body: L(
      "You do not need to know every tool. Bring something you want to understand and make space for a different perspective.",
      "No necesitas conocer todas las herramientas. Trae algo que quieras entender y da espacio a otra perspectiva.",
    ),
  },
  {
    verb: L("Build", "Crea"),
    title: L("Try the small version.", "Prueba una versión pequeña."),
    body: L(
      "Use a practical example. Test an approach, check the result, and keep your own judgment in the process.",
      "Usa un ejemplo práctico. Prueba una idea, revisa el resultado e incorpora tu criterio en el proceso.",
    ),
  },
  {
    verb: L("Share", "Comparte"),
    title: L("Tell the useful part.", "Cuenta lo que sirve."),
    body: L(
      "A lesson is worth sharing even when an experiment does not go to plan. Be clear about what worked and what remains uncertain.",
      "Un aprendizaje merece compartirse aunque la prueba no salga como esperabas. Explica qué funcionó y qué sigue sin estar claro.",
    ),
  },
  {
    verb: L("Connect", "Conecta"),
    title: L("Leave room for people.", "Dale espacio a las personas."),
    body: L(
      "Welcome different backgrounds and starting points. Listen carefully, ask thoughtfully, and make it easier for someone else to join in.",
      "Recibe distintas historias y puntos de partida. Escucha con atención, pregunta con respeto y facilita que otra persona participe.",
    ),
  },
];
export function Chapters() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset["entered"] = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="chapters">
      <div
        className="chapter-index"
        role="group"
        aria-label={t(L("Our community", "Nuestra comunidad"))}
      >
        {chapters.map((c, i) => (
          <Control
            key={c.verb.en}
            className="chapter-select"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse" && matchMedia("(hover: hover)").matches) setActive(i);
            }}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const next =
                (i + (e.key === "ArrowRight" ? 1 : chapters.length - 1)) % chapters.length;
              ref.current?.querySelectorAll<HTMLButtonElement>(".chapter-select")[next]?.focus();
            }}
          >
            <span className="chapter-number">0{i + 1}</span>
            <span>{t(c.verb)}</span>
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path
                d={
                  i === 0
                    ? "M8 48V16h48v32H8m24-32v32"
                    : i === 1
                      ? "M8 48L32 8l24 40H8m24-24v24"
                      : i === 2
                        ? "M8 16h32v32H8V16m16 8h32v32H24"
                        : "M8 32h48M32 8v48M16 16l32 32m0-32L16 48"
                }
              />
            </svg>
          </Control>
        ))}
      </div>
      <div className="chapter-descriptions">
        {chapters.map((c, i) => (
          <div key={c.verb.en} className="chapter-description" data-active={active === i}>
            <h3>{t(c.title)}</h3>
            <p className="body-copy mt-3">{t(c.body)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
