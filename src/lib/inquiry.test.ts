import { describe, expect, it } from "vitest";
import {
  buildTicket,
  inquirySchema,
  INQUIRY_ROUTING,
  isSameOrigin,
  ticketSubject,
} from "./inquiry";

const base = {
  kind: "contact",
  firstName: "Alex",
  lastName: "Example",
  email: "alex@example.com",
  message: "Hello, I would like to learn more.",
  locale: "en",
  idempotencyKey: "abcd1234-ef56-7890",
};

describe("inquiry validation", () => {
  it("accepts the four basic contact fields", () => {
    expect(inquirySchema.safeParse(base).success).toBe(true);
  });
  it("requires first name, last name, email and message", () => {
    for (const f of ["firstName", "lastName", "email", "message"]) {
      expect(inquirySchema.safeParse({ ...base, [f]: "" }).success).toBe(false);
    }
  });
  it("rejects a browser-supplied subject, recipient or cc", () => {
    expect(inquirySchema.safeParse({ ...base, subject: "x" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...base, to: "evil@example.com" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...base, cc: "evil@example.com" }).success).toBe(false);
  });
  it("rejects header injection in email and names", () => {
    expect(
      inquirySchema.safeParse({ ...base, email: "a@example.com\r\nBcc: x@example.com" }).success,
    ).toBe(false);
    expect(inquirySchema.safeParse({ ...base, firstName: "Al\nBcc: x" }).success).toBe(false);
  });
  it("rejects unknown kinds and non-http urls", () => {
    expect(inquirySchema.safeParse({ ...base, kind: "newsletter" }).success).toBe(false);
    expect(
      inquirySchema.safeParse({ ...base, kind: "careers", url: "javascript:alert(1)" }).success,
    ).toBe(false);
    expect(
      inquirySchema.safeParse({ ...base, kind: "careers", url: "https://example.com/me" }).success,
    ).toBe(true);
  });
  it("does not accept a url on the basic contact form", () => {
    expect(inquirySchema.safeParse({ ...base, url: "https://example.com" }).success).toBe(false);
  });
  it("enforces message length limit of 3000", () => {
    expect(inquirySchema.safeParse({ ...base, message: "a".repeat(3001) }).success).toBe(false);
  });
});

describe("ticket", () => {
  it("routes only to the fixed team addresses", () => {
    expect(INQUIRY_ROUTING).toEqual({ to: "gus@myguygus.com", cc: "haytham@lsmp.video" });
  });
  it("escapes visitor HTML and includes the request id", () => {
    const d = inquirySchema.parse({ ...base, message: "<script>alert(1)</script> hi there" });
    const t = buildTicket(d, "WGN-TEST000001", new Date("2026-10-23T00:00:00Z"));
    expect(t.html).not.toContain("<script>");
    expect(t.html).toContain("&lt;script&gt;");
    expect(t.text).toContain("WGN-TEST000001");
    expect(ticketSubject(d, "WGN-TEST000001")).toBe("[WGN Contact] Alex Example · WGN-TEST000001");
  });
});

describe("same origin", () => {
  it("only allows the site's own origin", () => {
    expect(isSameOrigin("https://a.app/api", "https://a.app", null)).toBe(true);
    expect(isSameOrigin("https://a.app/api", "https://evil.app", null)).toBe(false);
    expect(isSameOrigin("https://a.app/api", null, null)).toBe(false);
    expect(isSameOrigin("https://a.app/api", "http://a.app", null)).toBe(false);
    expect(isSameOrigin("https://a.app/api", "https://a.app:8443", null)).toBe(false);
    expect(isSameOrigin("https://a.app/api", "null", null)).toBe(false);
  });
});
