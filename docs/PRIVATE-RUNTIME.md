# Private WGN runtime and read-only provider preflight

This continues PR #1; it does not replace or redesign the R5 site. Keep production publishing, root/www/email DNS and existing follow-up automations on hold.

## Local credential mapping

The operator supplies these two owner-only regular files outside Git and shared Drive:

- `~/.config/wgn/secrets/wgn-sheets-service-account.json`
- `~/.config/wgn/secrets/openrouter-api-key.txt`

Run from this repository:

```sh
bun ops/private-runtime.ts prepare
bun ops/private-runtime.ts check
```

`prepare` reads credentials in-process, requires owner-only files, maps the Google email/private key and dedicated website key directly into `~/.config/wgn/runtime.env.json` (0600), and creates a private persistent-state directory. Existing settings are retained; conflicting credential mappings cause failure instead of silent replacement. No values are printed. Safe defaults leave forms/chat in fixture mode, all verification gates closed, and the kill switch on. Default numerical caps are templates, NOT evidence of an approved test budget. Neither command starts a provider, writes a Sheet, creates tabs, runs inference, or changes hosted configuration.

`check` makes read-only calls to the exact master workbook, authenticated OpenRouter key metadata and public model catalog. Its JSON output contains no credentials, key labels, lead rows or provider exception objects. A null OpenRouter limit is explicitly treated as uncapped, not as approved budget. Exit 3 means live-test prerequisites remain unresolved. The tool deliberately does not certify current Apps Script or external follow-up exclusion; that requires actual current-code/trigger/mapping evidence, not a boolean copied from an old document. It is not an automatic provider-activation tool.

## Local fixture preview with private configuration

After a clean build, stop only the previously identified WGN preview that occupies port 4177, then run:

```sh
bun ops/private-runtime.ts preview
```

This explicitly binds `127.0.0.1:4177`, forces fixture providers and closed safety gates even if the private file is later edited, uses the private persistent SQLite path, and reports the current Git SHA in `/healthz`. It is LOCAL ONLY, not remote staging. Do not use this command to enable live providers or expose the Mac publicly.

## Remaining integration gates

Before creating any of the five `Website QA — ...` tabs or appending synthetic records, inspect the CURRENT bound Apps Script, installed triggers, dashboard/recovery logic and active external follow-up mappings. Confirm exclusion of all exact QA destinations and `SYSTEM TEST` / `Test-NoFollowUp` records. Archived script and unrelated WGN social-publishing mappings cannot prove this. Preserve every original Form, response tab, registry and QR link. If current evidence cannot be obtained, remain read-only.

Only then create the exact 18-column headers required by `GoogleSheetsProvider`, run one synthetic submission for each of its five form types, read back every exact destination, replay the same idempotency key and verify no second append. A fixture response or successful OAuth is not a real-write receipt.

For paid visitor-chat tests, the dedicated application key needs a verified finite positive spend limit, usable remaining budget, owner-approved numerical test budget and request/token/output caps. Use only a currently available allowlisted model; never use the visitor key for development. Authenticate/read metadata before any completion request. Do not flip safety flags solely because credential files exist. A management key is not a visitor application key.

## Hosting

Use the exact-SHA procedure in `STAGING-RUNBOOK.md` only after identifying the authorized server, scoped login, independently verified SSH host key, isolated directory/process, available port and reviewer route. Bun plus a persistent SQLite volume is required. Existing serverless Vercel access alone is not compatibility: do not deploy this adapter/SQLite application unchanged, provision paid resources, or reconnect the legacy production Git project.
