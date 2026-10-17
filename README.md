# We've Got Now — R5 staging application

SvelteKit 2 + Svelte 5 application for We've Got Now / AI Tools Explorers Night. The server build uses `svelte-adapter-bun`; Bun is the package manager, test runner, SQLite runtime and production server runtime.

## Local development

```sh
bun install --frozen-lockfile
bun run dev
```

The safe default is staging fixture mode. Form submissions create local fixture receipts and chat uses the checked-in public knowledge rules. Neither path makes external calls unless the corresponding provider mode and every safety gate are explicitly configured.

## Checks

```sh
bun run lint
bun run check
bun run test
bun run build
bun run test:http
bun run test:e2e
```

The built server starts with:

```sh
WGN_ENV=staging WGN_FORMS_MODE=fixture WGN_CHAT_MODE=fixture ORIGIN=http://127.0.0.1:4175 HOST=127.0.0.1 PORT=4175 bun run build/index.js
```

## Integration safety

- Google mode is QA-only. The server owns the tab mapping, always uses `RAW`, requires labelled test data, and fails closed until automation exclusion and scoped credentials are verified.
- OpenRouter mode uses a dedicated server-only key, candidate-model allowlist, explicit approved-budget and external-account-cap gates, durable conservative input/output token reservations, and a kill switch. No tools are sent and no fallback/model benchmark is claimed.
- SQLite stores atomic idempotency, uncertain outcomes, rate limits and chat cap reservations. An uncertain Sheets result is not automatically re-appended.
- The current fixture stage does not claim a real lead, seat, job application, presentation slot or model response.

See `docs/STAGING-RUNBOOK.md` for the isolated exact-SHA deployment procedure and `docs/PRIVATE-RUNTIME.md` for private local credential mapping, read-only provider receipts, and the fixture-only local preview.
