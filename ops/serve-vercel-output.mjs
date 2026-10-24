import { createServer } from "node:http";
import { Readable } from "node:stream";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import app from "../.vercel/output/functions/__server.func/index.mjs";

const root = path.resolve(".vercel/output/static");
const mime = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".html": "text/html",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};
const port = Number(process.env.PORT ?? 4173);
createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? `127.0.0.1:${port}`}`);
    const file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file.startsWith(`${root}${path.sep}`)) {
      const info = await stat(file).catch(() => null);
      if (info?.isFile()) {
        res.writeHead(200, {
          "Content-Type": mime[path.extname(file)] ?? "application/octet-stream",
        });
        res.end(await readFile(file));
        return;
      }
    }
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      ...(["GET", "HEAD"].includes(req.method ?? "GET")
        ? {}
        : { body: Readable.toWeb(req), duplex: "half" }),
    });
    const response = await app.fetch(request, {});
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body && req.method !== "HEAD") Readable.fromWeb(response.body).pipe(res);
    else res.end();
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Preview request failed");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Compiled Vercel preview on http://127.0.0.1:${port}`),
);
