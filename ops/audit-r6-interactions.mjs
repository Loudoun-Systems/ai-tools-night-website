import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const [
	base = 'http://127.0.0.1:5178',
	dir = '../r6-review-2026-10-19/interaction-review',
	headersFile
] = process.argv.slice(2);
const root = resolve(dir);
mkdirSync(root, { recursive: true });
const headers = headersFile ? JSON.parse(readFileSync(headersFile, 'utf8')) : {};
const report = {
	base,
	at: new Date().toISOString(),
	zoom: [],
	motion: {},
	fallback: {},
	errors: []
};
let persistent;
try {
	const extension = resolve(root, 'zoom-extension');
	mkdirSync(extension, { recursive: true });
	writeFileSync(
		resolve(extension, 'manifest.json'),
		JSON.stringify({
			manifest_version: 3,
			name: 'WGN isolated real browser zoom QA',
			version: '1.0',
			permissions: ['tabs'],
			background: { service_worker: 'background.js' }
		})
	);
	writeFileSync(
		resolve(extension, 'background.js'),
		'chrome.runtime.onInstalled.addListener(()=>{});'
	);
	persistent = await chromium.launchPersistentContext(resolve(root, 'isolated-zoom-profile'), {
		channel: 'chromium',
		headless: true,
		viewport: { width: 1440, height: 1000 },
		extraHTTPHeaders: headers,
		reducedMotion: 'reduce',
		args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`]
	});
	const worker =
		persistent.serviceWorkers()[0] ||
		(await persistent.waitForEvent('serviceworker', { timeout: 15000 }));
	const page = await persistent.newPage();
	for (const locale of ['en', 'es']) {
		await page.addInitScript((l) => localStorage.setItem('wgn-language', l), locale);
		for (const route of [
			'/',
			'/workshops',
			'/events',
			'/prompt-library',
			'/prompt-library/clear-email',
			'/careers',
			'/projects',
			'/about',
			'/privacy',
			'/terms',
			'/code-of-conduct',
			'/legacy-receipt'
		]) {
			await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
			await page.evaluate(() => document.fonts.ready);
			const zoom = await worker.evaluate(async () => {
				const tabs = await chrome.tabs.query({});
				const tab = tabs.find(
					(t) => t.url && !t.url.startsWith('chrome') && !t.url.startsWith('about')
				);
				if (!tab) throw new Error('No website tab');
				await chrome.tabs.setZoom(tab.id, 2);
				return chrome.tabs.getZoom(tab.id);
			});
			const metrics = await page.evaluate(() => ({
				width: innerWidth,
				dpr: devicePixelRatio,
				overflow: document.documentElement.scrollWidth > innerWidth + 1,
				h1: document.querySelector('h1')?.textContent,
				language: document.documentElement.lang
			}));
			if (zoom !== 2 || metrics.width >= 1440 || metrics.overflow || metrics.language !== locale)
				throw new Error(
					'Actual browser zoom reflow failed: ' +
						JSON.stringify({ route, locale, zoom, ...metrics })
				);
			const file = `zoom200-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '--')}-${locale}.jpg`;
			await page.screenshot({
				path: resolve(root, file),
				fullPage: true,
				type: 'jpeg',
				quality: 84
			});
			report.zoom.push({ route, locale, browserReportedZoom: zoom, ...metrics, file });
		}
	}
	await persistent.close();
	persistent = undefined;
	const browser = await chromium.launch();
	const context = await browser.newContext({
		viewport: { width: 1440, height: 1000 },
		extraHTTPHeaders: headers,
		reducedMotion: 'no-preference',
		recordVideo: { dir: resolve(root, 'motion-video'), size: { width: 1440, height: 1000 } }
	});
	const p = await context.newPage();
	await p.goto(base, { waitUntil: 'networkidle' });
	await p.evaluate(() => document.fonts.ready);
	const first = await p.locator('.hero-art-frame').evaluate((e) => ({
		name: getComputedStyle(e).animationName,
		duration: getComputedStyle(e).animationDuration,
		transform: getComputedStyle(e).transform
	}));
	await p.waitForTimeout(2200);
	const second = await p.locator('.hero-art-frame').evaluate((e) => getComputedStyle(e).transform);
	await p.screenshot({ path: resolve(root, 'normal-motion-home.jpg'), type: 'jpeg', quality: 90 });
	await p.evaluate(() => {
		Object.defineProperty(document, 'hidden', { configurable: true, value: true });
		document.dispatchEvent(new Event('visibilitychange'));
	});
	const paused = await p
		.locator('.hero-art-frame')
		.evaluate((e) => getComputedStyle(e).animationPlayState);
	await p.evaluate(() => {
		Object.defineProperty(document, 'hidden', { configurable: true, value: false });
		document.dispatchEvent(new Event('visibilitychange'));
	});
	await p.evaluate(() => scrollTo(0, document.body.scrollHeight));
	await p.waitForTimeout(120);
	const offscreen = await p
		.locator('.hero-art-frame')
		.evaluate((e) => getComputedStyle(e).animationPlayState);
	await p.emulateMedia({ reducedMotion: 'reduce' });
	const reduced = await p
		.locator('.hero-art-frame')
		.evaluate((e) => getComputedStyle(e).animationName);
	report.motion = {
		first,
		second,
		changed: first.transform !== second,
		hiddenTabState: paused,
		hiddenTabMethod: 'visibilitychange regression simulation',
		offscreenState: offscreen,
		reducedName: reduced,
		video: 'motion-video/ (actual browser WebM)'
	};
	if (
		first.name === 'none' ||
		first.transform === second ||
		paused !== 'paused' ||
		offscreen !== 'paused' ||
		reduced !== 'none'
	)
		throw new Error('Motion discipline regression: ' + JSON.stringify(report.motion));
	await context.close();
	await browser.close();
} catch (e) {
	report.errors.push(e.stack || String(e));
	if (persistent) await persistent.close();
}
writeFileSync(resolve(root, 'results.json'), JSON.stringify(report, null, 2));
console.log(
	JSON.stringify(
		{
			zoomCases: report.zoom.length,
			zoom: report.zoom[0],
			motion: report.motion,
			errors: report.errors
		},
		null,
		2
	)
);
if (report.errors.length) process.exitCode = 1;
