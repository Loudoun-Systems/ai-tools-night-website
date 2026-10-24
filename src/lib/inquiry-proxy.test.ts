import { describe, expect, it, vi } from "vitest";
import { INQUIRY_GATEWAY, proxyInquiry } from "./inquiry-proxy.server";

const data = {
  kind: "contact",
  firstName: "QA",
  lastName: "Only",
  email: "qa@example.com",
  message: "Automated transport test with a fake sender.",
  locale: "en",
  idempotencyKey: "qa-proxy-000000000001",
};
const request = (value: unknown = data, origin = "https://wevegotnow.com") =>
  new Request("https://wevegotnow.com/api/public/inquiry", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });
const fake = (result: Response) => vi.fn<typeof fetch>().mockResolvedValue(result);
const response = (value: unknown, status = 200) => new Response(JSON.stringify(value), { status });

describe("Vercel inquiry gateway", () => {
  it("uses only its fixed gateway and does not forward browser credentials", async () => {
    const send = fake(response({ ok: true, ticketId: "WGN-ABCDEFGHJK" }));
    const result = await proxyInquiry(request(), send);
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({ ok: true, ticketId: "WGN-ABCDEFGHJK" });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[0]).toBe(INQUIRY_GATEWAY);
    const options = send.mock.calls[0]?.[1];
    expect(options?.headers).toEqual({
      "Content-Type": "application/json",
      Origin: new URL(INQUIRY_GATEWAY).origin,
    });
    expect(options?.redirect).toBe("error");
  });
  it("rejects cross-origin requests without a send", async () => {
    const send = fake(response({ ok: true }));
    expect((await proxyInquiry(request(data, "https://other.example"), send)).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });
  it("rejects caller-selected recipients and subjects", async () => {
    const send = fake(response({ ok: true }));
    expect(
      (
        await proxyInquiry(
          request({ ...data, to: "other@example.com", subject: "unexpected" }),
          send,
        )
      ).status,
    ).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
  it("bounds the streamed body before forwarding", async () => {
    const send = fake(response({ ok: true }));
    expect(
      (await proxyInquiry(request({ ...data, message: "x".repeat(20_000) }), send)).status,
    ).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });
  it("preserves genuine unavailable states without provider text", async () => {
    const send = fake(
      response({ ok: false, error: "unavailable", details: "private provider error" }, 503),
    );
    const result = await proxyInquiry(request(), send);
    expect(result.status).toBe(503);
    expect(await result.json()).toEqual({ ok: false, error: "unavailable" });
  });
  it("never fabricates success from malformed successful replies", async () => {
    const result = await proxyInquiry(request(), fake(response({ ok: true })));
    expect(result.status).toBe(502);
    expect(await result.json()).toEqual({ ok: false, error: "delivery_unknown" });
  });
  it("does not retry an uncertain transport failure", async () => {
    const send = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("interrupted"));
    const result = await proxyInquiry(request(), send);
    expect(send).toHaveBeenCalledTimes(1);
    expect(await result.json()).toEqual({ ok: false, error: "delivery_unknown" });
  });
});
