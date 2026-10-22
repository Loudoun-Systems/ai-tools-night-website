# WGN R7 experience rebuild

- made_by: ChatGPT@Team-Haytham
- asked_by: Haytham
- chat_link: unavailable in this session
- project: WGN website experience rebuild
- date: 2026-10-20 (America/New_York)

The website now has a new page composition and one shared visual system. The opening uses centered editorial typography followed by a three-image stage; the subsequent chapters alternate dark community storytelling, an ivory workshop section, a practical prompt field guide and a closing invitation. Workshop, events, careers, projects and about pages have their own editorial layouts.

## Current implementation

- SvelteKit 2, Svelte 5 and TypeScript remain the application stack. HTML is the browser output of that application, not the cause of the previous layout problems.
- Manrope is the heading face, Inter is the reading face, and Orbitron is confined to small brand/number accents. The shared content width, spacing, responsive grids and heading scale replace the overlapping previous style layers.
- Ambient gradients and orbital details form a continuous background. Pause, reduced-motion and page-visibility behavior are preserved.
- There are 37 bilingual prompts: the five existing URLs plus 32 substantial workflows across eight new topic areas. The templates include inputs, a method, an output structure and verification guidance.
- The prompt library supports localized full-text search, categories, device-local bookmarks, a Saved view and honest storage failures. Detail pages include editable independent EN/ES drafts, reset, copy with a real fallback, input guidance and related prompts. No AI call occurs in the editor.
- Existing logo, hero source and six supporting images are unchanged. Illustrative artwork is identified as such.
- Workshop dates and prices remain pending. Career paths are contribution guidance, not advertised vacancies; practice projects are explicitly illustrative.
- Production and Vercel Preview forms/chat remain disabled by the existing server contracts. Local fixture mode is visibly labeled and is not a live integration.

## Verification and limits

Frozen install, lint, Svelte checks, unit tests, official Vercel adapter build, Vercel bundle isolation verification and dependency audit were executed locally. The accompanying shared receipt records the exact final results.

Actual browser review covered the desktop opening, workshops, projects, library, search, bookmark persistence after reload and independent EN/ES draft retention/reset.

The local Vercel test attempt passed eight HTTP/API checks. Thirty-eight browser-dependent cases could not launch because Chromium is absent. Both official full-Chromium and headless-shell installation attempts returned truncated archives. This is not a passing browser suite. CI, mobile visual review, accessibility regression checks and hosted Preview acceptance remain required before merging.

GitHub's connector rejected both tree creation and branch creation with HTTP 403, “Resource not accessible by integration.” A shell push dry run also confirmed that no Git credential is installed. Repository account metadata showing admin/push does not establish that this connector can write. No remote branch, PR or deployment was created by this session.

## Review route

The accompanying Git bundle contains the completed branch and its full history, so an authorized Git session can push the exact implementation without recreating it. Use the bundled instructions and PR body, run all existing CI jobs, and produce an actual Vercel Preview from `feat/wgn-r7-experience-rebuild`.

Keep `main`, production, DNS, provider credentials, budgets and live integrations unchanged until the new design is visually approved. The remaining handoff is authenticated push, browser QA and Preview review, not another design or planning restart.
