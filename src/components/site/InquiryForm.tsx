import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useLocale, L } from "@/lib/locale-context";
import type { Localized } from "@/content/types";
import { LIMITS, type InquiryKind } from "@/lib/inquiry";
import { Control } from "./Control";

type Status = "idle" | "sending" | "sent" | "error";
const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 12)}`;

export const INTENTS: {
  kind: InquiryKind;
  label: Localized;
  intro: Localized;
  urlLabel?: Localized;
}[] = [
  {
    kind: "contact",
    label: L("Contact", "Contacto"),
    intro: L(
      "A question, an idea or a hello. We read every message.",
      "Una pregunta, una idea o un saludo. Leemos cada mensaje.",
    ),
  },
  {
    kind: "cohost-speaker",
    label: L("Co-host or speak", "Coorganiza o presenta"),
    intro: L(
      "Have a demo, a lesson or a session to co-host at a WGN night? Tell us what you would share.",
      "¿Tienes una demo, una lección o una sesión para coorganizar en una noche de WGN? Cuéntanos qué compartirías.",
    ),
    urlLabel: L("Event or website URL (optional)", "URL del evento o sitio web (opcional)"),
  },
  {
    kind: "host-an-event",
    label: L("Host at our Reston space", "Organiza en nuestro espacio de Reston"),
    intro: L(
      "Planning a meetup or networking event and looking for a room in Reston? Describe the group and what you have in mind.",
      "¿Planeas un encuentro o evento de networking y buscas un espacio en Reston? Describe el grupo y lo que tienes en mente.",
    ),
    urlLabel: L("Event or website URL (optional)", "URL del evento o sitio web (opcional)"),
  },
  {
    kind: "invite-us",
    label: L("Invite us to your team", "Invítanos a tu equipo"),
    intro: L(
      "Want WGN to speak with your team or group? Share the audience, the topic and timing.",
      "¿Quieres que WGN hable con tu equipo o grupo? Comparte la audiencia, el tema y las fechas.",
    ),
    urlLabel: L("Event or website URL (optional)", "URL del evento o sitio web (opcional)"),
  },
  {
    kind: "careers",
    label: L("Career interest", "Interés profesional"),
    intro: L(
      "Tell us which path interests you and how you would like to contribute. These are contribution paths, not paid openings.",
      "Cuéntanos qué camino te interesa y cómo te gustaría aportar. Son caminos de colaboración, no vacantes remuneradas.",
    ),
    urlLabel: L("Portfolio URL (optional)", "URL de portafolio (opcional)"),
  },
];

const ERRORS: Record<string, Localized> = {
  invalid: L(
    "Please check the highlighted fields and try again.",
    "Revisa los campos marcados e inténtalo de nuevo.",
  ),
  rate_limited: L(
    "Too many requests from this connection. Please wait a few minutes and try again.",
    "Demasiadas solicitudes desde esta conexión. Espera unos minutos e inténtalo de nuevo.",
  ),
  unavailable: L(
    "Website messages are temporarily unavailable because email is not configured. Nothing was sent and your text is still here. Please reach us on Meetup or LinkedIn for now.",
    "Los mensajes del sitio no están disponibles temporalmente porque el correo no está configurado. No se envió nada y tu texto sigue aquí. Por ahora, escríbenos en Meetup o LinkedIn.",
  ),
  delivery_unknown: L(
    "We could not confirm whether your message was delivered. Please do not send it again; an organizer will follow up if it arrived. Your text is still here for your records.",
    "No pudimos confirmar si tu mensaje se entregó. Por favor no lo envíes de nuevo; una persona organizadora te contactará si llegó. Tu texto sigue aquí.",
  ),
  in_flight: L(
    "This message is already being sent. Please wait a moment.",
    "Este mensaje ya se está enviando. Espera un momento.",
  ),
  conflict: L(
    "This form was already used for a different message. Please edit your text and send again.",
    "Este formulario ya se usó para otro mensaje. Edita tu texto y envíalo de nuevo.",
  ),
  send_failed: L(
    "We could not send your message. Your text is still here — please try again.",
    "No pudimos enviar tu mensaje. Tu texto sigue aquí; inténtalo de nuevo.",
  ),
  network: L(
    "Connection problem. Your text is still here — please try again.",
    "Problema de conexión. Tu texto sigue aquí; inténtalo de nuevo.",
  ),
};

type Fields = { firstName: string; lastName: string; email: string; message: string; url: string };
const empty: Fields = { firstName: "", lastName: "", email: "", message: "", url: "" };

export function InquiryForm({
  kinds,
  initial,
  onKindChange,
}: {
  kinds: InquiryKind[];
  initial?: InquiryKind;
  onKindChange?: (k: InquiryKind) => void;
}) {
  const { t, locale } = useLocale();
  const uid = useId();
  const [kind, setKind] = useState<InquiryKind>(initial ?? kinds[0] ?? "contact");
  const [fields, setFields] = useState<Fields>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [bad, setBad] = useState<string[]>([]);
  const requestId = useRef(newId());
  const pending = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  // Follow URL intent (back/forward) without remounting, so typed values are kept.
  useEffect(() => {
    if (initial && status !== "sending") setKind(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);
  const intent = INTENTS.find((i) => i.kind === kind) ?? INTENTS[0];
  if (!intent) return null;
  const visible = INTENTS.filter((i) => kinds.includes(i.kind));

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    if (status === "sending" || pending.current) return;
    setFields((f) => ({ ...f, [k]: e.target.value }));
    // A changed message is a new inquiry, except after unknown delivery (keep the key so it is never resent).
    if (status === "error" && error !== "delivery_unknown") requestId.current = newId();
    if (status === "sent") setStatus("idle");
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || pending.current || error === "delivery_unknown") return;
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    pending.current = true;
    setStatus("sending");
    setError("");
    setBad([]);
    const payload = {
      kind,
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      message: fields.message,
      ...(intent?.urlLabel && fields.url.trim() ? { url: fields.url.trim() } : {}),
      locale,
      idempotencyKey: requestId.current,
      ...(honeypot.current?.value ? { website: honeypot.current.value } : {}),
    };
    try {
      const res = await fetch("/api/public/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: string[];
      };
      if (res.ok && body.ok) {
        setStatus("sent");
        setFields(empty);
        requestId.current = newId();
      } else {
        setStatus("error");
        setError(body.error ?? "send_failed");
        setBad(body.fields ?? []);
      }
    } catch {
      setStatus("error");
      setError("delivery_unknown");
    } finally {
      pending.current = false;
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field = (
    k: keyof Fields,
    label: Localized,
    opts: { type?: string; max: number; auto?: string; required?: boolean; area?: boolean },
  ) => {
    const id = `${uid}-${k}`;
    const props = {
      id,
      name: k,
      value: fields[k],
      onChange: set(k),
      maxLength: opts.max,
      required: opts.required ?? true,
      "aria-invalid": bad.includes(k) || undefined,
      className: "field",
      autoComplete: opts.auto,
    };
    return (
      <div className={opts.area ? "sm:col-span-2" : ""}>
        <label htmlFor={id} className="form-label">
          {t(label)}
          {(opts.required ?? true) && <span aria-hidden="true"> *</span>}
        </label>
        {opts.area ? (
          <textarea {...props} rows={6} minLength={LIMITS.minMessage} />
        ) : (
          <input {...props} type={opts.type ?? "text"} />
        )}
      </div>
    );
  };

  return (
    <div className="inquiry">
      {visible.length > 1 && (
        <div
          className="seg seg-wrap"
          role="group"
          aria-label={t(L("What is this about?", "¿Sobre qué es?"))}
        >
          {visible.map((i) => (
            <Control
              key={i.kind}
              className="seg-item"
              aria-pressed={kind === i.kind}
              disabled={status === "sending"}
              onClick={() => {
                if (status === "sending") return;
                setKind(i.kind);
                if (error !== "delivery_unknown") {
                  requestId.current = newId();
                  setStatus("idle");
                }
                onKindChange?.(i.kind);
              }}
            >
              {t(i.label)}
            </Control>
          ))}
        </div>
      )}
      <p className="body-copy mt-5 max-w-2xl">{t(intent.intro)}</p>
      <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={submit} noValidate={false}>
        <fieldset disabled={status === "sending"} className="contents">
          {field("firstName", L("First name", "Nombre"), { max: LIMITS.name, auto: "given-name" })}
          {field("lastName", L("Last name", "Apellido"), { max: LIMITS.name, auto: "family-name" })}
          <div className="sm:col-span-2">
            {field("email", L("Email", "Correo electrónico"), {
              type: "email",
              max: LIMITS.email,
              auto: "email",
            })}
          </div>
          {intent.urlLabel && (
            <div className="sm:col-span-2">
              {field("url", intent.urlLabel, { type: "url", max: LIMITS.url, required: false })}
            </div>
          )}
          {field("message", L("Message", "Mensaje"), { max: LIMITS.message, area: true })}
        </fieldset>
        <div className="hp" aria-hidden="true">
          <label>
            Website
            <input ref={honeypot} tabIndex={-1} autoComplete="off" name="website" />
          </label>
        </div>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
          <Control
            type="submit"
            className="btn btn-primary"
            aria-busy={status === "sending"}
            disabled={status === "sending" || (status === "error" && error === "delivery_unknown")}
          >
            {status === "sending"
              ? t(L("Sending…", "Enviando…"))
              : t(L("Send message", "Enviar mensaje"))}
          </Control>
          <p className="text-sm text-muted-foreground">
            {t(
              L(
                "Sent to the WGN organizers for review. No newsletter sign-up.",
                "Se envía a las personas organizadoras de WGN para revisión. Sin suscripción a boletines.",
              ),
            )}
          </p>
        </div>
      </form>
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="mt-5">
        {status === "sent" && (
          <p className="form-note form-note-ok">
            {t(
              L(
                "Thank you — your message was sent. An organizer will reply by email.",
                "Gracias: tu mensaje se envió. Una persona organizadora te responderá por correo.",
              ),
            )}
          </p>
        )}
        {status === "error" && (
          <p className="form-note form-note-error">
            {t(
              ERRORS[error] ??
                L("Your message could not be sent.", "No se pudo enviar tu mensaje."),
            )}
          </p>
        )}
      </div>
    </div>
  );
}
