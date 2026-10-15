import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

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

test('serves every public route with unique metadata, CSP and no horizontal overflow', async ({
	page
}) => {
	const descriptions = new Set<string>();
	for (const path of routes) {
		const response = await page.goto(path);
		expect(response?.status(), path).toBe(200);
		expect(response?.headers()['x-robots-tag'], path).toContain('noindex');
		expect(response?.headers()['content-security-policy'], path).toContain("script-src 'self'");
		expect(await page.title(), path).toContain("We've Got Now");
		const description = await page.locator('meta[name="description"]').getAttribute('content');
		expect(description?.length, path).toBeGreaterThanOrEqual(40);
		if (!path.startsWith('/events/') && !path.startsWith('/prompt-library/')) {
			expect(descriptions.has(description ?? ''), `duplicate description on ${path}`).toBe(false);
			descriptions.add(description ?? '');
		}
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		expect(overflow, `horizontal overflow on ${path}`).toBeLessThanOrEqual(1);
	}
});

test('legacy aliases are permanent and keep staging security headers', async ({ request }) => {
	for (const [source, destination] of Object.entries(aliases)) {
		const response = await request.get(source, { maxRedirects: 0 });
		expect(response.status(), source).toBe(308);
		expect(response.headers().location, source).toBe(destination);
		expect(response.headers()['x-robots-tag'], source).toContain('noindex');
		expect(response.headers()['x-content-type-options'], source).toBe('nosniff');
	}
});

