import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import app from "../.vercel/output/functions/__server.func/index.mjs";

// Exercise the real compiled Vercel fetch entry, without browser automation,
// provider credentials, external calls or submitting website forms.
process.env.WGN_COMMIT_SHA = "portable-test";
const routes = [
  ["/healthz", 200],
  ["/sitemap.xml", 200],
  ["/", 200],
  ["/about", 200],
  ["/prompt-library", 200],
  ["/careers", 200],
  ["/contact", 200],
  ["/workshops", 200],
  ["/events", 200],
  ["/events/build-your-first-ai-automation-2026-11-08", 200],
  ["/events.html?utm_source=qa", 308],
  ["/this-route-does-not-exist", 404],
];
const report = [];
for (const [pathname, expected] of routes) {
  const response = await app.fetch(new Request(`https://wevegotnow.com${pathname}`), {});
  const body = await response.text();
  assert.equal(response.status, expected, pathname);
  if (pathname === "/healthz") {
    const health = JSON.parse(body);
    assert.equal(health.ok, true);
    assert.equal(health.release, "wgn-r13");
    assert.equal(health.commit, process.env.VERCEL_GIT_COMMIT_SHA ?? "portable-test");
  } else if (pathname === "/sitemap.xml") {
    assert.match(response.headers.get("content-type"), /application\/xml/);
    assert.match(body, /<loc>https:\/\/wevegotnow.com\/about<\/loc>/);
    assert.equal((body.match(/<loc>/g) ?? []).length, 51);
    assert.doesNotMatch(body, /lovable\.app/);
  } else if (expected === 200) {
    assert.match(body, /id="main"/);
    const canonical = body.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
    assert.ok(canonical, `Missing canonical for ${pathname}`);
    assert.equal(canonical[1], `https://wevegotnow.com${pathname}`);
    assert.doesNotMatch(body, /This page didn't load/);
    assert.doesNotMatch(body, /https:\/\/now-we-make-together\.lovable\.app/);
  }
  if (expected === 308) assert.equal(response.headers.get("location"), "/events?utm_source=qa");
  report.push({ pathname, status: response.status });
}
const manifest = JSON.parse(await readFile("ops/local-asset-manifest.json", "utf8"));
for (const asset of manifest.assets) {
  const bytes = await readFile(`.vercel/output/static${asset.url}`);
  assert.equal(bytes.length, asset.bytes, asset.url);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256, asset.url);
}
console.log(JSON.stringify({ routes: report, staticAssets: manifest.assets.length }, null, 2));
