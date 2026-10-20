# We've Got Now — R5 application

SvelteKit 2 + Svelte 5. The completed R5 design/assets are preserved. The default build now targets Haytham's **existing Vercel project**, using the official Node 22 adapter. Repository ownership remains `Loudoun-Systems`.

## Vercel first release

```sh
bun install --frozen-lockfile
bun run qa
# With Node 22 on PATH:
bun run test:vercel
bun run test:vercel:preview
```

`bun run build` emits `.vercel/output` and verifies that the actual function bundles exclude local SQLite/Bun/provider implementation. Forms and chat remain honestly disabled in both public preview and production. No database, provider secret or paid public-chat budget is needed to publish the existing design. A local build/test pass is not a hosted Vercel deployment.

See [the exact existing-project Vercel setup and promotion checklist](docs/VERCEL-DEPLOYMENT.md). Record rollback identity and disable automatic custom-domain assignment **before** reconnecting Git. Actual Vercel preview checks must pass before merging/promoting the follow-up PR.

## Retained local fixture/durable implementation

```sh
bun run dev
# Explicit Bun-only standalone fixture build:
bun run build:local
bun run test:e2e
bun run test:production
```

Local development uses clearly labelled fixtures. The local Bun target retains atomic SQLite idempotency, uncertain-outcome handling, rate limits, multiprocess durability and conservative chat-budget reservations; it is rejected on Vercel. Never replace these with in-memory or ephemeral-disk controls when re-enabling providers later.

## Integration safety

- No fixture is represented as a real submission or AI answer. Disabled UI has no personal-data entry/send control; direct valid API calls return HTTP 503 without receipts/provider activity.
- Google integration remains retained QA-only code. Current automation exclusions, approved destination mapping and real acknowledgements are prerequisites to any later enabled release. Preserve Forms, response tabs, QR links and follow-up workflows.
- The bounded US$0.25 / 10-request benchmark approval is not public-chat funding. No visitor-provider call is required or made by the compatibility tests.
- Workshop dates/prices and paid openings remain unconfirmed; content is not changed by this adaptation.

`docs/PRODUCTION-RUNBOOK.md` links the current Vercel procedure. `docs/STAGING-RUNBOOK.md` is historical optional Bun-host guidance, not a required hosting path. `docs/PRIVATE-RUNTIME.md` covers local private credential mapping and read-only preflight, not Vercel configuration.
