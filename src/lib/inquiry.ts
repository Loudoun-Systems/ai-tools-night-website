import { z } from "zod";

/** Request kinds accepted by the website inquiry handler. */
export const INQUIRY_KINDS = [
  "contact",
  "cohost-speaker",
  "host-an-event",
  "invite-us",
  "careers",
] as const;
export type InquiryKind = (typeof INQUIRY_KINDS)[number];

/** Fixed, server-side routing. Never accepted from the browser. */
export const INQUIRY_ROUTING = {
  to: "gus@myguygus.com",
  cc: "haytham@lsmp.video",
} as const;

export const KIND_LABEL: Record<InquiryKind, string> = {
  contact: "Contact",
  "cohost-speaker": "Co-host or speak at WGN",
  "host-an-event": "Host a meetup or networking event",
  "invite-us": "Invite WGN to speak to a team",
  careers: "Career & contribution interest",
};

export const LIMITS = { name: 60, email: 254, message: 3000, url: 500, minMessage: 10 } as const;

// eslint-disable-next-line no-control-regex
const noControl = (v: string) => !/[\r\n\u0000-\u001f\u007f]/.test(v);
const name = z
  .string()
  .trim()
  .min(1)
  .max(LIMITS.name)
  .refine(noControl, "invalid characters")
  .refine((v) => !/[<>@]/.test(v), "invalid characters");

export const inquirySchema = z
  .object({
    kind: z.enum(INQUIRY_KINDS),
    firstName: name,
    lastName: name,
    email: z.string().trim().max(LIMITS.email).email().refine(noControl, "invalid email"),
    message: z.string().trim().min(LIMITS.minMessage).max(LIMITS.message),
    url: z
      .string()
      .trim()
      .max(LIMITS.url)
      .transform((v) => (v ? v : undefined))
      .refine((v) => {
        if (!v) return true;
        try {
          const u = new URL(v);
          return (u.protocol === "https:" || u.protocol === "http:") && noControl(v);
        } catch {
          return false;
        }
      }, "invalid url")
      .optional(),
    locale: z.enum(["en", "es"]),
    /** Client idempotency key; bound server-side to a hash of the validated payload. */
    idempotencyKey: z.string().regex(/^[A-Za-z0-9-]{16,64}$/),
    /** Honeypot: must stay empty. */
    website: z.string().max(0).optional(),
  })
  .strict()
  .refine((d) => d.kind !== "contact" || d.url === undefined, {
    message: "url not accepted for contact",
    path: ["url"],
  });

export type Inquiry = z.infer<typeof inquirySchema>;

export function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function ticketSubject(d: Inquiry, ticketId: string) {
  return `[WGN ${KIND_LABEL[d.kind]}] ${d.firstName} ${d.lastName} · ${ticketId}`;
}

/** Server-issued ticket ID, e.g. WGN-K3Z9QF2A7M. */
export function newTicketId() {
  const a = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const b = crypto.getRandomValues(new Uint8Array(10));
  return `WGN-${Array.from(b, (x) => a[x % a.length]).join("")}`;
}

/** SHA-256 over the canonical validated payload (excludes the key itself). */
export async function payloadHash(d: Inquiry) {
  const canon = JSON.stringify([
    d.kind,
    d.firstName,
    d.lastName,
    d.email.toLowerCase(),
    d.message,
    d.url ?? "",
    d.locale,
  ]);
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canon));
  return Array.from(new Uint8Array(buf), (x) => x.toString(16).padStart(2, "0")).join("");
}

export function isJsonContentType(v: string | null) {
  return (v ?? "").split(";")[0]!.trim().toLowerCase() === "application/json";
}

export function buildTicket(d: Inquiry, ticketId: string, receivedAt: Date) {
  const iso = receivedAt.toISOString();
  const rows: [string, string][] = [
    ["Ticket ID", ticketId],
    ["Kind", `${KIND_LABEL[d.kind]} (${d.kind})`],
    ["Received", iso],
    ["Locale", d.locale.toUpperCase()],
    ["Name", `${d.firstName} ${d.lastName}`],
    ["Email (reply to)", d.email],
  ];
  if (d.url) rows.push([d.kind === "careers" ? "Portfolio" : "Event / website", d.url]);
  const text = [
    `New ${KIND_LABEL[d.kind]} request from the We've Got Now website`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    d.message,
    "",
    "Reply directly to this email to answer the visitor.",
  ].join("\n");
  const cell = "padding:8px 12px;border-bottom:1px solid #e3e6ef;font-size:14px;vertical-align:top";
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1d2233">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto">
<tr><td style="padding:24px 24px 12px;border-top:4px solid #3fd2e6">
<p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7b4fd6">We've Got Now · Website request</p>
<h1 style="margin:8px 0 0;font-size:22px">${escapeHtml(KIND_LABEL[d.kind])}</h1>
<p style="margin:12px 0 0;font-size:14px">Reply to <a href="mailto:${escapeHtml(d.email)}" style="color:#1a6fb3;font-weight:bold">${escapeHtml(d.email)}</a></p>
</td></tr>
<tr><td style="padding:0 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rows.map(([k, v]) => `<tr><th align="left" style="${cell};width:150px;color:#5a6075">${escapeHtml(k)}</th><td style="${cell}">${escapeHtml(v)}</td></tr>`).join("\n")}
</table></td></tr>
<tr><td style="padding:20px 24px"><p style="margin:0 0 8px;font-weight:bold;font-size:14px">Message</p>
<div style="white-space:pre-wrap;font-size:15px;line-height:1.55;background:#f5f6fa;border-radius:6px;padding:14px">${escapeHtml(d.message)}</div></td></tr>
</table></body></html>`;
  return { subject: ticketSubject(d, ticketId), text, html };
}

/** Same-origin check: full origin (scheme + host + port) of Origin, else Referer. */
export function isSameOrigin(requestUrl: string, origin: string | null, referer: string | null) {
  const src = origin ?? referer;
  if (!src || src === "null") return false;
  try {
    return new URL(src).origin === new URL(requestUrl).origin;
  } catch {
    return false;
  }
}
