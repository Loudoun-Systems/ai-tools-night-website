import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { sqlitePath } from './config';

type BunDatabase = import('bun:sqlite').Database;
const runtimeRequire = createRequire(import.meta.url);
const sqliteWaitBuffer = new Int32Array(new SharedArrayBuffer(4));

function withBusyRetry(action: () => void): void {
	for (let attempt = 0; ; attempt += 1) {
		try {
			action();
			return;
		} catch (error) {
			const busy = error instanceof Error && /SQLITE_BUSY|database is locked/i.test(error.message);
			if (!busy || attempt >= 7) throw error;
			Atomics.wait(sqliteWaitBuffer, 0, 0, 25 * 2 ** attempt);
		}
	}
}

export type SubmissionState = 'processing' | 'fixture' | 'delivered' | 'uncertain';

export type SubmissionRow = {
	idempotency_key: string;
	form_type: string;
	request_hash: string;
	state: SubmissionState;
	receipt_id: string | null;
	provider_reference: string | null;
	created_at: string;
	updated_at: string;
};

export class DurableStore {
	readonly database: BunDatabase;

	constructor(path = sqlitePath()) {
		if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
		const { Database } = runtimeRequire('bun:sqlite') as typeof import('bun:sqlite');
		this.database = new Database(path, { create: true, strict: true });
		this.database.exec('PRAGMA busy_timeout = 10000;');
		withBusyRetry(() => this.database.exec('PRAGMA journal_mode = WAL;'));
		this.database.exec('PRAGMA foreign_keys = ON;');
		withBusyRetry(() =>
			this.database.exec(`
			CREATE TABLE IF NOT EXISTS submissions (
				idempotency_key TEXT PRIMARY KEY,
				form_type TEXT NOT NULL,
				request_hash TEXT NOT NULL,
				state TEXT NOT NULL CHECK (state IN ('processing','fixture','delivered','uncertain')),
				receipt_id TEXT,
				provider_reference TEXT,
				created_at TEXT NOT NULL,
				updated_at TEXT NOT NULL
			);
			CREATE TABLE IF NOT EXISTS rate_limits (
				scope TEXT NOT NULL,
				identity_hash TEXT NOT NULL,
				window_start INTEGER NOT NULL,
				count INTEGER NOT NULL,
				PRIMARY KEY (scope, identity_hash, window_start)
			);
			CREATE TABLE IF NOT EXISTS chat_usage (
				usage_day TEXT PRIMARY KEY,
				requests INTEGER NOT NULL,
				reserved_tokens INTEGER NOT NULL
			);
		`)
		);
	}

	claimSubmission(
		idempotencyKey: string,
		formType: string,
		requestHash: string,
		now = new Date().toISOString()
	): { claimed: boolean; row: SubmissionRow; conflict: boolean } {
		return this.database.transaction(() => {
			const inserted = this.database
				.query(
					`INSERT INTO submissions
					(idempotency_key, form_type, request_hash, state, created_at, updated_at)
					VALUES (?, ?, ?, 'processing', ?, ?)
					ON CONFLICT(idempotency_key) DO NOTHING`
				)
				.run(idempotencyKey, formType, requestHash, now, now);
			const row = this.database
				.query('SELECT * FROM submissions WHERE idempotency_key = ?')
				.get(idempotencyKey) as SubmissionRow;
			return {
				claimed: inserted.changes === 1,
				row,
				conflict: row.request_hash !== requestHash || row.form_type !== formType
			};
		})();
	}

	completeSubmission(
		idempotencyKey: string,
		state: 'fixture' | 'delivered',
		receiptId: string,
		providerReference: string | null,
		now = new Date().toISOString()
	): void {
		this.database
			.query(
				`UPDATE submissions
				SET state = ?, receipt_id = ?, provider_reference = ?, updated_at = ?
				WHERE idempotency_key = ? AND state = 'processing'`
			)
			.run(state, receiptId, providerReference, now, idempotencyKey);
	}

	markUncertain(idempotencyKey: string, now = new Date().toISOString()): void {
		this.database
			.query(
				`UPDATE submissions SET state = 'uncertain', updated_at = ?
				WHERE idempotency_key = ? AND state = 'processing'`
			)
			.run(now, idempotencyKey);
	}

	getSubmission(idempotencyKey: string): SubmissionRow | null {
		return (
			(this.database
				.query('SELECT * FROM submissions WHERE idempotency_key = ?')
				.get(idempotencyKey) as SubmissionRow | null) ?? null
		);
	}

	consumeRateLimit(
		scope: string,
		identityHash: string,
		limit: number,
		windowMs: number,
		nowMs = Date.now()
	): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
		const windowStart = Math.floor(nowMs / windowMs) * windowMs;
		const count = this.database.transaction(() => {
			const row = this.database
				.query(
					`INSERT INTO rate_limits (scope, identity_hash, window_start, count)
					VALUES (?, ?, ?, 1)
					ON CONFLICT(scope, identity_hash, window_start)
					DO UPDATE SET count = count + 1
					RETURNING count`
				)
				.get(scope, identityHash, windowStart) as { count: number };
			this.database
				.query('DELETE FROM rate_limits WHERE window_start < ?')
				.run(windowStart - windowMs * 4);
			return row.count;
		})();
		return {
			allowed: count <= limit,
			remaining: Math.max(0, limit - count),
			retryAfterSeconds: Math.max(1, Math.ceil((windowStart + windowMs - nowMs) / 1000))
		};
	}

	reserveChatUsage(
		day: string,
		tokenReservation: number,
		requestLimit: number,
		tokenLimit: number
	): boolean {
		return this.database.transaction(() => {
			this.database
				.query(
					`INSERT INTO chat_usage (usage_day, requests, reserved_tokens) VALUES (?, 0, 0)
					ON CONFLICT(usage_day) DO NOTHING`
				)
				.run(day);
			const row = this.database
				.query('SELECT requests, reserved_tokens FROM chat_usage WHERE usage_day = ?')
				.get(day) as { requests: number; reserved_tokens: number };
			if (row.requests >= requestLimit || row.reserved_tokens + tokenReservation > tokenLimit)
				return false;
			this.database
				.query(
					`UPDATE chat_usage
					SET requests = requests + 1, reserved_tokens = reserved_tokens + ?
					WHERE usage_day = ?`
				)
				.run(tokenReservation, day);
			return true;
		})();
	}

	close(): void {
		this.database.close();
	}
}

let sharedStore: DurableStore | undefined;

export function getStore(): DurableStore {
	sharedStore ??= new DurableStore();
	return sharedStore;
}

export function digest(value: string): string {
	return createHash('sha256').update(value).digest('hex');
}

export function stableJson(value: unknown): string {
	if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
	if (value && typeof value === 'object') {
		return `{${Object.entries(value as Record<string, unknown>)
			.sort(([left], [right]) => left.localeCompare(right))
			.map(([key, entry]) => `${JSON.stringify(key)}:${stableJson(entry)}`)
			.join(',')}}`;
	}
	return JSON.stringify(value);
}
