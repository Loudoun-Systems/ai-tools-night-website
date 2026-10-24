# We've Got Now — R13

The complete bilingual Lovable design is implemented with React, TypeScript and TanStack Start. Nitro produces Vercel Build Output API v3 functions using Node 22. This replaces the old SvelteKit/static presentation while preserving its Git history, legacy URL redirects, workshop registration links and all 37 source prompts.

## Develop and verify

Use Node 22 and Bun 1.3.14:

```sh
bun install --frozen-lockfile
bun run dev
bun run lint
bun run check
bun run test
bun run build:vercel
bun run test:http
bunx playwright install --with-deps chromium
bun run test:browser
bun audit
```

The compiled HTTP checks exercise actual Vercel function output and verify 20 locally hosted image hashes. Browser tests use local output and intercept inquiry sends; they never send real emails. Browser evidence is not proof of a hosted production release.

## Content and inquiries

- Source content is in `src/content`; supporting images are materialized in `public/__l5e`. Do not replace confirmed workshop facts or registration URLs with invented details.
- The birthday workflow runs a 23-second loop without playback buttons. Reduced-motion preferences receive a readable static result.
- Poster rotation waits for decoded images; controls are below the artwork. Reduced-motion preferences stop automatic motion.
- Workshop registration stays on the existing Google Form / Meetup routes. No database or Sheet is required or created.
- Production inquiries use a fixed server-to-server proxy to the existing owned Lovable Gmail gateway. It sends HTML/plain-text tickets to `gus@myguygus.com`, CC `haytham@lsmp.video`. Credentials stay in the gateway; none are copied to GitHub or Vercel. The gateway must stay published and its Gmail connection enabled.
- The inquiry gateway has bounded, best-effort per-instance deduplication and rate limits. It is not durable/shared exactly-once processing. Ambiguous sends are never automatically retried.
- Vercel Preview rejects inquiries with HTTP 503. Automated checks use fake transports. The visitor chatbot is not reintroduced.

See [the production runbook](docs/VERCEL-DEPLOYMENT.md) for the existing-project release and rollback procedure.
