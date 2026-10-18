# WGN — existing Vercel project deployment

## Scope and release gate

Canonical repo: `Loudoun-Systems/ai-tools-night-website`. PR #1 is merged. Use Haytham's **existing** `ai-tools-night-website` Vercel project and retain its root/www domains and previous production deployment. Do not transfer/fork the repository, create a replacement project, purchase a plan/database, or change DNS merely to connect Git.

This follow-up adapts the completed design to Node serverless hosting. Preparing/passing GitHub CI or locally executing adapter output is **not an actual Vercel preview or production deployment**. Merge/promotion must wait for actual Vercel preview acceptance. No VPS/SSH access is needed.

## Implementation and storage boundary

- Default `bun run build` uses official `@sveltejs/adapter-vercel` **6.3.4**, compatible with the existing SvelteKit 2 line. Adapter 7 requires SvelteKit 3 and is intentionally not used.
- Runtime is `nodejs22.x`; `engines.node` is `22.x`. Bun 1.3.14 remains the package manager/test runner. `bun.lock` is canonical; the stale legacy npm lock was removed.
- `$integrations` resolves at build time to `integrations.disabled.ts`. That module imports no provider/database code. HTTP hashing is a separate pure Node module. Forms/chat handlers return honest HTTP 503 unavailable responses after existing request safety checks, without receipts, answers, private-file reads, provider requests or SQLite writes.
- `ops/verify-vercel-output.mjs` recursively checks all unique generated function bundles, their runtime metadata, and absence of retained SQLite/provider implementation. A failed assertion fails the build.
- The old root `api/chat.js` and `api/submit.js` are preserved under `legacy-static/api/`, not exposed as independent Vercel functions. `.vercelignore` also excludes the retired static implementation and local/private artifacts.
- `WGN_BUILD_TARGET=bun` is an **explicit local-only** opt-in used by `build:local` and the original fixture suite. The config rejects it when `VERCEL=1`. The retained SQLite constructor independently refuses Vercel. No in-memory replacement or ephemeral `/tmp` database was introduced.
- Re-enabling integrations later requires separately verified shared durable storage, provider/automation approvals, real destination acknowledgements and public-chat funding. Existing local durability/idempotency/budget tests remain intact.
- Original logo, hero, six supporting images, bilingual content and visual components are unchanged. Workshop dates/prices remain pending.

## Exact next human action — before reconnecting Git

1. Sign into Vercel as Haytham. Open the account/team containing the EXISTING `ai-tools-night-website` project. In **Settings → Domains**, confirm `wevegotnow.com` and `www.wevegotnow.com` belong there. Privately record the current production deployment URL/ID and domain/redirect assignments for rollback. Do not delete or rebuild it.
2. Verify the existing plan permits this business use. Hobby is for personal/noncommercial use. If an upgrade would be required, stop for specific spending approval; none is granted by this PR.
3. Before reconnecting Git, open **Settings → Environments → Production → Branch Tracking** and turn **Auto-assign Custom Production Domains OFF**, if available. Record the selected behavior. If unavailable, do not reconnect/push main into an uncontrolled automatic cutover: use authorized normal local Vercel sign-in and the documented staged-production CLI flow instead.
4. Resolve GitHub access if needed: Haytham's Vercel-connected GitHub identity must be an Owner/Member of Loudoun-Systems with repository access, not only an Outside Collaborator. A Loudoun-Systems owner installs/approves the Vercel GitHub app with access to **only this repository**. Do not move/copy the repository as a workaround.
5. Then use **Settings → Git → Connected Git Repository → Connect** and select `Loudoun-Systems/ai-tools-night-website`. Retain production branch `main`. Request a **Preview deployment of `feat/wgn-vercel-compatibility`**, not a production-domain deployment of old main.

## Committed build settings

| Setting           | Required value                                                               |
| ----------------- | ---------------------------------------------------------------------------- |
| Framework preset  | SvelteKit (current preset, JSON slug `sveltekit-1`, NOT legacy SvelteKit v0) |
| Root directory    | Repository root (`.`)                                                        |
| Node.js version   | 22.x                                                                         |
| Install command   | `bun install --frozen-lockfile`                                              |
| Build command     | `bun run build`                                                              |
| Output directory  | Leave override OFF; adapter manages `.vercel/output`                         |
| Start command     | None — do NOT use `build/index.js`, PM2 or the local preview command         |
| Production branch | `main`, custom-domain auto-assignment initially OFF                          |

`vercel.json` commits the framework/install/build settings. Remove only the verified obsolete dashboard overrides (blank build, output `.`, legacy framework/static serving). Do not add `bunVersion`/Bun Functions beta configuration. Enable Vercel's automatic System Environment Variables exposure; Git metadata must reach the functions for release identity.

