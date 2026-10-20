import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const routes = [
	'/',
	'/events',
	'/events/ai-tools-explorers-night-april-22-2026',
	'/events/ai-tools-explorers-night-april-1-2026',
	'/events/ai-workshops',
	'/workshops',
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
const aliases = {
	'/index.html': '/',
	'/events.html': '/events',
	'/about.html': '/about',
	'/careers.html': '/careers',
	'/prompt-library.html': '/prompt-library',
	'/hackathon.html': '/projects',
	'/hackathon': '/projects',
	'/success.html': '/legacy-receipt',
	'/success': '/legacy-receipt'
};

test('production routes are indexable, banner-free and fit desktop/mobile with decoded images', async ({
	page
}) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	for (const route of routes) {
		const response = await page.goto(route);
		expect(response?.status(), route).toBe(200);
		expect(response?.headers()['x-robots-tag'], route).toBeUndefined();
		expect(response?.headers()['content-security-policy'], route).toContain("script-src 'self'");
		await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
		await expect(page.locator('.stage-banner')).toHaveCount(0);
		expect(await page.title()).toContain("We've Got Now");
		await page
			.locator('img')
			.evaluateAll(async (images) =>
				Promise.all(images.map((image) => (image as HTMLImageElement).decode()))
			);
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth - document.documentElement.clientWidth
			),
			route
		).toBeLessThanOrEqual(1);
	}
	expect(errors).toEqual([]);
});

test('production legacy redirects preserve query strings without staging indexing headers', async ({
	request
}) => {
	for (const [source, target] of Object.entries(aliases)) {
		const response = await request.get(`${source}?ref=legacy`, { maxRedirects: 0 });
		expect(response.status()).toBe(308);
		expect(response.headers().location).toBe(`${target}?ref=legacy`);
		expect(response.headers()['x-robots-tag']).toBeUndefined();
	}
	const health = await (await request.get('/healthz')).json();
	expect(health.environment).toBe('production');
	expect(health.integrations).toEqual({ forms: 'disabled', chat: 'disabled' });
	expect(health.releaseSha).toBe(process.env.WGN_RELEASE_SHA ?? '0'.repeat(40));
});

test('disabled production integrations reject direct requests without success receipts or fake answers', async ({
	request,
	baseURL
}) => {
	for (const [endpoint, payload, error] of [
		[
			'forms',
			{
				formType: 'community',
				locale: 'en',
				name: 'SYSTEM TEST',
				email: 'test@example.com',
				interest: 'Test',
				contactConsent: true,
				marketingConsent: false
			},
			'forms_unavailable'
		],
		[
			'chat',
			{ locale: 'es', messages: [{ role: 'user', content: '¿Cuánto cuesta?' }] },
			'chat_unavailable'
		]
	] as const) {
		const response = await request.post(`/api/${endpoint}`, {
			data: payload,
			headers: { origin: baseURL!, 'idempotency-key': 'production-disabled-only-12345' }
		});
		expect(response.status()).toBe(503);
		const body = await response.json();
		expect(body.error).toBe(error);
		expect(body.accepted).toBeUndefined();
		expect(body.receiptId).toBeUndefined();
		expect(body.answer).toBeUndefined();
	}
});

test('unavailable UI prevents PII entry and ignores old fixture receipts in both languages', async ({
	page
}) => {
	await page.addInitScript(() =>
		localStorage.setItem(
			'wgn-form-state:community:',
			JSON.stringify({
				key: 'old-fixture-key-12345',
				receipt: 'WGN-FX-OLD',
				mode: 'fixture',
				duplicate: false
			})
		)
	);
	let calls = 0;
	page.on('request', (request) => {
		if (/\/api\/(chat|forms)/.test(request.url())) calls++;
	});
	for (const route of ['/', '/workshops', '/events/ai-workshops', '/careers', '/projects']) {
		await page.goto(route);
		await expect(
			page.getByText('Online submissions temporarily unavailable', { exact: true })
		).toBeVisible();
		await expect(page.locator('input[name="email"]')).toHaveCount(0);
		await expect(page.getByText('WGN-FX-OLD')).toHaveCount(0);
	}
	await page.locator('.chat-availability summary').click();
	await expect(page.getByText(/No message is sent/)).toBeVisible();
	await expect(page.locator('#chat-question')).toHaveCount(0);
	await page.keyboard.press('Escape');
	await page.locator('.chat-availability summary').click();
	await page.getByRole('button', { name: 'Cambiar a español' }).click();
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	await expect(
		page.getByText('Envíos en línea temporalmente no disponibles', { exact: true })
	).toBeVisible();
	await page.locator('.chat-availability summary').click();
	await expect(page.getByText(/No se envía ningún mensaje/)).toBeVisible();
	await page.keyboard.press('Escape');
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	expect(calls).toBe(0);
});

test('production screenshots and serious accessibility checks', async ({ page }, testInfo) => {
	const directory = resolve(process.env.WGN_SCREENSHOT_DIR ?? '../qa-production-screenshots');
	mkdirSync(directory, { recursive: true });
	for (const [name, route] of [
		['home', '/'],
		['workshops', '/workshops'],
		['prompts', '/prompt-library']
	] as const) {
		await page.goto(route);
		const results = await new AxeBuilder({ page }).analyze();
		expect(
			results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))
		).toEqual([]);
		await page.screenshot({
			path: resolve(directory, `${testInfo.project.name}-${name}-en.png`),
			fullPage: true
		});
	}
	await page.getByRole('button', { name: 'Cambiar a español' }).click();
	await page.screenshot({
		path: resolve(directory, `${testInfo.project.name}-workshops-es.png`),
		fullPage: true
	});
});
