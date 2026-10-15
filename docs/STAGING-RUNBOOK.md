# Isolated WGN staging runbook

Production, root/www/email DNS, the legacy Vercel project and every other PM2 process remain out of scope. This runbook is for the first manual deployment of one passing exact SHA to one verified host. No host is currently configured or implied.

## Preconditions

1. Independently verify the server identity, approved SSH user and host-key fingerprint. Obtain the exact `known_hosts` line through the approved channel; never use `StrictHostKeyChecking=no` or accept a key interactively.
2. Confirm `/srv/apps/ai-tools-night-website-staging` (or another explicitly approved isolated root), process name `ai-tools-night-website-staging`, and `127.0.0.1:4175` do not collide. Abort on any port conflict.
3. Review the exact candidate SHA and require clean `lint`, `check`, `test`, `build`, runtime/full audits and browser QA receipts for that SHA.
4. Copy `ops/staging.env.example` outside Git, set a strong rate-limit salt, set `ORIGIN` to the exact private reviewer origin, and keep both providers in fixture mode. Do not use a wildcard origin and do not add Google or OpenRouter credentials until their separate safety gates are verified. The deploy script sets `WGN_RELEASE_SHA` from the reviewed commit; do not override it in the env file.

## First deploy

Set the following in the operator shell without committing values:

```sh
export WGN_CANDIDATE_SHA=<40-character-reviewed-sha>
export WGN_STAGING_HOST=<verified-hostname>
export WGN_STAGING_USER=<approved-user>
export WGN_STAGING_HOST_KEY='<verified-host known_hosts line>'
export WGN_STAGING_ENV_FILE=<absolute-path-to-reviewed-fixture-env>
export WGN_DEPLOY_SCRATCH_ROOT=<workspace-owned-scratch-directory>
export WGN_REMOTE_APP_ROOT=/srv/apps/ai-tools-night-website-staging
./ops/deploy-staging.sh
```

The script archives only the named commit, pins the host key, refuses an occupied port, creates a SHA-specific release, runs frozen install plus checks remotely, starts only `ai-tools-night-website-staging`, and requires `/healthz` to return the same 40-character release SHA. It does not change a proxy, DNS, another process or production.

## Reviewer access

After a successful host deployment, use an approved SSH tunnel with the same pinned known-hosts file:

```sh
ssh -N -L 4175:127.0.0.1:4175 -o StrictHostKeyChecking=yes -o UserKnownHostsFile=<approved-known-hosts-file> <approved-user>@<verified-host>
```

Review the exact private origin configured as `ORIGIN`. When the service itself is reviewed over a direct loopback tunnel, use `http://127.0.0.1:4175` for both the browser URL and `ORIGIN`. This loopback address is not a public staging URL.

## Rollback

For the first deployment, stop only `ai-tools-night-website-staging`. For later releases, verify the prior exact SHA, repoint only the staging `current` symlink and reload only that named process. Never run a global PM2 restart or edit shared proxy/DNS configuration from this runbook.

## Provider activation gates

- Sheets stays fixture-only until the scoped website credential exists, every QA tab exists, and current bound scripts plus external automations are verified to exclude those tabs and labelled records.
- Chat stays fixture-only until a dedicated server-only WGN key, approved budget, verified external account cap, one allowlisted candidate model, and explicit daily request/token/output caps are supplied and tested. No model has been selected by benchmark. Only after those reviews may an operator set `WGN_CHAT_ENABLED=true`, `WGN_CHAT_KILL_SWITCH=false`, `WGN_CHAT_CAP_VERIFIED=true`, `WGN_CHAT_ACCOUNT_CAP_VERIFIED=true`, and `WGN_CHAT_BUDGET_APPROVED=true` together in the staging-only secret profile.
- An uncertain Google append remains `uncertain` in SQLite and is never automatically re-appended. Operators reconcile it before any manual retry.
