import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'node:path';

const scratch = process.env.WGN_TEST_SCRATCH ?? resolve(process.cwd(), '../scratch');
const port = process.env.WGN_TEST_PORT ?? '4176';
const origin = `http://127.0.0.1:${port}`;
const runId = `${Date.now()}-${process.pid}`;
const databasePath = resolve(scratch, `playwright-${runId}.sqlite`);

export default defineConfig({
	testDir: './tests/e2e',
	testIgnore: ['**/production.spec.ts', '**/vercel.spec.ts', '**/r6.spec.ts'],
	fullyParallel: false,
	workers: 1,
	retries: 0,
	reporter: [['list'], ['json', { outputFile: '../scratch/playwright-results.json' }]],
	use: {
		baseURL: origin,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		permissions: ['clipboard-read', 'clipboard-write']
	},
	projects: [
		{
			name: 'desktop-chromium',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } }
		},
		{
			name: 'mobile-chromium',
			use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: true }
		}
	],
	webServer: {
		command: `WGN_ENV=testing WGN_FORMS_MODE=fixture WGN_CHAT_MODE=fixture WGN_ALLOWED_ORIGINS=${origin} WGN_SQLITE_PATH=${JSON.stringify(databasePath)} WGN_RATE_LIMIT_SALT=playwright-${runId} ORIGIN=${origin} HOST=127.0.0.1 PORT=${port} bun run build/index.js`,
		url: `${origin}/healthz`,
		reuseExistingServer: false,
		timeout: 30_000
	}
});
