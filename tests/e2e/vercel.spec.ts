import { expect, test } from '@playwright/test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const preview = process.env.WGN_VERCEL_TEST_ENV === 'preview';

test('actual Node Vercel handler reports platform environment and real Git identity', async ({
	request
}) => {
	const response = await request.get('/healthz');
	expect(response.status()).toBe(200);
	expect(response.headers()['cache-control']).toBe('no-store');
	const body = await response.json();
	expect(body.environment).toBe(preview ? 'staging' : 'production');
	expect(body.integrations).toEqual({ forms: 'disabled', chat: 'disabled' });
	expect(body.releaseSha).toBe(process.env.WGN_RELEASE_SHA ?? '0'.repeat(40));
	expect(JSON.stringify(body)).not.toMatch(/sqlite|private.key|api.key/i);
	const robots = await request.get('/robots.txt');
	expect(robots.status()).toBe(200);
	if (preview) expect(await robots.text()).toBe('User-agent: *\nDisallow: /\n');
	else {
		expect(await robots.text()).toContain('Allow: /\n');
		expect(await robots.text()).not.toContain('Disallow: /');
		expect(await robots.text()).toContain('Sitemap: https://wevegotnow.com/sitemap.xml');
	}
});

test('disabled APIs keep JSON/origin/body guards without loading providers or SQLite', async ({
	request,
	baseURL
}) => {
	for (const endpoint of ['forms', 'chat']) {
		const url = `/api/${endpoint}`;
		const headers = { origin: baseURL!, 'content-type': 'application/json' };
		expect((await request.post(url, { data: {}, headers })).status()).toBe(503);
		expect(
			(
				await request.post(url, {
					data: {},
					headers: { ...headers, origin: 'https://untrusted.example' }
				})
			).status()
		).toBe(403);
		expect((await request.post(url, { data: Buffer.from('not-json'), headers })).status()).toBe(
			400
		);
		expect(
			(await request.post(url, { data: Buffer.from('x'.repeat(21000)), headers })).status()
		).toBe(413);
		expect(
			(
				await request.post(url, {
					data: 'hello',
					headers: { origin: baseURL!, 'content-type': 'text/plain' }
				})
			).status()
		).toBe(415);
	}
	expect(
		existsSync(resolve(process.env.WGN_TEST_SCRATCH ?? '../scratch', 'vercel-must-not-exist'))
	).toBe(false);
	// The obsolete standalone /api/submit function is not part of the deployed app.
	expect((await request.post('/api/submit', { data: {} })).status()).toBe(404);
});

test('preview/production indexing and unavailable UI match platform scope', async ({ page }) => {
	const response = await page.goto('/');
	expect(response?.status()).toBe(200);
	if (preview) expect(response?.headers()['x-robots-tag']).toContain('noindex');
	else expect(response?.headers()['x-robots-tag']).toBeUndefined();
	await expect(page.locator('.stage-banner')).toHaveCount(preview ? 1 : 0);
	await expect(
		page.getByRole('button', { name: 'Submissions unavailable', exact: true })
	).toBeDisabled();
	await expect(page.locator('input[name="email"]')).toHaveCount(0);
	await page.getByRole('button', { name: 'Chat unavailable', exact: true }).click();
	await expect(page.locator('#chat-question')).toHaveCount(0);
});
