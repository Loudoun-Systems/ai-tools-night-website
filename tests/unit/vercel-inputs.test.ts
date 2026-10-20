import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('Vercel legacy exclusions are root-anchored, retaining the SvelteKit template and API tree', () => {
	const rules = readFileSync(resolve(import.meta.dir, '../../.vercelignore'), 'utf8')
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#'));
	for (const legacy of [
		'api/',
		'legacy-static/',
		'css/',
		'js/',
		'*.html',
		'server.js',
		'run.mjs'
	]) {
		expect(rules).toContain(`/${legacy}`);
		expect(rules).not.toContain(legacy);
	}
	for (const required of [
		'src/app.html',
		'src/routes/api/forms/+server.ts',
		'src/routes/api/chat/+server.ts'
	]) {
		expect(
			readFileSync(resolve(import.meta.dir, '../..', required), 'utf8').length
		).toBeGreaterThan(0);
		expect(rules).not.toContain(required);
	}
});
