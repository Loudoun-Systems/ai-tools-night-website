# Production release and rollback runbook

## Authorization and current delivery status

Production publishing to `https://wevegotnow.com` and the narrowly necessary website DNS/routing changes are authorized. No separate remote staging environment is required. This document is an operator procedure, **not evidence that a remote deployment occurred**. GitHub merge does not publish this application; the legacy Vercel Git connection is disconnected.

No new hosting, credits or paid services may be purchased. Do not reuse unrelated application deployment secrets or change other applications. Keep the existing Vercel deployment and its aliases intact until the replacement is verified and a later retention decision is approved.

## Existing rollback baseline

The pre-change domain served the legacy site through Cloudflare and Vercel. Cloudflare nameservers are `marty.ns.cloudflare.com` and `molly.ns.cloudflare.com`. The latest successful historical GitHub Production deployment is ID `4284660792`, SHA `7dfd58320f2e880a63336d1fd0452c27a42bf1d5`, URL:

`https://ai-tools-night-website-1mmen9a53-haythamabouelfaids-projects.vercel.app`

That historical deployment is a rollback reference, not independent proof of the currently selected Vercel alias. The authorized hosting operator must export the actual current project/domain aliases and Cloudflare record IDs, origin values, proxy flags, TTLs and website redirect rules before changing them. Public proxied A records reveal Cloudflare edges, **not the origin to restore**. The public DNS/HTTP/certificate/GitHub snapshot is in the shared release evidence; it is not a full authoritative zone export.

Preserve Google Workspace MX, SPF, verification TXT, DKIM, DMARC and every unrelated record. No Forms, response tabs, QR links, Apps Script triggers or follow-up automations are changed by this release.

## Required actual hosting access

An authorized operator must supply an existing approved target, scoped deployment user/identity and verified host key, persistent data directory, service manager and reverse-proxy permissions. An authenticated operator can execute this procedure instead of sharing credentials. Website-specific Cloudflare zone access is needed only if routing changes require it. No suitable hosting credential or connected deployment operator has yet been verified from this workhorse.

The unchanged application requires Bun `>=1.3.0` with `bun:sqlite`, a long-running process, and local persistent SQLite-compatible storage. Vercel serverless/ephemeral filesystems do not satisfy those requirements unchanged. Do not deploy this Bun build there as if Node/serverless compatible. A stateless/database adaptation would require implementation, tests and a reviewed storage service first.

## Preflight before any routing change

1. Export the authoritative account configuration above; record the rollback owner and exact restoration values. Reserve an unused loopback port without stopping another application.
2. On the target, run `bun --version` and a `bun:sqlite` open/write/read probe. Confirm the absolute SQLite data path is on a persistent local volume, outside all release directories, not `/tmp`, an ephemeral container layer, a serverless instance or SQLite-incompatible network filesystem. Prove the probe survives two independent processes and a service/container restart; capture outputs and volume configuration. Local unit tests are not proof of target-host persistence.
3. Create an immutable release directory at the exact merged SHA. Install with `bun install --frozen-lockfile`, then run `bun run qa`, `bun run test:e2e` and `bun run test:production`. Read GitHub checks on that exact merged SHA. Do not use an unrelated branch tip or `latest` artifact.
4. Keep any private runtime file outside source/build directories, owner-readable only, and outside Git. This release needs **no provider credentials** because public forms/chat are disabled. Set the following reviewed environment values (paths/port are operator-selected, not defaults to apply blindly):

```text
NODE_ENV=production
WGN_ENV=production
WGN_FORMS_MODE=disabled
WGN_CHAT_MODE=disabled
WGN_CHAT_ENABLED=false
WGN_CHAT_KILL_SWITCH=true
WGN_AUTOMATION_EXCLUSION_VERIFIED=false
WGN_TEST_DATA_ONLY=true
ORIGIN=https://wevegotnow.com
WGN_ALLOWED_ORIGINS=https://wevegotnow.com
HOST=127.0.0.1
PORT=<verified-unused-port>
WGN_RELEASE_SHA=<exact-merged-40-character-sha>
WGN_SQLITE_PATH=<verified-absolute-persistent-path>/wgn.sqlite
WGN_RATE_LIMIT_SALT=<private-random-value>
```

5. Start a new, uniquely named managed process using `bun run build/index.js`; do not overwrite an unrelated PM2/service entry. Require `/healthz` to return the exact SHA, environment `production`, forms `disabled`, chat `disabled`. Health is app liveness/config identity, **not** a storage durability check.
6. Verify the new process over loopback and a controlled Host-header/reverse-proxy probe. Do not create an unapproved staging domain. Only after candidate smoke tests pass, atomically update the website-specific proxy/routing. Use TLS verification, preserve canonical `www` to apex and HTTP to HTTPS redirects, and preserve the existing origin/deployment for rollback. Read back the precise changed account objects.
7. Verify externally: HTTPS and certificate chain; exact health SHA; 19 public routes; legacy 308 redirects and queries; desktop/mobile width and image decoding; EN/ES switching/persistence; prompt interactions; assets/sitemap/canonicals; no staging banner; no staging-only robots meta/header. Capture live screenshots distinctly from local production-mode screenshots.

## Integration state in this release

Production forces both providers to `disabled`, even if fixture/QA/benchmark environment flags remain. The UI shows bilingual unavailable messages and offers no personal-data entry/chat-send control. Direct API requests return HTTP 503 without success receipts, fake AI answers, database submission claims or provider calls. Old local fixture receipts are not restored in production.

Google credentials have previously authenticated against the master workbook, but the existing adapter is synthetic-staging/QA-only. The current bound automation exclusions and production destination mapping are not verified. Do not enable or adapt production intake without that evidence and real acknowledgement testing in a safe non-follow-up destination.

The US$0.25 lifetime / 10-request permission is only for a bounded benchmark (1,500 input + 240 output tokens per call; 17,400 total tokens), contingent on independently verified dedicated-key cap and no reset. It does not authorize public chat, purchases or renewal. Do not put that key into public production runtime or treat budget metadata flags as proof of an actual provider cap.

## Rollback on any failed live acceptance check

Stop the rollout immediately. Restore only the captured website-specific Cloudflare records/rules, Vercel alias or reverse-proxy upstream to their exact prior values. Keep the old Vercel deployment serving; do not delete/rebuild it. Verify the old HTTPS page and canonical redirects externally, and read back restored account values. If using release symlinks for a later Bun-to-Bun upgrade, restore the previous immutable release link/service definition, retaining the shared SQLite path; back up SQLite via the online backup API before any migration, never copy an active WAL database unsafely. Do not drop data or reset Git history to roll back routing.

No restoration is needed when no hosting or routing write has occurred. Report the failed criterion and the restored old target, not a claim that merging main made the new site live.
