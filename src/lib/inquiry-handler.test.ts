import { describe, expect, it, vi } from "vitest";
import { handleInquiry, type InquiryGuard, type SendResult } from "./inquiry-handler";

const ORIGIN = "https://wgn.test";
const valid = {
  kind: "contact",
  firstName: "Alex",
  lastName: "Example",
  email: "alex@example.com",
  message: "Hello, I would like to learn more.",
  locale: "en",
  idempotencyKey: "key-0000-0000-0001",
};

function req(body: unknown, headers: Record<string, string> = {}) {
  return new Request(`${ORIGIN}/api/public/inquiry`, {
    method: "POST",
    headers: { origin: ORIGIN, "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

/** Test-only guard: atomic within one process. Not a production guard. */
function fakeGuard(limit = 100): InquiryGuard {
  const rec = new Map<string, { hash: string; ticketId: string; state: string }>();
  const hits = new Map<string, number>();
  return {
    async claim(key, hash, ticketId) {
      const r = rec.get(key);
      if (!r) {
        rec.set(key, { hash, ticketId, state: "in_flight" });
        return { state: "claimed" };
      }
      if (r.hash !== hash) return { state: "conflict" };
      if (r.state === "accepted") return { state: "accepted", ticketId: r.ticketId };
      if (r.state === "in_flight") return { state: "in_flight" };
      return { state: "failed" };
    },
    async finish(key, outcome) {
      const r = rec.get(key);
      if (r) r.state = outcome;
    },
    async hit(scope) {
      const n = (hits.get(scope) ?? 0) + 1;
      hits.set(scope, n);
      return n <= limit;
    },
  };
}

const sender = (status: SendResult["status"]) =>
  vi.fn(async (): Promise<SendResult> => ({ status }));

describe("inquiry route", () => {
  it("fails closed with 503 when transport is unconfigured, without sending", async () => {
    const send = sender("accepted");
    const res = await handleInquiry(req(valid), { guard: fakeGuard(), mailReady: false, send });
    expect(res.status).toBe(503);
    expect(send).not.toHaveBeenCalled();
  });
  it("rejects a different origin, scheme or port", async () => {
    const send = sender("accepted");
    for (const origin of ["https://evil.test", "http://wgn.test", "https://wgn.test:444"]) {
      const res = await handleInquiry(req(valid, { origin }), {
        guard: fakeGuard(),
        mailReady: true,
        send,
      });
      expect(res.status).toBe(403);
    }
    expect(send).not.toHaveBeenCalled();
  });
  it("requires exactly application/json and bounded size", async () => {
    const deps = { guard: fakeGuard(), mailReady: true, send: sender("accepted") };
    expect((await handleInquiry(req(valid, { "content-type": "text/plain" }), deps)).status).toBe(
      415,
    );
    expect(
      (await handleInquiry(req(valid, { "content-type": "application/jsonx" }), deps)).status,
    ).toBe(415);
    expect((await handleInquiry(req("x".repeat(13_000)), deps)).status).toBe(413);
  });
  it("rejects the honeypot as invalid, not success", async () => {
    const send = sender("accepted");
    const res = await handleInquiry(req({ ...valid, website: "spam" }), {
      guard: fakeGuard(),
      mailReady: true,
      send,
    });
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
  it("sends once, returns a server ticket ID, and replays the same ticket for the same payload", async () => {
    const guard = fakeGuard();
    const send = sender("accepted");
    const a = await (await handleInquiry(req(valid), { guard, mailReady: true, send })).json();
    const b = await (await handleInquiry(req(valid), { guard, mailReady: true, send })).json();
    expect(a.ticketId).toMatch(/^WGN-[A-Z2-9]{10}$/);
    expect(b.ticketId).toBe(a.ticketId);
    expect(send).toHaveBeenCalledTimes(1);
  });
  it("a reused key with different content is a conflict, not success", async () => {
    const guard = fakeGuard();
    const send = sender("accepted");
    await handleInquiry(req(valid), { guard, mailReady: true, send });
    const res = await handleInquiry(req({ ...valid, message: "A completely different inquiry." }), {
      guard,
      mailReady: true,
      send,
    });
    expect(res.status).toBe(409);
    expect((await res.json()).ok).toBe(false);
    expect(send).toHaveBeenCalledTimes(1);
  });
  it("concurrent duplicates send only once", async () => {
    const guard = fakeGuard();
    let release: () => void = () => {};
    const send = vi.fn(
      () => new Promise<SendResult>((r) => (release = () => r({ status: "accepted" }))),
    );
    const p1 = handleInquiry(req(valid), { guard, mailReady: true, send });
    await new Promise((r) => setTimeout(r, 5));
    const r2 = await handleInquiry(req(valid), { guard, mailReady: true, send });
    expect(r2.status).toBe(409);
    expect((await r2.json()).error).toBe("in_flight");
    release();
    expect((await p1).status).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
  });
  it("unknown delivery is reported distinctly and never resent", async () => {
    const guard = fakeGuard();
    const send = sender("unknown");
    const r1 = await handleInquiry(req(valid), { guard, mailReady: true, send });
    expect((await r1.json()).error).toBe("delivery_unknown");
    const r2 = await handleInquiry(req(valid), { guard, mailReady: true, send });
    expect((await r2.json()).error).toBe("delivery_unknown");
    expect(send).toHaveBeenCalledTimes(1);
  });
  it("a definite provider rejection is reported as send_failed", async () => {
    const res = await handleInquiry(req(valid), {
      guard: fakeGuard(),
      mailReady: true,
      send: sender("rejected"),
    });
    expect((await res.json()).error).toBe("send_failed");
  });
  it("rate limits per trusted scope", async () => {
    const guard = fakeGuard(1);
    const send = sender("accepted");
    await handleInquiry(req(valid), { guard, mailReady: true, send });
    const res = await handleInquiry(req({ ...valid, idempotencyKey: "key-0000-0000-0002" }), {
      guard,
      mailReady: true,
      send,
    });
    expect(res.status).toBe(429);
  });
});
