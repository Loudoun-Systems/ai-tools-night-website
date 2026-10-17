import { describe, expect, test } from 'bun:test';
import { mkdtempSync, writeFileSync, chmodSync, symlinkSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
	boundedKeyStatus,
	MASTER_SHEET_ID,
	prepareEnvironment,
	readPrivateFile
} from '../../ops/private-runtime';

const credentials = {
	type: 'service_account',
	client_email: 'synthetic@example.invalid',
	private_key: '-----BEGIN PRIVATE KEY-----\nSYNTHETIC_NOT_A_KEY\n-----END PRIVATE KEY-----'
};
const websiteKey = 'sk-or-v1-SYNTHETIC_NOT_A_KEY';

describe('private runtime preparation', () => {
	test('maps credentials without opening provider gates and preserves private settings', () => {
		const env = prepareEnvironment(
			{ WGN_CHAT_DAILY_REQUEST_CAP: '5', CUSTOM_SETTING: 'preserved' },
			credentials,
			websiteKey,
			'/private/wgn'
		);
		expect(env.WGN_SHEET_ID).toBe(MASTER_SHEET_ID);
		expect(env.GOOGLE_SERVICE_ACCOUNT_EMAIL).toBe(credentials.client_email);
		expect(env.GOOGLE_PRIVATE_KEY).toBe(credentials.private_key);
		expect(env.OPENROUTER_API_KEY).toBe(websiteKey);
		expect(env.WGN_CHAT_DAILY_REQUEST_CAP).toBe('5');
		expect(env.CUSTOM_SETTING).toBe('preserved');
		expect(env.WGN_FORMS_MODE).toBe('fixture');
		expect(env.WGN_CHAT_MODE).toBe('fixture');
		expect(env.WGN_CHAT_ENABLED).toBe('false');
		expect(env.WGN_CHAT_KILL_SWITCH).toBe('true');
		expect(env.WGN_AUTOMATION_EXCLUSION_VERIFIED).toBe('false');
		expect(env.WGN_CHAT_ACCOUNT_CAP_VERIFIED).toBe('false');
		expect(env.WGN_CHAT_BUDGET_APPROVED).toBe('false');
		expect(env.WGN_SQLITE_PATH).toBe('/private/wgn/state/wgn-staging.sqlite');
	});

	test('never silently replaces conflicting existing private credentials', () => {
		expect(() =>
			prepareEnvironment(
				{ OPENROUTER_API_KEY: 'different' },
				credentials,
				websiteKey,
				'/private/wgn'
			)
		).toThrow('existing_private_setting_conflict_OPENROUTER_API_KEY');
	});

	test('rejects readable-by-others and symlink credential files', () => {
		const directory = mkdtempSync(join(tmpdir(), 'wgn-private-file-test-'));
		try {
			const path = join(directory, 'synthetic.txt');
			writeFileSync(path, 'synthetic', { mode: 0o600 });
			expect(readPrivateFile(path)).toBe('synthetic');
			chmodSync(path, 0o644);
			expect(() => readPrivateFile(path)).toThrow('private_file_requires');
			chmodSync(path, 0o600);
			const link = join(directory, 'link.txt');
			symlinkSync(path, link);
			expect(() => readPrivateFile(link)).toThrow('private_file_requires');
		} finally {
			rmSync(directory, { recursive: true, force: true });
		}
	});
});

describe('real OpenRouter metadata safety', () => {
	test('null limits are uncapped, not zero-budget approval', () => {
		const status = boundedKeyStatus({
			limit: null,
			limit_remaining: null,
			is_management_key: false
		});
		expect(status.ready).toBe(false);
		expect(status.finiteSpendLimit).toBe(false);
		expect(status.limit).toBeNull();
	});

	test('requires a finite positive limit, balance and normal application key', () => {
		expect(
			boundedKeyStatus({ limit: 1, limit_remaining: 0.5, is_management_key: false }).ready
		).toBe(true);
		for (const invalid of [undefined, null, 0, -1, Infinity, NaN, '1']) {
			expect(
				boundedKeyStatus({ limit: invalid, limit_remaining: 0.5, is_management_key: false }).ready
			).toBe(false);
			expect(
				boundedKeyStatus({ limit: 1, limit_remaining: invalid, is_management_key: false }).ready
			).toBe(false);
		}
		expect(
			boundedKeyStatus({ limit: 1, limit_remaining: 0.5, is_management_key: true }).ready
		).toBe(false);
		expect(boundedKeyStatus({ limit: 1, limit_remaining: 0.5 }).ready).toBe(false);
	});
});
