import { afterEach, describe, expect, test } from 'bun:test';
import { existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const scratchDirectory = resolve(import.meta.dir, '../../../scratch/tests');
const databasePath = resolve(scratchDirectory, 'multiprocess.sqlite');
const workerPath = resolve(import.meta.dir, '../fixtures/sqlite-worker.ts');
mkdirSync(scratchDirectory, { recursive: true });

function removeDatabase(): void {
	for (const path of [databasePath, `${databasePath}-wal`, `${databasePath}-shm`]) {
		if (existsSync(path)) unlinkSync(path);
	}
}

async function runWorker(action: string): Promise<Record<string, unknown>> {
	const processHandle = Bun.spawn([process.execPath, workerPath, action, databasePath], {
		stdout: 'pipe',
		stderr: 'pipe'
	});
	const [exitCode, stdout, stderr] = await Promise.all([
		processHandle.exited,
		new Response(processHandle.stdout).text(),
		new Response(processHandle.stderr).text()
	]);
	if (exitCode !== 0) throw new Error(`worker ${action} exited ${exitCode}: ${stderr}`);
	return JSON.parse(stdout.trim()) as Record<string, unknown>;
}

afterEach(removeDatabase);

describe('multi-process SQLite guarantees', () => {
	test('initializes concurrently and preserves atomic claims, rates, budget and receipts', async () => {
		removeDatabase();
		const claims = await Promise.all(Array.from({ length: 8 }, () => runWorker('claim')));
		expect(claims.filter((result) => result.claimed === true)).toHaveLength(1);
		expect(claims.filter((result) => result.conflict === true)).toHaveLength(0);

		const completion = await runWorker('complete');
		expect(completion.state).toBe('fixture');
		const persisted = await runWorker('read');
		expect(persisted.receipt_id).toBe('WGN-FX-MULTIPROCESS');

		const rates = await Promise.all(Array.from({ length: 8 }, () => runWorker('rate')));
		expect(rates.filter((result) => result.allowed === true)).toHaveLength(3);

		const budgets = await Promise.all(Array.from({ length: 8 }, () => runWorker('budget')));
		expect(budgets.filter((result) => result.allowed === true)).toHaveLength(3);
	}, 30_000);
});
