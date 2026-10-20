import type { RuntimeEnvironment } from './config';

export function robotsPolicy(environment: RuntimeEnvironment): string {
	return environment === 'production'
		? 'User-agent: *\nAllow: /\nSitemap: https://wevegotnow.com/sitemap.xml\n'
		: 'User-agent: *\nDisallow: /\n';
}
