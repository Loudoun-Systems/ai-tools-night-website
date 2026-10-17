import { afterEach, expect, test } from 'bun:test';
import { chatMode, formsMode, runtimeEnvironment } from '../../src/lib/server/config';
import { processChat, OpenRouterProvider } from '../../src/lib/server/chat';
import { processSubmission } from '../../src/lib/server/forms/service';

const original = { ...process.env };
afterEach(() => {
	for (const key of Object.keys(process.env)) if (!(key in original)) delete process.env[key];
	Object.assign(process.env, original);
});

test('production disables fixtures, the QA adapter and benchmark chat regardless of mode flags', () => {
	process.env.WGN_ENV = 'production';
	for (const mode of ['fixture', 'google', 'disabled', 'typo']) {
		process.env.WGN_FORMS_MODE = mode;
		expect(formsMode()).toBe('disabled');
	}
	for (const mode of ['fixture', 'openrouter', 'disabled', 'typo']) {
		process.env.WGN_CHAT_MODE = mode;
		expect(chatMode()).toBe('disabled');
	}
});

test('NODE_ENV production is safe when WGN_ENV is absent or invalid', () => {
	process.env.NODE_ENV = 'production';
	delete process.env.WGN_ENV;
	expect(runtimeEnvironment()).toBe('production');
	expect(formsMode()).toBe('disabled');
	expect(chatMode()).toBe('disabled');
	process.env.WGN_ENV = 'typo';
	expect(runtimeEnvironment()).toBe('production');
});

test('production forms reject before opening SQLite or invoking an injected provider', async () => {
	process.env.WGN_ENV = 'production';
	let calls = 0;
	const response = await processSubmission({}, 'production-safety-test', 'identity', {
		provider: {
			submit: async () => {
				calls++;
				return { mode: 'fixture', providerReference: null };
			}
		}
	});
	expect(response.status).toBe(503);
	expect(response.body.error).toBe('forms_unavailable');
	expect(response.body.accepted).toBeUndefined();
	expect(response.body.receiptId).toBeUndefined();
	expect(calls).toBe(0);
});

test('production chat rejects even an explicit fixture override without a provider request', async () => {
	process.env.WGN_ENV = 'production';
	let calls = 0;
	const provider = new OpenRouterProvider({
		fetchImplementation: (async () => {
			calls++;
			return Response.json({});
		}) as unknown as typeof fetch
	});
	for (const mode of ['fixture', 'openrouter'] as const) {
		const response = await processChat(
			{ locale: 'en', messages: [{ role: 'user', content: 'Hello' }] },
			'identity',
			{ provider, mode }
		);
		expect(response.status).toBe(503);
		expect(response.body.error).toBe('chat_unavailable');
		expect(response.body.answer).toBeUndefined();
	}
	expect(calls).toBe(0);
});

test('invalid nonproduction mode values are disabled rather than silently becoming fixtures', () => {
	process.env.WGN_ENV = 'testing';
	process.env.WGN_FORMS_MODE = 'typo';
	process.env.WGN_CHAT_MODE = 'typo';
	expect(formsMode()).toBe('disabled');
	expect(chatMode()).toBe('disabled');
});
