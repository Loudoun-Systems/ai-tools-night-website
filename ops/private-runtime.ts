import {
	chmodSync,
	lstatSync,
	mkdirSync,
	readFileSync,
	realpathSync,
	renameSync,
	unlinkSync,
	writeFileSync
} from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';
import { randomBytes } from 'node:crypto';
import { JWT } from 'google-auth-library';
import { QA_TAB_ALLOWLIST } from '../src/lib/server/forms/providers';
import { ALLOWED_MODELS } from '../src/lib/server/chat';

export const MASTER_SHEET_ID = '1Am9-Iok3kN78PDKhoZZgnXadyDYy_OcGuae3PnskEHA';
type Environment = Record<string, string>;
type KeyMetadata = {
	limit?: unknown;
	limit_remaining?: unknown;
	limit_reset?: unknown;
	is_management_key?: unknown;
};

export function boundedKeyStatus(data: KeyMetadata) {
	const finitePositive = (value: unknown): value is number =>
		typeof value === 'number' && Number.isFinite(value) && value > 0;
	return {
		applicationKey: data.is_management_key === false,
		finiteSpendLimit: finitePositive(data.limit),
		remainingBudget: finitePositive(data.limit_remaining),
		limit: typeof data.limit === 'number' && Number.isFinite(data.limit) ? data.limit : null,
		limitRemaining:
			typeof data.limit_remaining === 'number' && Number.isFinite(data.limit_remaining)
				? data.limit_remaining
				: null,
		reset: typeof data.limit_reset === 'string' ? data.limit_reset : null,
		ready:
			data.is_management_key === false &&
			finitePositive(data.limit) &&
			finitePositive(data.limit_remaining)
	};
}

export function readPrivateFile(path: string): string {
	const stat = lstatSync(path);
	if (
		!stat.isFile() ||
		stat.isSymbolicLink() ||
		(stat.mode & 0o077) !== 0 ||
		(process.getuid && stat.uid !== process.getuid())
	) {
		throw new Error('private_file_requires_current_owner_regular_file_and_0600');
	}
	return readFileSync(path, 'utf8');
}

function runtimePath(): string {
	return join(homedir(), '.config/wgn/runtime.env.json');
}

function existingEnvironment(path: string): Environment {
	let text: string;
	try {
		text = readPrivateFile(path);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
		throw error;
	}
	const value: unknown = JSON.parse(text);
	if (
		!value ||
		typeof value !== 'object' ||
		Array.isArray(value) ||
		Object.values(value).some((entry) => typeof entry !== 'string')
	) {
		throw new Error('private_runtime_must_be_string_map');
	}
	return value as Environment;
}

export function prepareEnvironment(
	existing: Environment,
	credentials: { client_email?: string; private_key?: string; type?: string },
	websiteKey: string,
	privateRoot: string
): Environment {
	if (
		credentials.type !== 'service_account' ||
		!credentials.client_email ||
		!credentials.private_key?.startsWith('-----BEGIN PRIVATE KEY-----') ||
		!/^sk-or-v1-[A-Za-z0-9_-]+$/.test(websiteKey)
	) {
		throw new Error('invalid_private_credential_format');
	}
	const mapped: Environment = {
		GOOGLE_SERVICE_ACCOUNT_EMAIL: credentials.client_email,
		GOOGLE_PRIVATE_KEY: credentials.private_key,
		WGN_SHEET_ID: MASTER_SHEET_ID,
		OPENROUTER_API_KEY: websiteKey
	};
	for (const [name, value] of Object.entries(mapped)) {
		if (existing[name] && existing[name] !== value) {
			throw new Error(`existing_private_setting_conflict_${name}`);
		}
	}
	return {
		WGN_ENV: 'staging',
		WGN_FORMS_MODE: 'fixture',
		WGN_CHAT_MODE: 'fixture',
		WGN_CHAT_ENABLED: 'false',
		WGN_CHAT_KILL_SWITCH: 'true',
		WGN_TEST_DATA_ONLY: 'true',
		WGN_AUTOMATION_EXCLUSION_VERIFIED: 'false',
		WGN_CHAT_CAP_VERIFIED: 'false',
		WGN_CHAT_ACCOUNT_CAP_VERIFIED: 'false',
		WGN_CHAT_BUDGET_APPROVED: 'false',
		WGN_CHAT_MAX_OUTPUT_TOKENS: '240',
		WGN_CHAT_REQUEST_LIMIT: '12',
		WGN_CHAT_DAILY_REQUEST_CAP: '100',
		WGN_CHAT_DAILY_TOKEN_CAP: '24000',
		WGN_SQLITE_PATH: join(privateRoot, 'state/wgn-staging.sqlite'),
		WGN_RATE_LIMIT_SALT: randomBytes(32).toString('hex'),
		...existing,
		...mapped
	};
}

