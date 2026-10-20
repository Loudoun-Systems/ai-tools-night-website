import { chromium, expect } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const [
	base = 'http://127.0.0.1:5178',
	output = '../r6-futuristic-live-2026-10-20/visual',
	headersPath
] = process.argv.slice(2);
const headers = headersPath ? JSON.parse(readFileSync(headersPath, 'utf8')) : {};
mkdirSync(output, { recursive: true });
const browser = await chromium.launch();
const report = { base, at: new Date().toISOString(), views: [], motion: {}, errors: [] };
try {
	for (const width of [1440, 390])
		for (const locale of ['en', 'es']) {
			const context = await browser.newContext({
				viewport: { width, height: 1000 },
				extraHTTPHeaders: headers,
				reducedMotion: 'no-preference'
			});
			await context.route('**/*', (route) => {
				const outgoing = { ...route.request().headers() };
				if (new URL(route.request().url()).origin !== new URL(base).origin)
					delete outgoing['x-vercel-protection-bypass'];
				return route.continue({ headers: outgoing });
			});
			await context.addInitScript((l) => localStorage.setItem('wgn-language', l), locale);
			const page = await context.newPage();
			page.on('pageerror', (e) => report.errors.push(e.message));
			page.on('console', (m) => {
				if (m.type() === 'error') report.errors.push(m.text());
			});
			for (const path of ['/', '/workshops', '/prompt-library', '/about']) {
				const response = await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' });
				await page.evaluate(() => document.fonts.ready);
				await expect(page.locator('.motion-control')).toBeVisible();
				await page.evaluate(async () => {
					for (const image of document.images) {
						image.scrollIntoView({ behavior: 'instant', block: 'center' });
						await Promise.race([
							image.decode().catch(() => {}),
							new Promise((resolve) => setTimeout(resolve, 3000))
						]);
						if (!image.naturalWidth) throw new Error('Image failed to load: ' + image.currentSrc);
					}
					scrollTo({ top: 0, behavior: 'instant' });
				});
				const metrics = await page.evaluate(() => ({
					lang: document.documentElement.lang,
					overflow: document.documentElement.scrollWidth > innerWidth + 1,
					font: getComputedStyle(document.querySelector('h1')).fontFamily,
					orbitronLoaded: document.fonts.check('650 20px Orbitron'),
					background: getComputedStyle(document.querySelector('main > section')).backgroundImage,
					grid: getComputedStyle(document.querySelector('.atmosphere-grid')).backgroundImage,
					animations: document
						.querySelector('.atmosphere')
						.getAnimations({ subtree: true })
						.map((a) => a.playState)
				}));
				if (
					response.status() !== 200 ||
					metrics.overflow ||
					metrics.lang !== locale ||
					!metrics.orbitronLoaded ||
					!metrics.font.includes('Orbitron')
				)
					throw new Error(JSON.stringify({ path, width, locale, metrics }));
				const stem = `${path === '/' ? 'home' : path.slice(1)}-${locale}-${width}`;
				await page.screenshot({
					path: resolve(output, stem + '-fold.jpg'),
					type: 'jpeg',
					quality: 90
				});
				await page.screenshot({
					path: resolve(output, stem + '.jpg'),
					fullPage: true,
					type: 'jpeg',
					quality: 85
				});
				report.views.push({ path, width, locale, status: response.status(), ...metrics });
			}
			if (width === 1440 && locale === 'en') {
				await page.goto(base, { waitUntil: 'networkidle' });
				const orb = page.locator('.orbital-system i').first();
				await expect
					.poll(() => orb.evaluate((e) => getComputedStyle(e).animationPlayState))
					.toBe('running');
				const before = await orb.evaluate((e) => e.getAnimations()[0].currentTime);
				await expect
					.poll(() => orb.evaluate((e) => Number(e.getAnimations()[0].currentTime)))
					.toBeGreaterThan(Number(before) + 200);
				report.motion.progresses = true;
				await page.locator('.motion-control').click();
				await expect
					.poll(() => orb.evaluate((e) => getComputedStyle(e).animationPlayState))
					.toBe('paused');
				await page.reload();
				await expect(page.locator('.motion-control')).toHaveAttribute('aria-pressed', 'true');
				report.motion.pausePersists = true;
				await page.locator('.motion-control').click();
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await expect(page.locator('.motion-control')).toBeDisabled();
				await expect
					.poll(() => orb.evaluate((e) => getComputedStyle(e).animationName))
					.toBe('none');
				report.motion.reducedMotionStops = true;
			}
			await context.close();
		}
	if (report.errors.length) throw new Error(report.errors.join('\n'));
	report.status = 'passed';
} catch (error) {
	report.status = 'failed';
	report.error = error.stack;
	process.exitCode = 1;
} finally {
	await browser.close();
	writeFileSync(resolve(output, 'visual-motion-results.json'), JSON.stringify(report, null, 2));
	console.log(
		JSON.stringify({
			status: report.status,
			views: report.views.length,
			motion: report.motion,
			errors: report.errors,
			error: report.error || null
		})
	);
}
