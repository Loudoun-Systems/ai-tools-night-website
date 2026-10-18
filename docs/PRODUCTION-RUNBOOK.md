# Production release and rollback runbook

## Current target: Haytham's existing Vercel project

Use [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md) for the exact account/Git/build/environment/preview/production-promotion procedure. This supersedes the earlier VPS/SSH prerequisite. PR #1 is merged; compatibility work belongs to a follow-up PR. The canonical repository remains under Loudoun-Systems. There is no production deployment merely because GitHub CI passed.

The default Node 22 Vercel build excludes local Bun/SQLite/provider implementation and keeps forms/chat disabled in both preview and production. No shared database is needed for this disabled first release. No in-memory or ephemeral SQLite replacement is allowed for a later enabled integration release. Bun remains the local package/test tool; standalone fixture builds require explicit `bun run build:local` and are blocked on Vercel.

## Authorization and rollback boundary

Publishing to `https://wevegotnow.com` and specifically necessary website routing changes are already authorized. A separate staging server/domain is not required. No plan, credit or database purchase is approved. Preserve all design/assets, existing Forms/response tabs/QRs/follow-up automations, email DNS and unrelated applications.

Before reconnecting Git, privately record the actual current production deployment URL/ID, project account, root/www domain assignments and redirect behavior. Turn off automatic custom-domain assignment before any production candidate build, or use the documented staged-production workflow with normal authorized local Vercel sign-in if that control is unavailable. Keep the current serving deployment intact for rollback. Do not request a raw token in chat.

Prior public evidence found Cloudflare routing to a legacy Vercel site, and historical GitHub deployment SHA `7dfd58320f2e880a63336d1fd0452c27a42bf1d5`. That historical record is **not** proof of the deployment currently receiving the domain; obtain the actual owner-side rollback identity rather than guessing from proxied DNS.

## Release acceptance

Require passing exact-commit GitHub checks and an actual Vercel preview of the adaptation branch before merging it. After merge, build/test the exact merged commit with Production variables while auto-assignment remains off; verify the candidate deployment URL, health SHA, HTTPS, important routes, legacy redirects/query preservation, images, desktop/mobile, EN/ES, prompt controls, disabled APIs/UI, and absence of staging banners/noindex in production. Promote only that verified Production build to the existing domain. Then repeat external root/www/live acceptance and capture distinct live screenshots.

No provider success may be claimed: production intake mapping/exclusion is unresolved, and the US$0.25 / 10-call benchmark approval is not public-chat funding. Preserve these boundaries even when private credential files exist.

## Rollback

On failed live acceptance, immediately restore/promote the privately captured previous working Vercel deployment and read back domain assignments; verify its HTTPS content and redirects externally. If any website-specific DNS/routing was changed, restore only those exact captured values. Preserve mail/unrelated records, deployment history and repository history. Do not delete the previous deployment, reset Git history or invent a successful restoration.

If no hosting/routing write occurred, no rollback is needed. Report prepared/previewed/merged/deployed/promoted states separately.
