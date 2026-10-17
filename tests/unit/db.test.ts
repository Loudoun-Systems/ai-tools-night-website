import { afterEach, describe, expect, test } from 'bun:test';
import { existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { DurableStore } from '../../src/lib/server/db';

const scratchDirectory = resolve(import.meta.dir, '../../../scratch/tests');
const databasePath = resolve(scratchDirectory, 'durability.sqlite');
const walPath = `${databasePath}-wal`;
const shmPath = `${databasePath}-shm`;

mkdirSync(scratchDirectory, { recursive: true });

function removeDatabase(): void {
	for (const path of [databasePath, walPath, shmPath]) {
		if (existsSync(path)) unlinkSync(path);
	}
}

afterEach(removeDatabase);

describe('durable SQLite controls', () => {
	test('persists idempotency outcomes across store restarts', () => {
		const first = new DurableStore(databasePath);
		const claim = first.claimSubmission('persist-key-123456', 'community', 'request-hash');
		expect(claim.claimed).toBe(true);
		first.completeSubmission('persist-key-123456', 'fixture', 'WGN-FX-persist', null);
		first.close();

		const second = new DurableStore(databasePath);
		const row = second.getSubmission('persist-key-123456');
		expect(row?.state).toBe('fixture');
		expect(row?.receipt_id).toBe('WGN-FX-persist');
		second.close();
	});

	test('atomically increments rate-limit buckets', () => {
		const store = new DurableStore(':memory:');
		const results = Array.from({ length: 4 }, () =>
			store.consumeRateLimit('forms:community', 'identity', 3, 60_000, 100_000)
		);
		expect(results.map((result) => result.allowed)).toEqual([true, true, true, false]);
		expect(results.at(-1)?.remaining).toBe(0);
		store.close();
	});

	test('rejects reuse of an idempotency key with different input', () => {
		const store = new DurableStore(':memory:');
		store.claimSubmission('conflict-key-1234', 'community', 'first');
		const conflict = store.claimSubmission('conflict-key-1234', 'community', 'second');
		expect(conflict.claimed).toBe(false);
		expect(conflict.conflict).toBe(true);
		store.close();
	});

	test('enforces a shared chat cap across two SQLite connections', () => {
		const first = new DurableStore(databasePath);
		const second = new DurableStore(databasePath);
		expect(first.reserveChatUsage('2026-10-14', 600, 2, 1000)).toBe(true);
		expect(second.reserveChatUsage('2026-10-14', 500, 2, 1000)).toBe(false);
		expect(second.reserveChatUsage('2026-10-14', 400, 2, 1000)).toBe(true);
		expect(first.reserveChatUsage('2026-10-14', 1, 2, 1000)).toBe(false);
		first.close();
		second.close();
	});
});