test('hydrates bilingual navigation and persists the language per browser', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Cambiar a español' }).click();
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	await expect(
		page
			.getByRole('navigation', { name: 'Primary' })
			.getByRole('link', { name: 'Eventos', exact: true })
	).toBeVisible();
	await expect(page.getByText('PRUEBAS', { exact: true })).toBeVisible();
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	await expect(page.getByText('Saltar al contenido')).toBeAttached();
	await page.getByRole('button', { name: 'Switch to English' }).click();
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('concept art failure renders its fallback without inline-handler or console errors', async ({
	page
}) => {
	const browserErrors: string[] = [];
	page.on('console', (message) => {
		if (message.type() === 'error') browserErrors.push(message.text());
	});
	page.on('pageerror', (error) => browserErrors.push(error.message));

	await page.route(
		'**/assets/**/2026-10-14_wgn-workshop-hands-on__ChatGPT@Team-Haytham*',
		(route) => route.fulfill({ status: 200, contentType: 'image/webp', body: 'not-an-image' })
	);
	const response = await page.goto('/workshops');
	const html = await response?.text();
	expect(html).not.toMatch(/\son[a-z]+\s*=/i);
	await expect(page.getByText('Concept artwork unavailable')).toBeVisible();
	expect(browserErrors).toEqual([]);
});

test('prompt search, edit, copy and reset are real interactions', async ({ page }) => {
	await page.goto('/prompt-library');
	await page.getByLabel('Search prompts').fill('email');
	await expect(page.getByRole('heading', { name: 'Write a clear email' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Turn notes into next steps' })).toHaveCount(0);
	const editor = page.getByLabel('Editable prompt text');
	await editor.fill('Synthetic edited prompt');
	await page.getByRole('button', { name: 'Copy prompt' }).click();
	await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
	await page.getByRole('button', { name: 'Reset' }).first().click();
	await expect(editor).toHaveValue(/Draft an email/);
});

test('built APIs enforce method, origin, media type, schema and body limits', async ({
	request
}, testInfo) => {
	test.skip(testInfo.project.name !== 'desktop-chromium', 'one HTTP security pass is sufficient');
	expect((await request.get('/api/forms')).status()).toBe(405);
	expect(
		(
			await request.post('/api/forms', {
				data: {},
				headers: { 'content-type': 'application/json' }
			})
		).status()
	).toBe(403);
	expect(
		(
			await request.post('/api/forms', {
				data: {},
				headers: { origin, 'content-type': 'text/plain' }
			})
		).status()
	).toBe(415);
	expect(
		(
			await request.post('/api/forms', {
				data: '{',
				headers: { origin, 'content-type': 'application/json' }
			})
		).status()
	).toBe(400);
	const unknown = await request.post('/api/forms', {
		data: {
			formType: 'community',
			locale: 'en',
			name: 'Test Person',
			email: 'person@example.com',
			role: '',
			interest: 'Valid synthetic interest.',
			contactConsent: true,
			marketingConsent: false,
			destination: 'arbitrary'
		},
		headers: {
			origin,
			'content-type': 'application/json',
			'idempotency-key': 'security-case-12345'
		}
	});
	expect(unknown.status()).toBe(400);
	expect((await unknown.json()).fields.destination).toBe('unknown_field');
	const oversized = await request.post('/api/chat', {
		data: JSON.stringify({
			locale: 'en',
			messages: [{ role: 'user', content: 'x'.repeat(21_000) }]
		}),
		headers: { origin, 'content-type': 'application/json' }
	});
	expect(oversized.status()).toBe(413);
});

test('fixture form creates and restores a truthful receipt without external claims', async ({
	page
}, testInfo) => {
	test.skip(testInfo.project.name !== 'desktop-chromium', 'one durable form flow is sufficient');
	await page.goto('/#join');
	await page.locator('input[name="name"]').fill('Browser Fixture Visitor');
	await page.locator('input[name="email"]').fill('browser@example.com');
	await page.locator('textarea[name="interest"]').fill('Learn safe practical AI workflows.');
	await page.locator('input[name="contactConsent"]').check();
	await page.getByRole('button', { name: 'Submit securely' }).click();
	await expect(page.getByText('Receipt created')).toBeVisible();
	await expect(page.getByText(/No Google Sheet, email, CRM/)).toBeVisible();
	const receipt = await page.locator('.notice.success code').textContent();
	await page.reload();
	await expect(page.locator('.notice.success code')).toHaveText(receipt ?? '');
	await page.getByRole('button', { name: 'Start a new submission' }).click();
	await expect(page.getByRole('button', { name: 'Submit securely' })).toBeVisible();
});

test('server field errors focus the first invalid enumerated field', async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== 'desktop-chromium', 'one error flow is sufficient');
	await page.goto('/careers');
	await page.locator('input[name="name"]').fill('Browser Fixture Visitor');
	await page.locator('input[name="email"]').fill('browser@example.com');
	await page.locator('textarea[name="workInterest"]').fill('Build accessible interfaces.');
	await page.locator('input[name="contactConsent"]').check();
	await page.getByRole('button', { name: 'Submit securely' }).click();
	await expect(page.getByRole('alert')).toContainText('tracks: invalid_selection');
	await expect(page.locator('input[name="tracks"]').first()).toBeFocused();
});

test('chat supports focus return, fixture answers and cancellation-safe reset', async ({
	page
}) => {
	await page.goto('/');
	const launcher = page.getByRole('button', { name: 'Ask WGN' });
	await launcher.click();
	const input = page.getByLabel('Your question');
	await expect(input).toBeFocused();
	await input.fill('What does the workshop cost?');
	await page.getByRole('button', { name: 'Send' }).click();
	await expect(page.getByText(/still pending/)).toBeVisible();
	await page.getByRole('button', { name: 'Reset' }).click();
	await expect(page.locator('.chat-message')).toHaveCount(0);
	await page.keyboard.press('Escape');
	await expect(launcher).toBeFocused();

	await page.route('**/api/chat', async (route) => {
		await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
		await route.fulfill({ json: { answer: 'Stale response', links: ['/events'] } });
	});
	await launcher.click();
	await input.fill('Delayed question');
	await page.getByRole('button', { name: 'Send' }).click();
	await page.getByRole('button', { name: 'Reset' }).click();
	await page.waitForTimeout(350);
	await expect(page.getByText('Stale response')).toHaveCount(0);
});

test('representative pages have no serious axe violations and render screenshots', async ({
	page
}, testInfo) => {
	const screenshotDirectory = resolve(process.cwd(), '../qa-screenshots');
	mkdirSync(screenshotDirectory, { recursive: true });
	for (const [name, path] of [
		['home', '/'],
		['prompts', '/prompt-library'],
		['workshops', '/workshops']
	] as const) {
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		expect(
			results.violations.filter((violation) =>
				['serious', 'critical'].includes(violation.impact ?? '')
			)
		).toEqual([]);
		await page.screenshot({
			path: resolve(screenshotDirectory, `${testInfo.project.name}-${name}-en.png`),
			fullPage: true
		});
	}
	await page.getByRole('button', { name: 'Cambiar a español' }).click();
	await page.screenshot({
		path: resolve(screenshotDirectory, `${testInfo.project.name}-workshops-es.png`),
		fullPage: true
	});
});

test('mobile menu opens with keyboard-accessible navigation', async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== 'mobile-chromium', 'mobile-only behavior');
	await page.goto('/');
	const menu = page.getByRole('button', { name: 'Toggle navigation' });
	await menu.focus();
	await page.keyboard.press('Enter');
	await expect(menu).toHaveAttribute('aria-expanded', 'true');
	await expect(
		page
			.getByRole('navigation', { name: 'Primary' })
			.getByRole('link', { name: 'Events', exact: true })
	).toBeVisible();
});

test('all rendered local images and navigable internal links resolve', async ({ page }) => {
	await page.goto('/');
	const imageSources = await page
		.locator('img')
		.evaluateAll((images) => images.map((image) => (image as HTMLImageElement).currentSrc));
	for (const source of imageSources) {
		const response = await page.request.get(source);
		expect(response.status(), source).toBe(200);
	}
	const internal = await page
		.locator('a[href^="/"]')
		.evaluateAll((links) => [...new Set(links.map((link) => (link as HTMLAnchorElement).href))]);
	for (const href of internal) {
		const response = await page.request.get(href);
		expect(response.status(), href).toBeLessThan(400);
	}
});
