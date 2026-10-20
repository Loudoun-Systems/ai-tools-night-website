# WGN futuristic visual upgrade

Authorized by Gus after R6 review: upgrade backgrounds and typography to echo the approved logo/hero, then merge and deploy the tested release to the existing wevegotnow.com project. This supersedes the earlier Preview-only approval hold for this release; it does not authorize provider activation, purchases, new projects or DNS changes.

## Visual implementation

- Shared midnight/cyan/violet atmosphere: local SVG circuit traces, stars, aurora fields, orbital geometry and a perspective horizon.
- Layered chapter and resource surfaces rather than flat solid-color sections. Original artwork remains byte-preserved.
- Self-hosted Orbitron variable display type; retained Manrope/Inter for smaller UI and readable body copy. License/provenance is in `static/fonts/`.
- Native CSS transform animations only. No new dependency, external service, canvas/WebGL, requestAnimationFrame loop, analytics or provider call.
- Persistent keyboard-accessible pause/resume in EN/ES. OS reduced motion takes precedence; document visibility suspends motion; event listeners clean up on unmount. Hidden-document tests simulate visibility events and are not physical-device certification.
- Static decorative composition remains available without JavaScript. Backgrounds are inert, hidden from assistive technology and do not intercept pointers. Forced-color mode removes decoration.

## Verification and release

`tests/e2e/r6.spec.ts` covers actual timeline progress, pause persistence, keyboard activation, OS media changes and visibility-event suspension in addition to retained bilingual/resource/availability regressions.

`node ops/audit-futuristic.mjs <base> <output> [private-headers-file]` captures normal-motion desktop/mobile EN/ES renders and verifies the font, background and controls. Authorization is scoped to the tested origin.

Run the complete existing QA and Vercel Node22 suites. Keep disabled forms/chat and pending dates/prices. Accept the actual immutable Preview before merging; capture current Production and preserve rollback. Build and verify exact merged SHA with Production settings while `autoAssignCustomDomains=false`, then promote and re-run live acceptance. Restore the captured deployment if live verification fails.
