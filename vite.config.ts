import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Canonical repository build: public TanStack/Nitro plugins and Vercel Build Output API.
export default defineConfig({
  define: {
    "import.meta.env.VITE_PUBLIC_SITE_ORIGIN": JSON.stringify("https://wevegotnow.com"),
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    nitro({
      preset: "vercel",
      ...(process.env["VERCEL_ENV"] === "preview"
        ? { routeRules: { "/**": { headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" } } } }
        : {}),
    }),
    react(),
  ],
});
