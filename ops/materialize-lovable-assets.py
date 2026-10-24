"""Recover public managed artwork once; commit the resulting public files.

Vercel builds verify these local files and do not download assets at build time.
"""

import concurrent.futures
import hashlib
import json
from pathlib import Path
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://now-we-make-together.lovable.app"


def materialize(pointer_path):
    pointer = json.loads(pointer_path.read_text())
    url = pointer["url"]
    if not url.startswith("/__l5e/assets-v1/") or ".." in url:
        raise ValueError(f"Unexpected asset path: {pointer_path.name}")
    destination = ROOT / "public" / url.lstrip("/")
    destination.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(ORIGIN + url, timeout=30) as response:
        data = response.read()
    if len(data) != pointer["size"]:
        raise ValueError(f"Asset length mismatch: {pointer_path.name}")
    destination.write_bytes(data)
    return {
        "url": url,
        "path": destination.relative_to(ROOT).as_posix(),
        "bytes": len(data),
        "sha256": hashlib.sha256(data).hexdigest(),
    }


if __name__ == "__main__":
    pointers = list((ROOT / "src/assets").glob("*.asset.json"))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        assets = list(pool.map(materialize, pointers))
    manifest = {"source_origin": ORIGIN, "assets": sorted(assets, key=lambda a: a["url"])}
    (ROOT / "ops/local-asset-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Materialized {len(assets)} public managed assets")
