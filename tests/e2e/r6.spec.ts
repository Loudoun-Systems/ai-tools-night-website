import { test, expect } from '@playwright/test';
import { prompts } from '../../src/lib/content';

test('futuristic backgrounds are decorative, animated, pausable and preference-persistent', async ({
	page
}) => {
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/');
	const control = page.getByRole('button', { name: 'Pause background animations', exact: true });
	await expect(control).toBeVisible();
	await expect(page.locator('.atmosphere')).toHaveAttribute('aria-hidden', 'true');
	await expect(page.locator('canvas')).toHaveCount(0);
	const orb = page.locator('.orbital-system i').first();
	await expect
		.poll(() => orb.evaluate((e) => getComputedStyle(e).animationPlayState))
		.toBe('running');
	const first = await orb.evaluate((e) => e.getAnimations()[0].currentTime);
	await expect
		.poll(() => orb.evaluate((e) => Number(e.getAnimations()[0].currentTime)))
		.toBeGreaterThan(Number(first) + 100);
	await control.focus();
	await page.keyboard.press('Enter');
	await expect
		.poll(() => orb.evaluate((e) => getComputedStyle(e).animationPlayState))
		.toBe('paused');
	await page.reload();
	await expect(
		page.getByRole('button', { name: 'Resume background animations', exact: true })
	).toBeVisible();
	await expect
		.poll(() => orb.evaluate((e) => getComputedStyle(e).animationPlayState))
		.toBe('paused');
	await page.getByRole('button', { name: 'Resume background animations', exact: true }).click();
	await expect
		.poll(() => orb.evaluate((e) => getComputedStyle(e).animationPlayState))
		.toBe('running');
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await expect(page.locator('.motion-control')).toBeDisabled();
	await expect.poll(() => orb.evaluate((e) => getComputedStyle(e).animationName)).toBe('none');
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await expect(page.locator('.motion-control')).toBeEnabled();
	await expect
		.poll(() => orb.evaluate((e) => getComputedStyle(e).animationPlayState))
		.toBe('running');
});

test('futuristic decorative motion suspends on visibility events and resumes without a timer', async ({
	page
}) => {
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/workshops');
	await expect(page.locator('.motion-control')).toBeVisible();
	await page.evaluate(() => {
		Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
		document.dispatchEvent(new Event('visibilitychange'));
	});
	await expect(page.locator('html')).toHaveAttribute('data-ambient-paused', '');
	await expect
		.poll(() =>
			page
				.locator('.aurora')
				.first()
				.evaluate((e) => getComputedStyle(e).animationPlayState)
		)
		.toBe('paused');
	await page.evaluate(() => {
		Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
		document.dispatchEvent(new Event('visibilitychange'));
	});
	await expect(page.locator('html')).not.toHaveAttribute('data-ambient-paused', '');
});

test('R6 editorial identity uses local fonts, framed artwork and honest public availability', async ({
	page
}) => {
	const calls: string[] = [];
	page.on('request', (r) => {
		if (/\/api\/(forms|chat)/.test(r.url())) calls.push(r.url());
	});
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Make room for your next idea.');
	await expect(page.locator('.hero-art img')).toBeVisible();
	expect(await page.locator('h1').evaluate((e) => getComputedStyle(e).fontFamily)).toContain(
		'Orbitron'
	);
	expect(
		await page.evaluate(
			() => document.fonts.check('16px Orbitron') && document.fonts.check('16px Inter')
		)
	).toBe(true);
	await expect(page.locator('.hero-media')).toHaveCount(0);
	await expect(page.locator('.chat-launcher')).toHaveCount(0);
	await expect(page.locator('input[name="email"]')).toHaveCount(0);
	expect(calls).toEqual([]);
});

test('R6 desktop disclosure and native mobile drawer work with keyboard and return focus', async ({
	page
}) => {
	await page.goto('/');
	const menu = page.locator('.menu-button');
	if (await menu.isVisible()) {
		await menu.focus();
		await page.keyboard.press('Enter');
		await expect(page.locator('dialog')).toBeVisible();
		await expect(
			page
				.getByRole('navigation', { name: 'Mobile navigation' })
				.getByRole('link', { name: 'Events', exact: true })
		).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.locator('dialog')).not.toBeVisible();
		await expect(menu).toBeFocused();
	} else {
		const explore = page.getByRole('button', { name: 'Explore', exact: true });
		await explore.focus();
		await page.keyboard.press('Enter');
		await expect(explore).toHaveAttribute('aria-expanded', 'true');
		await expect(page.locator('#explore-navigation a').first()).toBeFocused();
		await page.keyboard.press('Escape');
		await expect(explore).toHaveAttribute('aria-expanded', 'false');
		await expect(explore).toBeFocused();
	}
});

test('R6 event filters distinguish past, pending and empty upcoming records', async ({ page }) => {
	await page.goto('/events');
	await page.getByRole('button', { name: 'Upcoming', exact: true }).click();
	await expect(page.getByRole('heading', { name: 'No events match this filter.' })).toBeVisible();
	await page.getByRole('button', { name: 'Past', exact: true }).click();
	await expect(page.locator('.event-row')).toHaveCount(2);
	await page.getByRole('button', { name: 'Workshops', exact: true }).click();
	await expect(page.locator('.event-row')).toHaveCount(1);
	await expect(page.locator('.event-row')).toContainText('Date to be confirmed');
});

