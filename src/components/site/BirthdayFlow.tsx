import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Table2, Image, Sparkles, Mail } from "lucide-react";
import { useLocale, L } from "@/lib/locale-context";
import { Control } from "./Control";

/** Step end times in seconds: row → photo → message → draft. */
export const FLOW_TIMES = [4.5, 9, 15, 23] as const;
export const FLOW_TOTAL = 23;
export const CHUNK_TIMES = [10.3, 12.4, 14.4];
export function loopTime(time: number) {
  return ((time % FLOW_TOTAL) + FLOW_TOTAL) % FLOW_TOTAL;
}

const steps = [
  {
    icon: Table2,
    title: L("Spreadsheet row", "Fila de la hoja"),
    body: L(
      "Read the name, birthday and relationship from your chosen spreadsheet row.",
      "Lee el nombre, el cumpleaños y la relación de la fila elegida.",
    ),
  },
  {
    icon: Image,
    title: L("Selected photo", "Foto elegida"),
    body: L(
      "Add the photo you chose and have permission to use. No face search.",
      "Añade la foto que elegiste y tienes permiso de usar. Sin reconocimiento facial.",
    ),
  },
  {
    icon: Sparkles,
    title: L("AI message", "Mensaje con IA"),
    body: L(
      "The workshop workflow drafts a message for that relationship.",
      "El flujo del taller redacta un mensaje para esa relación.",
    ),
  },
  {
    icon: Mail,
    title: L("Email draft", "Borrador de correo"),
    body: L(
      "A draft waits for your review. Nothing sends automatically.",
      "Un borrador espera tu revisión. Nada se envía automáticamente.",
    ),
  },
];

const chunks = [
  L("Happy birthday, Alex! 🎉", "¡Feliz cumpleaños, Alex! 🎉"),
  L(
    "Thank you for the thoughtful design reviews this year.",
    "Gracias por tus revisiones de diseño tan cuidadosas este año.",
  ),
  L("Enjoy your day — from the whole team.", "Disfruta tu día, de parte de todo el equipo."),
];

export function stepAt(time: number) {
  const i = FLOW_TIMES.findIndex((end) => time < end);
  return i === -1 ? 3 : i;
}

