import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const output = path.join(process.cwd(), ".vercel/output");
const config = JSON.parse(await readFile(path.join(output, "config.json"), "utf8"));
if (config.version !== 3 || !Array.isArray(config.routes))
  throw new Error("Expected Vercel Build Output API v3 routing");
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const file = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(file) : [file];
      }),
    )
  ).flat();
}
const files = await walk(path.join(output, "functions"));
const metadata = files.filter((file) => file.endsWith("/.vc-config.json"));
if (metadata.length === 0) throw new Error("Missing Vercel function");
for (const file of metadata) {
  const fn = JSON.parse(await readFile(file, "utf8"));
  if (fn.runtime !== "nodejs22.x") throw new Error(`Unexpected runtime: ${fn.runtime}`);
}
console.log(`R13 Vercel output verified: ${metadata.length} Node22 function(s)`);
