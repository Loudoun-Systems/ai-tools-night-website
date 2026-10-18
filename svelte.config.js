import bunAdapter from 'svelte-adapter-bun';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const localBun = process.env.WGN_BUILD_TARGET === 'bun';
if (localBun && process.env.VERCEL === '1') {
	throw new Error('The local Bun/SQLite build must not be deployed to Vercel.');
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: localBun ? bunAdapter() : vercelAdapter({ runtime: 'nodejs22.x' }),
		alias: {
			$integrations: localBun
				? './src/lib/server/integrations.local.ts'
				: './src/lib/server/integrations.disabled.ts'
		},
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'img-src': ['self', 'data:'],
				'font-src': ['self'],
				'style-src': ['self', 'unsafe-inline'],
				'script-src': ['self'],
				'connect-src': ['self'],
				'frame-ancestors': ['none'],
				'base-uri': ['self'],
				'form-action': ['self']
			}
		},
		csrf: {
			trustedOrigins: []
		}
	}
};

export default config;