export function BirthdayFlow() {
  const { t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [keyboardHold, setKeyboardHold] = useState(false);
  const [started, setStarted] = useState(false);
  const visible = useRef(false);
  const [onscreen, setOnscreen] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const finalStage = stepAt(time) === 3;

  // Start once when visible; reduced motion shows the final result immediately.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => {
      setReduced(mq.matches);
      if (mq.matches) setTime(FLOW_TOTAL);
    };
    motion();
    mq.addEventListener("change", motion);
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e?.isIntersecting ?? false;
        setOnscreen(visible.current);
        if (visible.current) {
          setStarted(true);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", motion);
    };
  }, []);

  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // The frame loop only runs while playing, onscreen and the tab is visible.
  // Each (re)start resets the clock, and per-frame steps are clamped, so time
  // spent hidden or offscreen is discarded instead of jumping ahead.
  const running = onscreen && !pageHidden && !reduced && !keyboardHold;
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      setTime((v) => {
        return loopTime(v + dt);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const select = (i: number) => {
    setTime(i === 0 ? 0 : (FLOW_TIMES[i - 1] ?? 0));
  };

  const active = stepAt(time);
  const activeStep = steps[active];
  const shownChunks = finalStage ? 3 : CHUNK_TIMES.filter((c) => time >= c).length;
  const packet = (i: number) => {
    const end = FLOW_TIMES[i] ?? 0;
    const p = Math.min(1, Math.max(0, (time - (end - 1.8)) / 1.8));
    return { "--p": p, opacity: p > 0 && p < 1 ? 1 : 0 } as React.CSSProperties;
  };
  const reached = (i: number) => time >= (i === 0 ? 0.05 : (FLOW_TIMES[i - 1] ?? 0));

  return (
    <div
      className="birthday-flow"
      ref={ref}
      data-started={started}
      data-running={running}
      data-reset={!reduced && (time > 22.65 || time < 0.25)}
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setKeyboardHold(true);
      }}
      onKeyDown={() => setKeyboardHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setKeyboardHold(false);
      }}
      onPointerDown={() => setKeyboardHold(false)}
    >
      <div
        className="flow-tabs"
        role="tablist"
        aria-label={t(L("Workflow steps", "Pasos del flujo"))}
      >
        {steps.map((s, i) => (
          <Control
            key={s.title.en}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            className="flow-tab"
            data-reached={reached(i)}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const next = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
              select(next);
              tabs.current[next]?.focus();
            }}
          >
            <s.icon aria-hidden="true" />
            <span className="flow-number">0{i + 1}</span>
            <span>{t(s.title)}</span>
          </Control>
        ))}
      </div>

      <div className="flow-workspace" aria-hidden="true">
        {/* 01 spreadsheet */}
        <div className="flow-module" data-on={active === 0} data-reached={reached(0)}>
          <p className="flow-module-title">contacts.sheet</p>
          <div className="sheet">
            <div className="sheet-row sheet-head">
              <span>{t(L("Name", "Nombre"))}</span>
              <span>{t(L("Birthday", "Cumpleaños"))}</span>
              <span>{t(L("Relation", "Relación"))}</span>
            </div>
            <div className="sheet-row sheet-pick" data-on={reached(0)}>
              <span>Alex Example</span>
              <span>Nov 12</span>
              <span>{t(L("Teammate", "Compañero"))}</span>
            </div>
            <div className="sheet-row sheet-dim">
              <span>Sam Sample</span>
              <span>Mar 3</span>
              <span>{t(L("Friend", "Amistad"))}</span>
            </div>
          </div>
          <div className="flow-chips" data-moving={active === 0 && running}>
            <span>Alex</span>
            <span>Nov 12</span>
            <span>{t(L("Teammate", "Compañero"))}</span>
          </div>
        </div>
        <div className="flow-link" data-on={reached(1)}>
          <span className="flow-packet" style={packet(0)} />
        </div>
        {/* 02 photo */}
        <div className="flow-module" data-on={active === 1} data-reached={reached(1)}>
          <p className="flow-module-title">{t(L("chosen photo", "foto elegida"))}</p>
          <div className="flow-avatar" data-on={reached(1)}>
            <svg viewBox="0 0 64 64">
              <circle cx="32" cy="24" r="11" />
              <path d="M12 56c3-12 11-18 20-18s17 6 20 18" />
            </svg>
          </div>
          <p className="flow-meta">alex-photo.jpg · {t(L("selected by you", "elegida por ti"))}</p>
        </div>
        <div className="flow-link" data-on={reached(2)}>
          <span className="flow-packet" style={packet(1)} />
        </div>
        {/* 03 message */}
        <div className="flow-module" data-on={active === 2} data-reached={reached(2)}>
          <p className="flow-module-title">{t(L("AI message", "mensaje con IA"))}</p>
          <p className="flow-context" data-on={reached(2)}>
            {t(L("Context: Alex · teammate · Nov 12", "Contexto: Alex · compañero · 12 nov."))}
          </p>
          <div className="flow-message">
            {chunks.map((c, k) => (
              <span key={c.en} data-on={k < shownChunks}>
                {t(c)}{" "}
              </span>
            ))}
          </div>
        </div>
        <div className="flow-link" data-on={reached(3)}>
          <span className="flow-packet" style={packet(2)} />
        </div>
        {/* 04 draft */}
        <div className="flow-module flow-draft" data-on={active === 3} data-reached={reached(3)}>
          <p className="flow-module-title">{t(L("new email", "correo nuevo"))}</p>
          <dl className="draft-fields">
            <div>
              <dt>{t(L("To", "Para"))}</dt>
              <dd>alex@example.com</dd>
            </div>
            <div>
              <dt>{t(L("Subject", "Asunto"))}</dt>
              <dd>{t(L("Happy birthday, Alex!", "¡Feliz cumpleaños, Alex!"))}</dd>
            </div>
          </dl>
          <div className="draft-body" data-on={reached(3)}>
            <span className="draft-thumb">
              <svg viewBox="0 0 64 64">
                <circle cx="32" cy="24" r="11" />
                <path d="M12 56c3-12 11-18 20-18s17 6 20 18" />
              </svg>
            </span>
            <span>{chunks.map((c) => t(c)).join(" ")}</span>
          </div>
          <p className="draft-status" data-on={finalStage}>
            {t(L("UNSENT DRAFT", "BORRADOR SIN ENVIAR"))}
          </p>
        </div>
      </div>

      <p className="flow-caption" aria-live="off">
        <strong>
          0{active + 1} · {activeStep && t(activeStep.title)}.
        </strong>{" "}
        {activeStep && t(activeStep.body)}
        {finalStage && (
          <span className="sr-only">
            {t(
              L(
                " Final result: an unsent email draft for Alex Example, ready for human review.",
                " Resultado final: un borrador de correo sin enviar para Alex Example, listo para revisión humana.",
              ),
            )}
          </span>
        )}
      </p>
    </div>
  );
}
