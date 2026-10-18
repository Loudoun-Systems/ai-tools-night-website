import { afterEach, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { formsMode, chatMode, runtimeEnvironment } from '../../src/lib/server/config';
import { DurableStore } from '../../src/lib/server/db';
import { processSubmission, processChat } from '../../src/lib/server/integrations.disabled';

const original = { ...process.env };
afterEach(() => {
	for (const key of Object.keys(process.env)) if (!(key in original)) delete process.env[key];
	Object.assign(process.env, original);
});

test('Vercel platform scope overrides stale WGN environment and activation flags', () => {
	process.env.VERCEL = '1';
	process.env.WGN_FORMS_MODE = 'google';
	process.env.WGN_CHAT_MODE = 'openrouter';
	for (const scope of ['production', 'preview', 'development']) {
		process.env.VERCEL_ENV = scope;
		process.env.WGN_ENV = scope === 'production' ? 'testing' : 'production';
		expect(runtimeEnvironment()).toBe(scope === 'production' ? 'production' : 'staging');
		expect(formsMode()).toBe('disabled');
		expect(chatMode()).toBe('disabled');
	}
});

test('compiled-out integration handlers stay unavailable even without platform flags', async () => {
	delete process.env.VERCEL;
	process.env.WGN_ENV = 'testing';
	process.env.WGN_FORMS_MODE = 'fixture';
	process.env.WGN_CHAT_MODE = 'fixture';
	const forms = await processSubmission({}, 'key', 'identity');
	const chat = await processChat({}, 'identity');
	expect(forms.status).toBe(503);
	expect(forms.body.error).toBe('forms_unavailable');
	expect(forms.body.accepted).toBeUndefined();
	expect(chat.status).toBe(503);
	expect(chat.body.error).toBe('chat_unavailable');
	expect(chat.body.answer).toBeUndefined();
});

test('retained local store refuses Vercel before creating any directory', () => {
	process.env.VERCEL = '1';
	const directory = resolve(process.env.WGN_TEST_SCRATCH ?? '../scratch', 'vercel-store-forbidden');
	expect(() => new DurableStore(resolve(directory, 'wgn.sqlite'))).toThrow(
		'local_sqlite_forbidden_on_vercel'
	);
	expect(existsSync(directory)).toBe(false);
});

test('the standalone Bun target is rejected by the actual config on Vercel', () => {
	const child = Bun.spawnSync(['bun', '-e', 'import "./svelte.config.js"'], {
		cwd: process.cwd(),
		env: { ...process.env, VERCEL: '1', WGN_BUILD_TARGET: 'bun' }
	});
	expect(child.exitCode).not.toBe(0);
	expect(child.stderr.toString()).toContain('must not be deployed to Vercel');
});
