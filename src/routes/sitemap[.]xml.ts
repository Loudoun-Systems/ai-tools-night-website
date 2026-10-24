import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/content/published-site";
import { events } from "@/content/site";
import { prompts } from "@/content/prompts-tracks";

const pages = [
  "/",
  "/about",
  "/workshops",
  "/events",
  "/prompt-library",
  "/projects",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
  "/code-of-conduct",
  ...events.map((event) => `/events/${event.slug}`),
  ...prompts.map((prompt) => `/prompt-library/${prompt.slug}`),
];
const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...new Set(pages)].map((page) => `<url><loc>${escapeXml(siteUrl(page))}</loc></url>`).join("")}</urlset>`,
          {
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
            },
          },
        ),
    },
  },
});
