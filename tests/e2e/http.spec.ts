import { expect, test } from '@playwright/test';

const origin = `http://127.0.0.1:${process.env.WGN_TEST_PORT ?? '4176'}`;

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

const aliases: Record<string, string> = {
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

test('built output serves all public pages with security and metadata', async ({ request }) => {
	for (const path of routes) {
		const response = await request.get(path);
		expect(response.status(), path).toBe(200);
		expect(response.headers()['x-robots-tag'], path).toContain('noindex');
		expect(response.headers()['x-content-type-options'], path).toBe('nosniff');
		expect(response.headers()['content-security-policy'], path).toContain("script-src 'self'");
		const html = await response.text();
		expect(html, path).toMatch(/<title>[^<]+We(?:&#39;|')ve Got Now<\/title>/);
		expect(html, path).toMatch(/<meta name="description" content="[^"]{40,}"/);
		expect(html, `${path} must not contain CSP-unsafe inline handlers`).not.toMatch(
			/\son[a-z]+\s*=/i
		);
	}
});

test('assets, sitemap and aliases resolve from the built server', async ({ request }) => {
	const manifestResponse = await request.get('/assets/manifest.json');
	expect(manifestResponse.status()).toBe(200);
	const manifest = (await manifestResponse.json()) as {
		assets: Array<{ source: string; derivatives: Array<{ file: string }> }>;
	};
	for (const asset of manifest.assets) {
		for (const path of [asset.source, ...asset.derivatives.map((item) => item.file)]) {
			const response = await request.get(`/assets/${path}`);
			expect(response.status(), path).toBe(200);
			expect((await response.body()).byteLength, path).toBeGreaterThan(1000);
		}
	}
	const sitemap = await (await request.get('/sitemap.xml')).text();
	for (const path of routes.filter((path) => path !== '/legacy-receipt')) {
		expect(sitemap).toContain(`https://wevegotnow.com${path}`);
	}
	for (const [source, destination] of Object.entries(aliases)) {
		const response = await request.get(source, { maxRedirects: 0 });
		expect(response.status(), source).toBe(308);
		expect(response.headers().location, source).toBe(destination);
		expect(response.headers()['x-robots-tag'], source).toContain('noindex');
	}
});

test('built APIs reject unsafe requests and create fixture-only receipts', async ({ request }) => {
	expect((await request.get('/api/forms')).status()).toBe(405);
	expect(
		(
			await request.post('/api/forms', {
				data: {},
				headers: { 'content-type': 'application/json' }
			})
		).status()
	).toBe(403);
	const malformed = await request.post('/api/forms', {
		data: '{',
		headers: { origin, 'content-type': 'application/json' }
	});
	expect(malformed.status()).toBe(400);
	const unknown = await request.post('/api/forms', {
		data: {
			formType: 'community',
			locale: 'en',
			name: 'SYSTEM TEST Browser',
			email: 'browser@example.com',
			role: '',
			interest: 'Valid synthetic interest.',
			contactConsent: true,
			marketingConsent: false,
			destination: 'arbitrary'
		},
		headers: { origin, 'content-type': 'application/json', 'idempotency-key': 'http-unknown-12345' }
	});
	expect(unknown.status()).toBe(400);
	expect((await unknown.json()).fields.destination).toBe('unknown_field');
	const accepted = await request.post('/api/forms', {
		data: {
			formType: 'community',
			locale: 'en',
			name: 'SYSTEM TEST Browser',
			email: 'browser@example.com',
			role: 'Builder',
			interest: 'Valid synthetic interest.',
			contactConsent: true,
			marketingConsent: false
		},
		headers: {
			origin,
			'content-type': 'application/json',
			'idempotency-key': `http-fixture-${Date.now()}`
		}
	});
	expect(accepted.status()).toBe(201);
	const body = await accepted.json();
	expect(body.mode).toBe('fixture');
	expect(body.storedExternally).toBe(false);
	expect(body.message).toContain('No external system was contacted');
	const oversized = await request.post('/api/chat', {
		data: JSON.stringify({
			locale: 'en',
			messages: [{ role: 'user', content: 'x'.repeat(21_000) }]
		}),
		headers: { origin, 'content-type': 'application/json' }
	});
	expect(oversized.status()).toBe(413);
});
