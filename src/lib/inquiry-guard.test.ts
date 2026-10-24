import { describe, expect, it, vi } from "vitest";
import { InstanceInquiryGuard, GUARD_LIMITS } from "./inquiry-guard";
import { handleInquiry, type SendResult } from "./inquiry-handler";
const data = {
  kind: "contact",
  firstName: "Alex",
  lastName: "Example",
  email: "alex@example.com",
  message: "A fake provider test only.",
  locale: "en",
  idempotencyKey: "r13-test-key-0001",
};
const request = (body = data) =>
  new Request("https://wgn.test/api/public/inquiry", {
    method: "POST",
    headers: { origin: "https://wgn.test", "content-type": "application/json" },
    body: JSON.stringify(body),
  });
describe("best-effort instance guard", () => {
  it("reserves synchronously, binds hash and returns only confirmed tickets", async () => {
    const guard = new InstanceInquiryGuard();
    const first = guard.claim("k", "h", "ticket", 86400);
    expect(await guard.claim("k", "h", "other", 86400)).toEqual({ state: "in_flight" });
    expect(await first).toEqual({ state: "claimed" });
    expect(await guard.claim("k", "changed", "other", 86400)).toEqual({ state: "conflict" });
    await guard.finish("k", "accepted");
    expect(await guard.claim("k", "h", "other", 86400)).toEqual({
      state: "accepted",
      ticketId: "ticket",
    });
  });
  it("blocks unknown outcomes, then expires after bounded TTL", async () => {
    let now = 0;
    const guard = new InstanceInquiryGuard(() => now);
    await guard.claim("k", "h", "t", 999999);
    await guard.finish("k", "unknown");
    expect(await guard.claim("k", "h", "t", 86400)).toEqual({ state: "failed" });
    now = 86400000;
    expect(await guard.claim("k", "h", "t", 86400)).toEqual({ state: "claimed" });
  });
  it("rejects capacity instead of evicting live reservations", async () => {
    const guard = new InstanceInquiryGuard();
    for (let i = 0; i < 1000; i++) await guard.claim(String(i), "h", "t", 86400);
    expect(GUARD_LIMITS.records).toBe(1000);
    expect(await guard.claim("overflow", "h", "t", 86400)).toEqual({ state: "capacity" });
    expect(await guard.claim("0", "h", "t", 86400)).toEqual({ state: "in_flight" });
  });
  it("caps bursts at 10/minute and total at 30/10 minutes", async () => {
    let now = 0;
    const guard = new InstanceInquiryGuard(() => now);
    for (let i = 0; i < 10; i++) expect(await guard.hit(String(i), 5, 600)).toBe(true);
    expect(await guard.hit("extra", 5, 600)).toBe(false);
    now = 60001;
    for (let i = 0; i < 10; i++) expect(await guard.hit(`b${i}`, 5, 600)).toBe(true);
    now = 120002;
    for (let i = 0; i < 9; i++) expect(await guard.hit(`c${i}`, 5, 600)).toBe(true);
    expect(await guard.hit("global-extra", 5, 600)).toBe(false);
  });
  it("concurrent route submissions make just one fake-provider call", async () => {
    const guard = new InstanceInquiryGuard();
    let resolve: (value: SendResult) => void = () => {};
    const send = vi.fn(
      () =>
        new Promise<SendResult>((r) => {
          resolve = r;
        }),
    );
    const deps = { guard, mailReady: true, send };
    const first = handleInquiry(request(), deps);
    await vi.waitFor(() => expect(send).toHaveBeenCalledTimes(1));
    const duplicate = await handleInquiry(request(), deps);
    expect((await duplicate.json()).error).toBe("in_flight");
    resolve({ status: "accepted" });
    expect((await first).status).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
  });
});