test('R6 prompt catalog has compact results, filters, empty state and a real editor link', async ({
	page
}) => {
	await page.goto('/prompt-library');
	await expect(page.locator('.prompt-card')).toHaveCount(5);
	await expect(page.locator('textarea')).toHaveCount(0);
	await page.getByLabel('Search prompts').fill('zz-no-match');
	await expect(page.getByRole('heading', { name: 'No prompts match.' })).toBeVisible();
	await page.getByRole('button', { name: 'Show every template' }).click();
	await expect(page.locator('.prompt-card')).toHaveCount(5);
	await page.getByLabel('Search prompts').fill('email');
	await expect(page.locator('.prompt-card')).toHaveCount(1);
	await page.getByRole('link', { name: 'Open detail' }).click();
	await expect(page.getByLabel('Editable prompt text')).toHaveValue(/Draft an email/);
});

test('all five R6 prompt workspaces retain independent bilingual drafts and reset deliberately', async ({
	page
}) => {
	for (const prompt of prompts) {
		await page.goto(`/prompt-library/${prompt.slug}`);
		const editor = page.getByLabel('Editable prompt text');
		await expect(editor).toHaveValue(prompt.prompt.en);
		await editor.fill('EN synthetic working draft');
		await page.getByRole('button', { name: 'Cambiar a español', exact: true }).click();
		const spanish = page.getByLabel('Texto editable del prompt');
		await expect(spanish).toHaveValue(prompt.prompt.es);
		await spanish.fill('ES borrador de prueba');
		await page.getByRole('button', { name: 'Switch to English', exact: true }).click();
		await expect(editor).toHaveValue('EN synthetic working draft');
		await page.getByRole('button', { name: 'Reset', exact: true }).click();
		await expect(editor).toHaveValue(prompt.prompt.en);
	}
});

test('R6 clipboard denial selects real editable text instead of claiming a copy succeeded', async ({
	page
}) => {
	await page.addInitScript(() =>
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: async () => {
					throw new Error('blocked');
				}
			}
		})
	);
	await page.goto('/prompt-library/clear-email');
	const editor = page.getByLabel('Editable prompt text');
	await editor.fill('Synthetic clipboard fallback');
	await page.getByRole('button', { name: 'Copy prompt', exact: true }).click();
	await expect(page.getByRole('alert')).toContainText('Clipboard access was blocked');
	await expect(editor).toBeFocused();
	expect(
		await editor.evaluate(
			(e) => (e as HTMLTextAreaElement).selectionEnd - (e as HTMLTextAreaElement).selectionStart
		)
	).toBe('Synthetic clipboard fallback'.length);
});

test('R6 workshops, contribution directory and project empty state remain truthful', async ({
	page
}) => {
	await page.goto('/workshops');
	await expect(page.locator('.status-line')).toContainText('Dates and pricing to be announced');
	await page.getByText('How much does it cost?', { exact: true }).click();
	await expect(page.locator('.faq-list details[open]')).toContainText(
		'No payment or seat reservation'
	);
	await page.goto('/careers');
	await expect(page.locator('.contribution-track')).toHaveCount(5);
	await expect(page.locator('.contribution-notice')).toContainText(
		'not confirmed paid job openings'
	);
	await page.goto('/projects');
	await expect(
		page.getByRole('heading', { name: 'Nothing published here yet. Plenty worth trying.' })
	).toBeVisible();
});

test('R6 reduced motion and no-JavaScript fallback preserve readable public content', async ({
	page,
	browser
}) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	expect(
		await page.locator('.hero-art-frame').evaluate((e) => getComputedStyle(e).animationName)
	).toBe('none');
	await expect(page.locator('h1')).toBeVisible();
	const context = await browser.newContext({
		javaScriptEnabled: false,
		viewport: page.viewportSize()!
	});
	const staticPage = await context.newPage();
	for (const route of ['/', '/workshops', '/prompt-library/clear-email']) {
		await staticPage.goto(new URL(route, page.url()).href);
		await expect(staticPage.locator('h1')).toBeVisible();
		expect((await staticPage.locator('main').innerText()).length).toBeGreaterThan(200);
	}
	await expect(staticPage.locator('textarea')).toHaveValue(/Draft an email/);
	await context.close();
});

test('R6 language controls survive denied optional localStorage access', async ({ page }) => {
	await page.addInitScript(() => {
		Storage.prototype.getItem = () => {
			throw new DOMException('Denied', 'SecurityError');
		};
		Storage.prototype.setItem = () => {
			throw new DOMException('Denied', 'SecurityError');
		};
	});
	const errors: string[] = [];
	page.on('pageerror', (e) => errors.push(e.message));
	await page.goto('/');
	await page.getByRole('button', { name: 'Cambiar a español', exact: true }).click();
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	expect(errors).toEqual([]);
});

test('R6 hero renders a truthful CSP-safe fallback for corrupt cached artwork', async ({
	page
}) => {
	const errors: string[] = [];
	page.on('console', (m) => {
		if (m.type() === 'error') errors.push(m.text());
	});
	page.on('pageerror', (e) => errors.push(e.message));
	await page.route('**/assets/derived/wgn-hero-*', (route) =>
		route.fulfill({ status: 200, contentType: 'image/webp', body: 'not-an-image' })
	);
	const response = await page.goto('/');
	expect(await response!.text()).not.toMatch(/\son[a-z]+\s*=/i);
	await expect(
		page.getByRole('img', { name: 'WGN skyline illustration unavailable', exact: true })
	).toBeVisible();
	expect(errors).toEqual([]);
});

test('R6 prompt editor has primary-first mobile order and a separate desktop guide', async ({
	page
}) => {
	await page.goto('/prompt-library/clear-email');
	const editor = await page.locator('.workspace-editor').boundingBox();
	const guide = await page.locator('.workspace-guide').boundingBox();
	if (page.viewportSize()!.width < 950) expect(editor!.y).toBeLessThan(guide!.y);
	else expect(editor!.x).toBeGreaterThan(guide!.x);
});
