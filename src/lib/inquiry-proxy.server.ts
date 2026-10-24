import { inquirySchema, isJsonContentType, isSameOrigin } from "./inquiry";

/** Owned WGN mail gateway; Gmail credentials remain in its server environment. */
export const INQUIRY_GATEWAY = "https://now-we-make-together.lovable.app/api/public/inquiry";
const MAX_BYTES = 16_384;
const TIMEOUT_MS = 14_000;
const ERRORS = new Set([
  "invalid",
  "forbidden",
  "unavailable",
  "rate_limited",
  "conflict",
  "in_flight",
  "delivery_unknown",
  "send_failed",
]);
const FIELDS = new Set([
  "firstName",
  "lastName",
  "email",
  "message",
  "url",
  "kind",
  "locale",
  "idempotencyKey",
  "website",
]);
const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

/** One bounded server-to-server attempt; no cookies, credentials or caller-selected URL. */
export async function proxyInquiry(request: Request, send: typeof fetch = fetch) {
  if (!isSameOrigin(request.url, request.headers.get("origin"), request.headers.get("referer")))
    return json({ ok: false, error: "forbidden" }, 403);
  if (!isJsonContentType(request.headers.get("content-type")))
    return json({ ok: false, error: "invalid" }, 415);
  if (Number(request.headers.get("content-length") ?? "0") > MAX_BYTES)
    return json({ ok: false, error: "invalid" }, 413);

  const reader = request.body?.getReader();
  if (!reader) return json({ ok: false, error: "invalid" }, 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return json({ ok: false, error: "invalid" }, 413);
      }
      chunks.push(value);
    }
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  let input: unknown;
  try {
    input = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success)
    return json(
      {
        ok: false,
        error: "invalid",
        fields: parsed.error.issues.map((i) => String(i.path[0] ?? "")),
      },
      400,
    );

  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), TIMEOUT_MS);
  try {
    const upstream = await send(INQUIRY_GATEWAY, {
      method: "POST",
      redirect: "error",
      signal: abort.signal,
      headers: {
        "Content-Type": "application/json",
        // This server calls its own fixed public gateway, which checks its own origin.
        Origin: new URL(INQUIRY_GATEWAY).origin,
      },
      body: JSON.stringify(parsed.data),
    });
    const raw: unknown = await upstream.json().catch(() => null);
    if (!raw || typeof raw !== "object") return json({ ok: false, error: "delivery_unknown" }, 502);
    const body = raw as Record<string, unknown>;
    if (
      upstream.ok &&
      body["ok"] === true &&
      typeof body["ticketId"] === "string" &&
      /^WGN-[A-Z0-9]{8,32}$/.test(body["ticketId"])
    )
      return json({ ok: true, ticketId: body["ticketId"] }, 200);
    const error =
      typeof body["error"] === "string" && ERRORS.has(body["error"])
        ? body["error"]
        : "delivery_unknown";
    const status = [400, 403, 409, 413, 415, 429, 502, 503].includes(upstream.status)
      ? upstream.status
      : 502;
    const fields = Array.isArray(body["fields"])
      ? body["fields"].filter((x): x is string => typeof x === "string" && FIELDS.has(x))
      : undefined;
    return json({ ok: false, error, ...(fields ? { fields } : {}) }, status);
  } catch {
    // An interrupted response may follow an accepted email. Never retry automatically.
    return json({ ok: false, error: "delivery_unknown" }, 502);
  } finally {
    clearTimeout(timer);
  }
}
