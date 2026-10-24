import { describe, expect, it, vi, afterEach } from "vitest";
import { buildRawMessage, sendViaGmail, MAIL_TIMEOUT_MS } from "./inquiry-mail.server";
const d = {
  kind: "contact" as const,
  firstName: "Alex",
  lastName: "Example",
  email: "alex@example.com",
  message: "Fake test only, no actual email.",
  locale: "en" as const,
  idempotencyKey: "r13-test-key-0001",
};
const at = new Date("2026-10-24T22:40:00Z");
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
describe("Gmail transport with fake provider only", () => {
  it("encodes genuine fixed Cc and validated visitor Reply-To", () => {
    const raw = buildRawMessage(d, "WGN-TEST234567", at);
    const decoded = atob(raw.replace(/-/g, "+").replace(/_/g, "/"));
    expect(decoded).toContain(
      "To: gus@myguygus.com\r\nCc: haytham@lsmp.video\r\nReply-To: alex@example.com",
    );
  });
  it("never retries ambiguous 5xx and sanitizes provider payloads", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const provider = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response("private-provider-detail", { status: 503 }));
    expect(await sendViaGmail(d, "WGN-TEST234567", at, provider)).toEqual({ status: "unknown" });
    expect(provider).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(log.mock.calls)).not.toContain("private-provider-detail");
  });
  it("aborts after exactly 10 seconds, records unknown and does not resend", async () => {
    vi.useFakeTimers();
    vi.spyOn(console, "error").mockImplementation(() => {});
    const provider = vi.fn<typeof fetch>(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => reject(new Error("aborted")));
        }),
    );
    expect(MAIL_TIMEOUT_MS).toBe(10000);
    const pending = sendViaGmail(d, "WGN-TEST234567", at, provider);
    await vi.advanceTimersByTimeAsync(10000);
    expect(await pending).toEqual({ status: "unknown" });
    expect(provider).toHaveBeenCalledTimes(1);
  });
});
