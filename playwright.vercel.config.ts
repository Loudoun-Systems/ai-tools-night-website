import { defineConfig } from '@playwright/test';
import { resolve } from 'node:path';
import base from './playwright.config';

const preview = process.env.WGN_VERCEL_TEST_ENV === 'preview';
const port = process.env.WGN_VERCEL_TEST_PORT ?? '4179';
const origin = `http://127.0.0.1:${port}`;
const sha = process.env.WGN_RELEASE_SHA ?? '0'.repeat(40);
const databasePath = resolve(
	process.env.WGN_TEST_SCRATCH ?? '../scratch',
	'vercel-must-not-exist/wgn.sqlite'
);

export default defineConfig({
	...base,
	testIgnore: [],
	testMatch: preview ? '**/vercel.spec.ts' : ['**/production.spec.ts', '**/vercel.spec.ts'],
	reporter: [
		['list'],
		[
			'json',
			{
				outputFile: `../scratch/playwright-vercel-${preview ? 'preview' : 'production'}-results.json`
			}
		]
	],
	use: { ...base.use, baseURL: origin },
	webServer: {
		// Conflicting WGN flags/SHA must lose to Vercel platform identity; no private config supplied.
		command: `VERCEL=1 VERCEL_ENV=${preview ? 'preview' : 'production'} VERCEL_GIT_COMMIT_SHA=${sha} WGN_RELEASE_SHA=${'f'.repeat(40)} NODE_ENV=production WGN_ENV=${preview ? 'production' : 'staging'} WGN_FORMS_MODE=fixture WGN_CHAT_MODE=openrouter WGN_CHAT_ENABLED=true WGN_CHAT_KILL_SWITCH=false WGN_SQLITE_PATH=${JSON.stringify(databasePath)} WGN_QA_BLOCK_OUTBOUND=true PORT=${port} node ops/serve-vercel-output.mjs`,
		url: `${origin}/healthz`,
		reuseExistingServer: false,
		timeout: 30000
	}
});
