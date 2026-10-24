import { INQUIRY_ROUTING, type Inquiry, buildTicket } from "./inquiry";
import type { SendResult } from "./inquiry-handler";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
export const MAIL_TIMEOUT_MS = 10_000;

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[\x20-\x7E]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);
const wrap = (s: string) => s.replace(/.{1,76}/g, "$&\r\n").trimEnd();

export function mailConfigured() {
  return Boolean(process.env["LOVABLE_API_KEY"] && process.env["GOOGLE_MAIL_API_KEY"]);
}

/** RFC 2822 message. Recipients are fixed; the visitor appears only as Reply-To. */
export function buildRawMessage(d: Inquiry, ticketId: string, receivedAt: Date) {
  const { subject, text, html } = buildTicket(d, ticketId, receivedAt);
  const boundary = `wgn-${ticketId}`;
  const raw = [
    `From: ${header("We've Got Now website")} <${INQUIRY_ROUTING.to}>`,
    `To: ${INQUIRY_ROUTING.to}`,
    `Cc: ${INQUIRY_ROUTING.cc}`,
    `Reply-To: ${d.email}`,
    `Subject: ${header(subject)}`,
    `X-WGN-Ticket-ID: ${ticketId}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    wrap(b64(text)),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    wrap(b64(html)),
    `--${boundary}--`,
    "",
  ].join("\r\n");
  return b64(raw).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Single attempt, never resent automatically. A 4xx is a definite rejection;
 * timeouts, network errors and 5xx are "unknown" (the provider may have sent it).
 * Logs contain only the ticket ID and status, never payloads or credentials.
 */
export async function sendViaGmail(
  d: Inquiry,
  ticketId: string,
  receivedAt: Date,
  transport: typeof fetch = fetch,
  timeoutMs = MAIL_TIMEOUT_MS,
): Promise<SendResult> {
  const raw = buildRawMessage(d, ticketId, receivedAt);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await transport(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${process.env["LOVABLE_API_KEY"]}`,
        "X-Connection-Api-Key": process.env["GOOGLE_MAIL_API_KEY"] ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    });
    await res.body?.cancel().catch(() => {});
    if (res.ok) return { status: "accepted" };
    console.error(`inquiry mail ${ticketId}: provider status ${res.status}`);
    return res.status >= 500 ? { status: "unknown" } : { status: "rejected" };
  } catch {
    console.error(`inquiry mail ${ticketId}: no provider response`);
    return { status: "unknown" };
  } finally {
    clearTimeout(timer);
  }
}
