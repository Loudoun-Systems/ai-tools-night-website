import { test, expect } from '@playwright/test';
import { images, prompts } from '../../src/lib/content';

test('ambient backgrounds are decorative, animated, pausable and preference-persistent', async ({
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

test('decorative motion suspends on visibility events and resumes without a timer', async ({
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

test('R7 identity separates readable display type from brand accents and keeps availability honest', async ({
	page
}) => {
	const calls: string[] = [];
	page.on('request', (r) => {
		if (/\/api\/(forms|chat)/.test(r.url())) calls.push(r.url());
	});
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		/A curious mind\.\s*A useful next step\./
	);
	await expect(page.locator('.r7-opening')).toBeVisible();
	await expect(page.locator('.r7-scene-main img')).toBeVisible();
	await expect(page.locator('.r7-scene-main')).toHaveAttribute('href', '/workshops');
	if (await page.locator('.stage-banner').count()) {
		expect(
			await page.locator('.stage-banner').evaluate((e) => {
				const rect = e.getBoundingClientRect();
				return !!document
					.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
					?.closest('.stage-banner');
			})
		).toBe(true);
	}
	const displayFont = await page.locator('h1').evaluate((e) => getComputedStyle(e).fontFamily);
	expect(displayFont).toContain('Manrope');
	expect(displayFont).not.toContain('Orbitron');
	expect(
		await page
			.locator('.r7-opening .eyebrow > span')
			.first()
			.evaluate((e) => getComputedStyle(e).fontFamily)
	).toContain('Orbitron');
	expect(
		await page.evaluate(
			() => document.fonts.check('16px Manrope') && document.fonts.check('16px Inter')
		)
	).toBe(true);
	await expect(page.locator('.hero-media')).toHaveCount(0);
	await expect(page.locator('.chat-launcher')).toHaveCount(0);
	await expect(page.locator('input[name="email"]')).toHaveCount(0);
	expect(calls).toEqual([]);
});

test('desktop disclosure and native mobile drawer work with keyboard and return focus', async ({
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

test('event filters distinguish past, pending and empty upcoming records', async ({ page }) => {
	await page.goto('/events');
	await page.getByRole('button', { name: 'Upcoming', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Upcoming', exact: true })).toHaveAttribute(
		'aria-pressed',
		'true'
	);
	await expect(page.getByRole('heading', { name: 'No events match this filter.' })).toBeVisible();
	await expect(page.locator('.results-note')).toHaveText('0 records shown');
	await page.getByRole('button', { name: 'Past', exact: true }).click();
	await expect(page.locator('.event-row')).toHaveCount(2);
	await page.getByRole('button', { name: 'Workshops', exact: true }).click();
	await expect(page.locator('.event-row')).toHaveCount(1);
	await expect(page.locator('.event-row')).toContainText('Date to be confirmed');
	await expect(page.locator('.results-note')).toHaveText('1 records shown');
});

test('expanded prompt catalog has accurate counts, meaningful categories and reversible search', async ({
	page
}) => {
	const advanced = prompts.find((prompt) => prompt.slug === 'decision-brief-with-evidence')!;
	const categoryCount = prompts.filter(
		(prompt) => prompt.category.en === advanced.category.en
	).length;
	await page.goto('/prompt-library');
	await expect(page.locator('.prompt-card')).toHaveCount(prompts.length);
	await expect(page.locator('.lp-count-line [role="status"]')).toHaveText(
		`${prompts.length} templates shown`
	);
	await expect(page.locator('textarea')).toHaveCount(0);
	const category = page
		.getByRole('navigation', { name: 'Prompt categories', exact: true })
		.getByRole('button')
		.filter({ hasText: advanced.category.en });
	await category.click();
	await expect(category).toHaveAttribute('aria-pressed', 'true');
	await expect(page.locator('.prompt-card')).toHaveCount(categoryCount);
	await expect(page.getByRole('heading', { name: advanced.title.en, exact: true })).toBeVisible();
	await page.getByLabel('Search prompts').fill('zz-no-match');
	await expect(page.getByRole('heading', { name: 'No prompts match.' })).toBeVisible();
	await expect(page.locator('.prompt-card')).toHaveCount(0);
	await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
	await expect(page.getByLabel('Search prompts')).toHaveValue('');
	await expect(page.locator('.prompt-card')).toHaveCount(prompts.length);
	await page.getByLabel('Search prompts').fill(advanced.outcome!.en);
	await expect(page.locator('.prompt-card')).toHaveCount(1);
	await expect(page.getByRole('heading', { name: advanced.title.en, exact: true })).toBeVisible();
	await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
	await page.getByRole('button', { name: 'Cambiar a español', exact: true }).click();
	await page
		.getByRole('navigation', { name: 'Categorías de prompts', exact: true })
		.getByRole('button')
		.filter({ hasText: advanced.category.es })
		.click();
	await expect(page.locator('.prompt-card')).toHaveCount(categoryCount);
	await page.getByLabel('Buscar prompts').fill(advanced.title.es);
	await expect(page.locator('.prompt-card')).toHaveCount(1);
	await expect(page.locator('.lp-count-line [role="status"]')).toHaveText('1 plantilla visible');
	await page.getByRole('link', { name: `Abrir prompt: ${advanced.title.es}`, exact: true }).click();
	await expect(page.getByLabel('Texto editable del prompt')).toHaveValue(advanced.prompt.es);
});

test('original and advanced prompt workspaces retain independent bilingual drafts and reset deliberately', async ({
	page
}) => {
	const representatives = ['clear-email', 'decision-brief-with-evidence'].map((slug) =>
		prompts.find((prompt) => prompt.slug === slug)!
	);
	for (const prompt of representatives) {
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
		await page.getByRole('button', { name: 'Cambiar a español', exact: true }).click();
		await expect(spanish).toHaveValue('ES borrador de prueba');
		await page.getByRole('button', { name: 'Restablecer', exact: true }).click();
		await expect(spanish).toHaveValue(prompt.prompt.es);
		await page.getByRole('button', { name: 'Switch to English', exact: true }).click();
	}
});

test('bookmarks persist locally across reload and compose with the Saved filter and search', async ({
	page
}) => {
	const advanced = prompts.find((prompt) => prompt.slug === 'decision-brief-with-evidence')!;
	const calls: string[] = [];
	page.on('request', (request) => {
		if (/\/api\//.test(request.url())) calls.push(request.url());
	});
	await page.goto('/prompt-library');
	await page.getByRole('button', { name: 'Save prompt: Write a clear email', exact: true }).click();
	await page
		.getByRole('button', { name: `Save prompt: ${advanced.title.en}`, exact: true })
		.click();
	await expect(page.locator('.lp-save-notice')).toHaveText('Saved list updated on this device.');
	expect(
		await page.evaluate(() => JSON.parse(localStorage.getItem('wgn-saved-prompts-v1') ?? '[]'))
	).toEqual(['clear-email', advanced.slug]);
	await page.reload();
	await expect(page.locator('.lp-saved-toggle')).toContainText('2');
	await page.locator('.lp-saved-toggle').click();
	await expect(page.locator('.lp-saved-toggle')).toHaveAttribute('aria-pressed', 'true');
	await expect(page.locator('.prompt-card')).toHaveCount(2);
	await page.getByLabel('Search prompts').fill(advanced.title.en);
	await expect(page.locator('.prompt-card')).toHaveCount(1);
	await expect(page.getByRole('heading', { name: advanced.title.en, exact: true })).toBeVisible();
	await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
	await expect(page.getByLabel('Search prompts')).toHaveValue('');
	await expect(page.locator('.lp-saved-toggle')).toHaveAttribute('aria-pressed', 'false');
	await expect(page.locator('.prompt-card')).toHaveCount(prompts.length);
	await page.locator('.lp-saved-toggle').click();
	await page
		.getByRole('button', { name: `Remove saved prompt: ${advanced.title.en}`, exact: true })
		.click();
	await expect(page.locator('.prompt-card')).toHaveCount(1);
	await expect(
		page.getByRole('heading', { name: 'Write a clear email', exact: true })
	).toBeVisible();
	await page.getByRole('button', { name: 'Cambiar a español', exact: true }).click();
	await expect(
		page.getByRole('heading', { name: 'Escribe un correo claro', exact: true })
	).toBeVisible();
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	await expect(page.locator('.lp-saved-toggle')).toContainText('1');
	await page.locator('.lp-saved-toggle').click();
	await expect(page.locator('.prompt-card')).toHaveCount(1);
	await expect(
		page.getByRole('heading', { name: 'Escribe un correo claro', exact: true })
	).toBeVisible();
	expect(calls).toEqual([]);
});

test('blocked bookmark storage reports failure without pretending a prompt was saved', async ({
	page
}) => {
	await page.addInitScript(() => {
		Storage.prototype.setItem = () => {
			throw new DOMException('Denied', 'SecurityError');
		};
	});
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/prompt-library');
	const bookmark = page.getByRole('button', {
		name: 'Save prompt: Write a clear email',
		exact: true
	});
	await bookmark.click();
	await expect(page.locator('.lp-save-notice')).toContainText(
		'This browser could not save the list.'
	);
	await expect(bookmark).toHaveAttribute('aria-pressed', 'false');
	await page.locator('.lp-saved-toggle').click();
	await expect(page.locator('.prompt-card')).toHaveCount(0);
	await expect(
		page.getByRole('heading', { name: 'Your collection starts here.', exact: true })
	).toBeVisible();
	await page.getByRole('button', { name: 'Show every template', exact: true }).click();
	await expect(page.locator('.prompt-card')).toHaveCount(prompts.length);
	expect(errors).toEqual([]);
});

test('clipboard denial selects real editable text instead of claiming a copy succeeded', async ({
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

test('workshops, contribution paths and illustrative projects remain truthful', async ({
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
	await expect(page.locator('.route-paths-intro')).toContainText('not confirmed paid job openings');
	await expect(page.getByRole('link', { name: /apply now/i })).toHaveCount(0);
	await page.goto('/projects');
	await expect(page.locator('.route-idea')).toHaveCount(3);
	await expect(page.locator('#project-ideas')).toContainText(
		'ILLUSTRATIVE IDEAS · NOT PUBLISHED COMMUNITY PROJECTS'
	);
	await expect(page.locator('#project-ideas')).toContainText(
		'not products, client work or promised outcomes'
	);
});

test('reduced motion and no-JavaScript fallback preserve readable public content', async ({
	page,
	browser
}) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	expect(
		await page
			.locator('.orbital-system i')
			.first()
			.evaluate((e) => getComputedStyle(e).animationName)
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

test('language controls survive denied optional localStorage access', async ({ page }) => {
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

test('R7 opening renders a truthful CSP-safe fallback for corrupt cached artwork', async ({
	page
}) => {
	const errors: string[] = [];
	page.on('console', (m) => {
		if (m.type() === 'error') errors.push(m.text());
	});
	page.on('pageerror', (e) => errors.push(e.message));
	await page.route(`**/assets/**/${images.workshops.base}*`, (route) =>
		route.fulfill({ status: 200, contentType: 'image/webp', body: 'not-an-image' })
	);
	const response = await page.goto('/');
	expect(await response!.text()).not.toMatch(/\son[a-z]+\s*=/i);
	await expect(
		page.locator('.r7-scene-main').getByRole('img', { name: images.workshops.alt.en, exact: true })
	).toBeVisible();
	await expect(page.locator('.r7-scene-main .image-fallback')).toContainText(
		'Concept artwork unavailable'
	);
	expect(errors).toEqual([]);
});

test('prompt editor has primary-first mobile order and a separate desktop guide', async ({
	page
}) => {
	await page.goto('/prompt-library/clear-email');
	const editor = await page.locator('.workspace-editor').boundingBox();
	const guide = await page.locator('.workspace-guide').boundingBox();
	if (page.viewportSize()!.width <= 800) expect(editor!.y).toBeLessThan(guide!.y);
	else expect(editor!.x).toBeLessThan(guide!.x);
});
