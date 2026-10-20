import { expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { robotsPolicy } from '../../src/lib/server/robots';

test('production robots allows indexing and declares the canonical sitemap', () => {
	expect(robotsPolicy('production')).toContain('Allow: /\n');
	expect(robotsPolicy('production')).toContain('Sitemap: https://wevegotnow.com/sitemap.xml');
	expect(robotsPolicy('production')).not.toContain('Disallow: /');
	// A static file would take precedence over the environment-aware endpoint on Vercel.
	expect(existsSync(resolve(import.meta.dir, '../../static/robots.txt'))).toBe(false);
});

test('testing and preview robots continue to disallow all crawling', () => {
	for (const environment of ['testing', 'staging'] as const) {
		expect(robotsPolicy(environment)).toBe('User-agent: *\nDisallow: /\n');
	}
});