## Nonsecret environment variables and scopes

Set these explicitly in Vercel's UI; they need no secret values:

| Variable               | Production   | Preview    |
| ---------------------- | ------------ | ---------- |
| `WGN_ENV`              | `production` | `staging`  |
| `WGN_FORMS_MODE`       | `disabled`   | `disabled` |
| `WGN_CHAT_MODE`        | `disabled`   | `disabled` |
| `WGN_CHAT_ENABLED`     | `false`      | `false`    |
| `WGN_CHAT_KILL_SWITCH` | `true`       | `true`     |
| `WGN_ALLOWED_ORIGINS`  | Omit/empty   | Omit/empty |

Do NOT set `WGN_BUILD_TARGET=bun`. No SQLite path, rate-limit salt, private local runtime file, Google credential, Sheet ID, OpenRouter key, chat-model flag or benchmark-cap override is needed. Preserve existing secrets privately; do not copy them into this release or logs. Closed integrations do not consume provider budget.

Vercel supplies `VERCEL=1`, `VERCEL_ENV`, and `VERCEL_GIT_COMMIT_SHA`; do not invent/manual-pin these values. Platform scope takes precedence over stale `WGN_ENV`. Both Vercel preview and production force disabled UI modes even if old fixture/provider flags remain. `/healthz` prefers a valid Vercel Git SHA over an old `WGN_RELEASE_SHA`; manually deployed non-Git candidates may explicitly supply their exact reviewed `WGN_RELEASE_SHA`. Missing/invalid identity reports `unverified`, not a made-up release.

Origin handling: the official adapter uses the incoming deployment request, so same-origin API validation works on each preview URL and on the live domain without wildcard origins. The local Bun-only `ORIGIN` variable is not a Vercel start setting. Production canonical/OG/sitemap URLs intentionally remain `https://wevegotnow.com`, including on noindex previews. The old `WGN_PUBLIC_ORIGIN` example is not read by current SEO code and is not required; setting it alone cannot change canonicals. Do not invent a preview wildcard/secret to solve origin checks. Preview gets staging/noindex notices; actual production gets neither staging banner nor staging-only noindex.

## Required actual Vercel preview acceptance

After account/Git connection, open the PR preview or use **Deployments → Create Deployment** with this adaptation branch. Capture its actual deployment URL, environment, Git SHA, framework/runtime and build log. Require build success including the artifact isolation assertion.

At that URL verify: `/healthz` exact branch SHA, staging scope, both modes disabled; all 19 public routes; dynamic event/prompt routes; all legacy 308 redirects with queries; sitemap/robots/assets; desktop/mobile images and no horizontal overflow; EN/ES persistence; prompt search/copy/edit; unavailable form/chat UI without PII entry; direct API HTTP 503 without fake receipts/answers. Confirm no retired `/api/submit` endpoint. Do not submit synthetic data into a real provider or call paid chat. Local tests are not proof of Vercel's hosting/edge/domain behavior.

Only after GitHub checks AND actual preview pass, merge the follow-up PR under existing release authorization. Build the exact merged SHA as a Production-environment deployment while domain auto-assignment stays OFF. Verify its own deployment URL, exact health SHA, production indexing/banner state, routes/assets/UI. Then promote that tested deployment to Current/Production in the SAME project. Verify root/www HTTPS, canonical redirects and exact live health SHA. Preserve current DNS unless Vercel reports a verified domain-specific mismatch; preserve mail/unrelated records.

If any live acceptance fails, immediately reassign/promote the captured previous working deployment in this project; restore only changed website-specific routing to captured values and verify externally. Keep both old/new deployment evidence. Merge alone is not deployment.

## Reproducible local/CI checks

```sh
bun install --frozen-lockfile
bun run qa
# Node 22 must be on PATH for the actual generated-handler tests:
bun run test:vercel
bun run test:vercel:preview
# Retained local fixtures/durable implementation, deliberately separate:
bun run build:local
bun run test:e2e
bun run test:production
```

The Vercel tests execute the actual generated Vercel Fetch handler under Node 22 through a loopback-only QA shim, with outbound fetch disabled, no private credentials, conflicting activation flags and a database path that must never be created. The shim serves emitted static files but does not emulate Vercel edge routing, TLS, plan limits or deployments. Node checks are necessary compatibility evidence, not a hosted preview.

Official references: https://svelte.dev/docs/kit/adapter-vercel ; https://vercel.com/docs/frameworks/full-stack/sveltekit ; https://vercel.com/docs/deployments/promoting-a-deployment ; https://vercel.com/docs/git/vercel-for-github ; https://vercel.com/docs/plans/hobby . Framework slug verified against Vercel's published framework catalog (`packages/frameworks/src/frameworks.ts`).
