import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const [
	base = 'http://127.0.0.1:5178',
	directory = '../r6-review-2026-10-19/local-matrix',
	headersFile
] = process.argv.slice(2);
const root = resolve(directory);
mkdirSync(root, { recursive: true });
const headers = headersFile ? JSON.parse(readFileSync(headersFile, 'utf8')) : {};
export const publicRoutes = [
	'/',
	'/workshops',
	'/events',
	'/events/ai-workshops',
	'/events/ai-tools-explorers-night-april-22-2026',
	'/events/ai-tools-explorers-night-april-1-2026',
	'/prompt-library',
	'/prompt-library/notes-to-next-steps',
	'/prompt-library/clear-email',
	'/prompt-library/repetitive-workflow',
	'/prompt-library/compare-with-evidence',
	'/prompt-library/learn-by-doing',
	'/careers',
	'/projects',
	'/about',
	'/privacy',
	'/terms',
	'/code-of-conduct',
	'/legacy-receipt'
];
const browser = await chromium.launch();
const report = {
	base,
	at: new Date().toISOString(),
	viewports: [1440, 1280, 768, 390, 360],
	locales: ['en', 'es'],
	rows: [],
	links: [],
	errors: []
};
const internal = new Set();
try {
	for (const width of report.viewports)
		for (const locale of report.locales) {
			const context = await browser.newContext({
				viewport: { width, height: 1000 },
				extraHTTPHeaders: headers,
				reducedMotion: 'reduce',
				userAgent: 'Mozilla/5.0 WGN-R6-Acceptance'
			});
			await context.addInitScript((l) => localStorage.setItem('wgn-language', l), locale);
			const page = await context.newPage();
			let jsErrors = [];
			page.on('pageerror', (e) => jsErrors.push(e.message));
			page.on('console', (message) => {
				if (message.type() === 'error') jsErrors.push('console: ' + message.text());
			});
			for (const route of publicRoutes) {
				jsErrors = [];
				const response = await page.goto(new URL(route, base).href, {
					waitUntil: 'networkidle',
					timeout: 45000
				});
				await page.evaluate(() => document.fonts.ready);
				await page.evaluate(async () => {
					for (let y = 0; y < document.body.scrollHeight; y += 800) {
						scrollTo(0, y);
						await new Promise((r) => setTimeout(r, 18));
					}
					scrollTo(0, 0);
					await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
				});
				const metrics = await page.evaluate(() => ({
					lang: document.documentElement.lang,
					heading: document.querySelector('h1')?.textContent?.trim(),
					h1Count: document.querySelectorAll('h1').length,
					overflow: document.documentElement.scrollWidth > innerWidth + 1,
					bodySize: getComputedStyle(document.body).fontSize,
					displayFont: getComputedStyle(document.querySelector('h1')).fontFamily,
					fontFacesReady:
						document.fonts.check('16px Manrope') && document.fonts.check('16px Inter'),
					brokenImages: [...document.images]
						.filter((i) => !i.naturalWidth)
						.map((i) => i.currentSrc),
					unavailableEmailInputs: document.querySelectorAll('input[name=email]').length,
					rootHeadingOpacity: getComputedStyle(document.querySelector('h1')).opacity,
					internalLinks: [...document.querySelectorAll('a[href^="/"]')].map((a) =>
						a.getAttribute('href')
					),
					missingLocalFragments: [...document.querySelectorAll('a[href^="#"]')]
						.map((a) => a.getAttribute('href'))
						.filter((h) => !document.getElementById(h.slice(1)))
				}));
				metrics.internalLinks.forEach((l) => internal.add(l));
				delete metrics.internalLinks;
				const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '--');
				const stem = `${name}-${locale}-${width}`;
				const full = `${stem}.jpg`;
				const fold = `${stem}-fold.jpg`;
				await page.screenshot({
					path: resolve(root, full),
					fullPage: true,
					type: 'jpeg',
					quality: 84
				});
				await page.screenshot({ path: resolve(root, fold), type: 'jpeg', quality: 88 });
				let violations = [];
				if ([1440, 390].includes(width)) {
					const axe = await new AxeBuilder({ page })
						.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
						.analyze();
					violations = axe.violations.map((v) => ({
						id: v.id,
						impact: v.impact,
						help: v.help,
						nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary }))
					}));
				}
				const row = {
					route,
					locale,
					width,
					status: response.status(),
					...metrics,
					jsErrors: [...jsErrors],
					violations,
					full,
					fold
				};
				row.pass =
					row.status === 200 &&
					row.lang === locale &&
					row.h1Count === 1 &&
					!row.overflow &&
					!row.brokenImages.length &&
					!row.unavailableEmailInputs &&
					row.rootHeadingOpacity === '1' &&
					!row.jsErrors.length &&
					!row.missingLocalFragments.length &&
					!row.violations.filter((v) => ['serious', 'critical'].includes(v.impact)).length;
				report.rows.push(row);
			}
			await context.close();
			console.log(`RENDERED width=${width} locale=${locale} routes=${publicRoutes.length}`);
		}
	const context = await browser.newContext({ extraHTTPHeaders: headers });
	for (const link of internal) {
		const target = new URL(link, base);
		const response = await context.request.get(target.href);
		report.links.push({ path: target.pathname + target.hash, status: response.status() });
	}
	await context.close();
} catch (error) {
	report.errors.push(error.stack || String(error));
}
await browser.close();
report.summary = {
	routes: publicRoutes.length,
	rendered: report.rows.length,
	passed: report.rows.filter((r) => r.pass).length,
	failed: report.rows.filter((r) => !r.pass).length,
	jsErrors: report.rows.flatMap((r) => r.jsErrors).length,
	seriousCritical: report.rows
		.flatMap((r) => r.violations)
		.filter((v) => ['serious', 'critical'].includes(v.impact)).length,
	allAxeViolations: report.rows.flatMap((r) => r.violations).length,
	brokenLinks: report.links.filter((l) => l.status >= 400),
	errors: report.errors
};
writeFileSync(resolve(root, 'results.json'), JSON.stringify(report, null, 2));
writeFileSync(
	resolve(root, 'visual-review-matrix.csv'),
	[
		'route,locale,width,status,overflow,broken_images,js_errors,serious_critical,pass,full_screenshot,viewport_screenshot',
		...report.rows.map((r) =>
			[
				r.route,
				r.locale,
				r.width,
				r.status,
				r.overflow,
				r.brokenImages.length,
				r.jsErrors.length,
				r.violations.filter((v) => ['serious', 'critical'].includes(v.impact)).length,
				r.pass,
				r.full,
				r.fold
			].join(',')
		)
	].join('\n') + '\n'
);
console.log(JSON.stringify(report.summary, null, 2));
if (
	report.summary.failed ||
	report.errors.length ||
	report.summary.brokenLinks.length ||
	report.rows.length !== publicRoutes.length * report.viewports.length * report.locales.length
)
	process.exitCode = 1;