async function inspect(env: Environment) {
	const blockers: string[] = [];
	const receipt: Record<string, unknown> = {
		checkedAt: new Date().toISOString(),
		readOnly: true,
		inferenceRequests: 0,
		sheetWrites: 0
	};
	try {
		const client = new JWT({
			email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			key: env.GOOGLE_PRIVATE_KEY,
			scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
		});
		const token = await client.authorize();
		const response = await fetch(
			`https://sheets.googleapis.com/v4/spreadsheets/${MASTER_SHEET_ID}?fields=spreadsheetId,properties(title),sheets(properties(sheetId,title))`,
			{
				headers: { authorization: `Bearer ${token.access_token}` },
				signal: AbortSignal.timeout(15000)
			}
		);
		if (!response.ok) throw new Error('google_read_failed');
		const body = (await response.json()) as {
			spreadsheetId?: string;
			sheets?: Array<{ properties?: { title?: string } }>;
		};
		const names = new Set(body.sheets?.map((sheet) => sheet.properties?.title));
		const missing = Object.values(QA_TAB_ALLOWLIST).filter((title) => !names.has(title));
		if (body.spreadsheetId !== MASTER_SHEET_ID) blockers.push('workbook_identity_mismatch');
		receipt.google = {
			authenticated: true,
			exactWorkbook: body.spreadsheetId === MASTER_SHEET_ID,
			existingTabCount: names.size,
			missingQaTabs: missing
		};
		if (missing.length) blockers.push('qa_tabs_missing_do_not_create_before_automation_review');
	} catch {
		receipt.google = { authenticated: false };
		blockers.push('google_authentication_or_workbook_read_failed');
	}
	// Neither credentials nor workbook metadata prove current bound-script/follow-up exclusion.
	blockers.push('current_automation_exclusion_evidence_required');
	try {
		const response = await fetch('https://openrouter.ai/api/v1/key', {
			headers: { authorization: `Bearer ${env.OPENROUTER_API_KEY}` },
			signal: AbortSignal.timeout(15000)
		});
		if (!response.ok) throw new Error('key_read_failed');
		const body = (await response.json()) as { data?: KeyMetadata };
		const status = boundedKeyStatus(body.data ?? {});
		receipt.openrouter = { authenticated: true, ...status };
		if (!status.ready)
			blockers.push('website_key_requires_finite_positive_spend_limit_and_balance');
	} catch {
		receipt.openrouter = { authenticated: false };
		blockers.push('openrouter_key_authentication_failed');
	}
	try {
		const response = await fetch('https://openrouter.ai/api/v1/models', {
			signal: AbortSignal.timeout(15000)
		});
		if (!response.ok) throw new Error('catalog_read_failed');
		const body = (await response.json()) as { data?: Array<{ id?: string }> };
		const available = [...ALLOWED_MODELS].filter((id) =>
			body.data?.some((model) => model.id === id)
		);
		receipt.availableAllowlistedModels = available;
		if (!available.length) blockers.push('no_allowlisted_model_available');
	} catch {
		blockers.push('current_model_catalog_unavailable');
	}
	blockers.push('approved_numeric_chat_budget_and_benchmark_caps_required');
	return { ...receipt, readyForLiveTests: blockers.length === 0, blockers };
}

