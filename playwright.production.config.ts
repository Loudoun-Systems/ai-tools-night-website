import { defineConfig } from '@playwright/test';
import { resolve } from 'node:path';
import base from './playwright.config';

const port = process.env.WGN_PRODUCTION_TEST_PORT ?? '4178';
const origin = `http://127.0.0.1:${port}`;
const runId = `${Date.now()}-${process.pid}`;
const databasePath = resolve(
	process.env.WGN_TEST_SCRATCH ?? '../scratch',
	`production-${runId}.sqlite`
);

export default defineConfig({
	...base,
	testIgnore: [],
	testMatch: '**/production.spec.ts',
	reporter: [['list'], ['json', { outputFile: '../scratch/playwright-production-results.json' }]],
	use: { ...base.use, baseURL: origin },
	webServer: {
		// Deliberately conflicting adapter flags prove production cannot expose fixtures or benchmark chat.
		command: `NODE_ENV=production WGN_ENV=production WGN_FORMS_MODE=fixture WGN_CHAT_MODE=openrouter WGN_CHAT_ENABLED=true WGN_CHAT_BUDGET_APPROVED=true WGN_RELEASE_SHA=${process.env.WGN_RELEASE_SHA ?? '0'.repeat(40)} WGN_SQLITE_PATH=${JSON.stringify(databasePath)} WGN_RATE_LIMIT_SALT=production-browser-test-${runId} ORIGIN=${origin} HOST=127.0.0.1 PORT=${port} bun run build/index.js`,
		url: `${origin}/healthz`,
		reuseExistingServer: false,
		timeout: 30_000
	}
});
