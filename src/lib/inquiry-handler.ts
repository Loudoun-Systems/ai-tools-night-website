import {
  inquirySchema,
  isJsonContentType,
  isSameOrigin,
  newTicketId,
  payloadHash,
  type Inquiry,
} from "./inquiry";

export type SendResult = { status: "accepted" | "rejected" | "unknown" };

export type ClaimResult =
  | { state: "claimed" }
  | { state: "in_flight" }
  | { state: "accepted"; ticketId: string }
  | { state: "failed" }
  | { state: "conflict" }
  | { state: "capacity" };

/**
 * Request guard contract. The active implementation is bounded and process-local;
 * it is not durable, shared or an exactly-once guarantee across instances.
 */
export interface InquiryGuard {
  /** Atomically claim key bound to hash; returns prior state when it exists. */
  claim(key: string, hash: string, ticketId: string, ttlSeconds: number): Promise<ClaimResult>;
  /** Record final outcome for a claimed key. */
  finish(key: string, outcome: "accepted" | "rejected" | "unknown"): Promise<void>;
  /** Count one attempt for a trusted scope; false when over the limit. */
  hit(scope: string, limit: number, windowSeconds: number): Promise<boolean>;
}

export type Deps = {
  guard: InquiryGuard;
  mailReady: boolean;
  send: (d: Inquiry, ticketId: string, at: Date) => Promise<SendResult>;
  now?: () => Date;
};

export const MAX_BODY = 12_000;
export const RATE = { limit: 5, windowSeconds: 600 } as const;
export const IDEMPOTENCY_TTL = 60 * 60 * 24;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export async function handleInquiry(request: Request, deps: Deps): Promise<Response> {
  if (!isSameOrigin(request.url, request.headers.get("origin"), request.headers.get("referer")))
    return json({ ok: false, error: "forbidden" }, 403);
  if (!isJsonContentType(request.headers.get("content-type")))
    return json({ ok: false, error: "invalid" }, 415);
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY) return json({ ok: false, error: "invalid" }, 413);
  // Bound bytes while reading, not just after buffering an arbitrary body.
  const reader = request.body?.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  if (reader) {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY) {
        await reader.cancel();
        return json({ ok: false, error: "invalid" }, 413);
      }
      chunks.push(value);
    }
  }
  const joined = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const raw = new TextDecoder().decode(joined);
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success)
    return json(
      {
        ok: false,
        error: "invalid",
        fields: [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? "")))],
      },
      400,
    );
  const d = parsed.data;

  // Only missing transport configuration is unavailable. Guard protection is best effort.
  if (!deps.mailReady) return json({ ok: false, error: "unavailable" }, 503);

  // Only the platform-set client IP is trusted; otherwise one shared bucket.
  const ip = request.headers.get("cf-connecting-ip");
  const scope = ip && /^[0-9a-fA-F:.]{3,45}$/.test(ip) ? `ip:${ip}` : "ip:unknown";
  if (!(await deps.guard.hit(scope, RATE.limit, RATE.windowSeconds)))
    return json({ ok: false, error: "rate_limited" }, 429);

  const hash = await payloadHash(d);
  const ticketId = newTicketId();
  const claim = await deps.guard.claim(d.idempotencyKey, hash, ticketId, IDEMPOTENCY_TTL);
  if (claim.state === "capacity") return json({ ok: false, error: "rate_limited" }, 429);
  if (claim.state === "conflict") return json({ ok: false, error: "conflict" }, 409);
  if (claim.state === "in_flight") return json({ ok: false, error: "in_flight" }, 409);
  if (claim.state === "accepted") return json({ ok: true, ticketId: claim.ticketId }, 200);
  if (claim.state === "failed") return json({ ok: false, error: "delivery_unknown" }, 409);

  let result: SendResult;
  try {
    result = await deps.send(d, ticketId, deps.now?.() ?? new Date());
  } catch {
    result = { status: "unknown" };
  }
  await deps.guard.finish(d.idempotencyKey, result.status);
  if (result.status === "accepted") return json({ ok: true, ticketId }, 200);
  if (result.status === "rejected") return json({ ok: false, error: "send_failed" }, 502);
  return json({ ok: false, error: "delivery_unknown" }, 502);
}
