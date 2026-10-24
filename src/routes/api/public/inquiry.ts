import { createFileRoute } from "@tanstack/react-router";
import { handleInquiry } from "@/lib/inquiry-handler";

// Best-effort per-instance guard: deliberately not durable or shared.
import { InstanceInquiryGuard } from "@/lib/inquiry-guard";
let instanceGuard: InstanceInquiryGuard | undefined;
export const Route = createFileRoute("/api/public/inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (process.env["VERCEL"] === "1") {
          if (process.env["VERCEL_ENV"] !== "production")
            return Response.json(
              { ok: false, error: "unavailable" },
              { status: 503, headers: { "Cache-Control": "no-store" } },
            );
          const { proxyInquiry } = await import("@/lib/inquiry-proxy.server");
          return proxyInquiry(request);
        }
        const mail = await import("@/lib/inquiry-mail.server");
        return handleInquiry(request, {
          guard: instanceGuard ?? (instanceGuard = new InstanceInquiryGuard()),
          mailReady: mail.mailConfigured(),
          send: mail.sendViaGmail,
        });
      },
    },
  },
});
