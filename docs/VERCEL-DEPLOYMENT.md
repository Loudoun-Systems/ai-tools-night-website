# R13 — existing Vercel project release

Target repository: `Loudoun-Systems/ai-tools-night-website`.
Target existing project: Haytham's `ai-tools-night-website`.
Target public origin: `https://wevegotnow.com`.

Production release is authorized by Haytham's October 24 request. Access must still be available; authorization does not provide credentials or bypass organization restrictions. No new project, paid upgrade, database, DNS change or repository transfer is required.

## Preflight and deploy

1. Use an implementation-authorized session authenticated for this organization repository and existing Vercel project. Fetch current `main`; inspect concurrent changes before merging. Preserve the prior serving Vercel deployment ID/URL for rollback.
2. Import the verified R13 Git bundle or branch without rebuilding the design. Check it descends from the recorded parent. If main advanced, resolve against current source and rerun checks; do not overwrite another contributor's work.
3. Project settings: Framework **Other** (repository `framework: null`), root repository root, Node **22.x**, install **`bun install --frozen-lockfile`**, build **`bun run build:vercel`**, Output Directory override **OFF**. Remove old Vite/SvelteKit/output overrides from the project. Nitro emits `.vercel/output` automatically. Enable access to Vercel System Environment Variables so runtime `VERCEL`/`VERCEL_ENV` and `VERCEL_GIT_COMMIT_SHA` are available. Only the production environment may send inquiries.
4. Run all README checks and both GitHub CI jobs. Review the actual Vercel deployment output, not only GitHub status.
5. Open a PR, merge the verified branch into main and allow the existing Vercel Git integration to build Production. If auto-domain assignment is off, promote that exact successful deployment to the existing production domains. Do not change DNS or create a second project.
6. Confirm `/healthz` reports `release: wgn-r13` and the merged deployed SHA. Check HTTPS root/www, EN/ES, home, community, workshops, event detail, prompt library, careers, contact and legacy redirects on public production.
7. Inspect actual desktop/mobile screenshots: 23-second birthday sequence loops with no playback UI/banner; poster autoplay/controls/readable copy; brand colors; Community spacing; no overflow/broken assets. Check normal and reduced motion.
8. Confirm registration links still lead to existing Google Form / Meetup. With authorization, send one clearly labelled QA contact inquiry, verify ticket in Gus's mailbox and CC Haytham, and do not retry an unknown outcome. A successful API response alone is not proof of inbox delivery.

## Runtime dependencies and limits

No Google/OpenRouter secrets or SQLite path belong in Vercel for this release. On Vercel Production the API forwards validated requests to `https://now-we-make-together.lovable.app/api/public/inquiry` using one 14-second attempt. That already-owned published Lovable app retains the Gmail connection. Preview returns unavailable and does not send mail. Keep the gateway published; if it is unavailable, show an honest error rather than success. No incoming cookies/auth headers or caller-selected URLs are forwarded.

The gateway's deduplication/rate protection is per instance and memory-bound. It is not a persistent ticket database or a guarantee against duplicates after a restart. No new database or spreadsheet has been provisioned.

## Rollback

If the exact public release fails, use Vercel to promote the recorded previously serving deployment back to the same production domains. Do not delete it, change DNS, or rewrite Git history. Verify the restored public site and record the failed/new/restored deployment IDs. Revert application changes by normal Git commit if needed. Keep the separate Lovable Gmail gateway live unless its own integration is the verified cause.

## Evidence

Distinguish local tests, auxiliary Lovable visual review and actual Vercel production receipts. Record exact commit, Vercel deployment ID/URL, public health response, screenshots, API status and mailbox readback (if tested). Never report a release completed solely because the PR merged.
