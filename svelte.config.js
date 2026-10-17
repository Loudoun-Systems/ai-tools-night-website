import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
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