async function main() {
	const path = runtimePath();
	if (process.argv[2] === 'prepare') {
		const root = dirname(path);
		mkdirSync(root, { recursive: true, mode: 0o700 });
		if (realpathSync(root) !== resolve(root) || resolve(root).startsWith(resolve('.') + sep)) {
			throw new Error('runtime_must_be_outside_repository_without_symlinks');
		}
		chmodSync(root, 0o700);
		const credentials = JSON.parse(
			readPrivateFile(join(root, 'secrets/wgn-sheets-service-account.json'))
		);
		const key = readPrivateFile(join(root, 'secrets/openrouter-api-key.txt')).trim();
		const env = prepareEnvironment(existingEnvironment(path), credentials, key, root);
		const temporary = `${path}.${randomBytes(12).toString('hex')}.tmp`;
		try {
			writeFileSync(temporary, JSON.stringify(env, null, 2) + '\n', { mode: 0o600, flag: 'wx' });
			renameSync(temporary, path);
		} finally {
			try {
				unlinkSync(temporary);
			} catch {
				// Best-effort cleanup must not replace the original write outcome.
			}
		}
		mkdirSync(join(root, 'state'), { recursive: true, mode: 0o700 });
		console.log(
			JSON.stringify({ prepared: true, privateRuntimePath: path, providersStarted: false })
		);
	} else if (process.argv[2] === 'check') {
		const receipt = await inspect(existingEnvironment(path));
		console.log(JSON.stringify(receipt, null, 2));
		if (!receipt.readyForLiveTests) process.exitCode = 3;
	} else if (process.argv[2] === 'preview') {
		process.umask(0o077);
		const env = existingEnvironment(path);
		if (!env.WGN_SQLITE_PATH?.startsWith(join(dirname(path), 'state') + sep)) {
			throw new Error('preview_requires_prepared_private_persistent_state');
		}
		const revision = Bun.spawnSync(['git', 'rev-parse', 'HEAD']);
		const sha = revision.stdout.toString().trim();
		if (revision.exitCode !== 0 || !/^[0-9a-f]{40}$/.test(sha)) {
			throw new Error('preview_requires_exact_git_revision');
		}
		// This command is deliberately fixture-only even if the private file later enables providers.
		const child = Bun.spawn(['bun', 'run', 'build/index.js'], {
			env: {
				...process.env,
				...env,
				HOST: '127.0.0.1',
				PORT: '4177',
				ORIGIN: 'http://127.0.0.1:4177',
				WGN_ALLOWED_ORIGINS: 'http://127.0.0.1:4177',
				WGN_ENV: 'staging',
				WGN_RELEASE_SHA: sha,
				WGN_FORMS_MODE: 'fixture',
				WGN_CHAT_MODE: 'fixture',
				WGN_CHAT_ENABLED: 'false',
				WGN_CHAT_KILL_SWITCH: 'true',
				WGN_AUTOMATION_EXCLUSION_VERIFIED: 'false'
			},
			stdout: 'inherit',
			stderr: 'inherit'
		});
		for (const signal of ['SIGTERM', 'SIGINT'] as const) {
			process.on(signal, () => child.kill(signal));
		}
		process.exitCode = await child.exited;
	} else {
		throw new Error('usage_bun_ops_private_runtime_ts_prepare_check_or_preview');
	}
}

if (import.meta.main) {
	main().catch(() => {
		// Provider exceptions can include request headers/credentials. Never serialize them.
		console.error(
			'WGN private-runtime operation failed; inspect permissions/configuration locally.'
		);
		process.exitCode = 1;
	});
}
