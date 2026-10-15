import type { RequestHandler } from './$types';
import { events, prompts } from '$lib/content';

const paths = [
	'',
	'/events',
	...events.map((event) => `/events/${event.slug}`),
	'/workshops',
	'/prompt-library',
	...prompts.map((prompt) => `/prompt-library/${prompt.slug}`),
	'/careers',
	'/projects',
	'/about',
	'/privacy',
	'/terms',
	'/code-of-conduct'
];

export const GET: RequestHandler = () => {
	const urls = paths
		.map((path) => `<url><loc>https://wevegotnow.com${path || '/'}</loc></url>`)
		.join('');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{
			headers: { 'content-type': 'application/xml; charset=utf-8' }
		}
	);
};
