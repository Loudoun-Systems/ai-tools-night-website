# WGN R8 — neon experience

- made_by: ChatGPT@Team-Haytham
- asked_by: Haytham
- chat_link: unavailable in this session
- project: WGN visual experience and Vercel continuation
- date: 2026-10-21 (America/New_York)

R8 continues from the verified PR #5 head, not from the rejected live R6 design. It replaces the R7 cream panels and large empty intervals with a continuous midnight palette, cyan/violet/pink light, tighter page rhythm and imagery that shares the surrounding colors.

The opening is an integrated artwork composition with a gradient headline and concise actions. The next section has a working, keyboard-operable three-direction selector for meetups, workshops and prompts. A practical field guide and community chapter follow. Global spacing, footer, workshops, events, careers, projects, about, catalog and prompt editor follow the same dark visual system.

The composition takes visual cues from the coherent environment on Agaro and the restrained hierarchy/layering on Linear. WGN's layout, text and interaction design are original; third-party pages and assets were not copied.

## Preserved behavior

- SvelteKit, Svelte 5, TypeScript and the official Node 22 Vercel adapter.
- All 37 bilingual prompts, detail URLs, categories, search, saved prompts, independent EN/ES drafts, copy/reset and related workflows.
- The exact approved source images, original hero source and logo. Captions are shorter but still identify the art as conceptual and AI-generated.
- Workshop dates/prices remain pending. Existing event facts, contribution guidance and illustrative project labels remain accurate.
- Public Preview/Production forms and chat remain disabled by their existing server contracts. Local QA fixtures are labeled and do not represent connected providers.
- Pause controls, reduced-motion preferences, visibility handling, keyboard focus and native navigation behavior.

## Verification

Run the repository's normal lint, Svelte checks, unit suite, build, Vercel output-isolation verification and audit. Run all three existing GitHub CI jobs and hosted desktop/mobile visual acceptance on the new head. R7's passing hosted results describe the parent revision and must not be reused as proof that R8 passed.

The R8 handoff receipt records actual local results and any remaining limits. Treat visual quality as a human review outcome; automated accessibility results cannot approve the art direction.

## Existing deployment route

Continue PR #5, whose branch is `feat/wgn-r7-experience-rebuild`, and deploy to the existing `ai-tools-night-website` Vercel project. The local R8 branch is a preparation branch. Import the supplied commit as a fast-forward update to the PR branch after checking its current head. Preserve other work if it advanced. No new repository, project, hosting provider, domain or DNS configuration is required.

The previous Preview toolbar setting was branch-specific. Reusing the PR #5 branch preserves that scope; verify it rather than weakening CSP. Deployment settings remain SvelteKit, Node 22, `bun install --frozen-lockfile`, `bun run build`, repository root and output-directory override off. Do not add a persistent server, SQLite service or provider keys to this visual release.

Complete a real Vercel Preview and return its immutable URL, exact head, screenshots and fresh checks. Production promotion follows the team's final visual launch approval.
