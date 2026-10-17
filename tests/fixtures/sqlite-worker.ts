import { DurableStore } from '../../src/lib/server/db';

const [action, databasePath] = process.argv.slice(2);
if (!databasePath?.includes('/scratch/tests/')) throw new Error('test scratch database required');
const store = new DurableStore(databasePath);

let result: unknown;
if (action === 'claim') {
	result = store.claimSubmission('multiprocess-key-12345', 'community', 'synthetic-hash');
} else if (action === 'rate') {
	result = store.consumeRateLimit(
		'multiprocess-rate',
		'synthetic-identity',
		3,
		60_000,
		1_800_000_000_000
	);
} else if (action === 'budget') {
	result = { allowed: store.reserveChatUsage('synthetic-day', 100, 3, 300) };
} else if (action === 'complete') {
	store.completeSubmission('multiprocess-key-12345', 'fixture', 'WGN-FX-MULTIPROCESS', null);
	result = store.getSubmission('multiprocess-key-12345');
} else if (action === 'read') {
	result = store.getSubmission('multiprocess-key-12345');
} else {
	result = { initialized: true };
}

console.log(JSON.stringify(result));
store.close();
