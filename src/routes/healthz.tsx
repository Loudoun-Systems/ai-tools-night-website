import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/healthz")({
  server: {
    handlers: {
      GET: () =>
        Response.json(
          {
            ok: true,
            release: "wgn-r13",
            commit:
              process.env["VERCEL_GIT_COMMIT_SHA"] ?? process.env["WGN_COMMIT_SHA"] ?? "local",
          },
          { headers: { "Cache-Control": "no-store" } },
        ),
    },
  },
});
