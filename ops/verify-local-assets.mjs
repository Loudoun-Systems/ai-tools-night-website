import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const root = process.cwd();
const assets = await readdir(path.join(root, "src/assets"));
const manifest = JSON.parse(
  await readFile(path.join(root, "ops/local-asset-manifest.json"), "utf8"),
);
const byUrl = new Map(manifest.assets.map((asset) => [asset.url, asset]));
let checked = 0;
for (const filename of assets.filter((name) => name.endsWith(".asset.json"))) {
  const asset = JSON.parse(await readFile(path.join(root, "src/assets", filename), "utf8"));
  if (!asset.url.startsWith("/__l5e/assets-v1/") || asset.url.includes("..")) {
    throw new Error(`Unexpected managed asset path: ${filename}`);
  }
  const bytes = await readFile(path.join(root, "public", asset.url));
  const expected = byUrl.get(asset.url);
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  if (!expected || bytes.length !== asset.size || sha256 !== expected.sha256) {
    throw new Error(`Missing or mismatched local asset: ${filename}`);
  }
  checked += 1;
}
console.log(`Local managed assets verified: ${checked}`);
