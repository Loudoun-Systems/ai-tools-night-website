# Repository instructions

This canonical repository is a reviewed export of the WGN Lovable application, with an independent Vercel adapter. Automatic Git synchronization back to Lovable has not been established. Do not assume a GitHub push changes the Lovable project.

- Preserve existing Git history; never force-push production history.
- Keep canonical content separate from presentation. Preserve all 37 prompt templates and confirmed workshop content/links unless the user requests a content change.
- Use shared NightStage, Chapters and BirthdayFlow components and semantic color tokens. Respect reduced-motion preferences even when normal motion repeats automatically.
- Keep legacy URL redirects and their query strings.
- Public canonical and share URLs use `https://wevegotnow.com`.
- Inquiries use the fixed owned gateway from `src/lib/inquiry-proxy.server.ts` on Vercel Production. Preview sends are unavailable. Never accept caller-supplied recipients, copy credentials to this repo, or retry uncertain sends.
- No database, Google Sheet write, new registration form, public chatbot or paid infrastructure is needed for this release.
- Run lint, types, unit tests, Vercel build, compiled HTTP checks, browser checks and dependency audit for production changes. Never claim localhost tests prove an external deployment.
- Record exact deployed SHA and public route verification after release. Keep existing Vercel rollback deployment available.
