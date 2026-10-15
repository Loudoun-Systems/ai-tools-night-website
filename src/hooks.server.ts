import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

const aliases: Record<string, string> = {
	'/index.html': '/',
	'/events.html': '/events',
	'/about.html': '/about',
	'/careers.html': '/careers',
	'/prompt-library.html': '/prompt-library',
	'/hackathon.html': '/projects',
	'/hackathon': '/projects',
	'/success.html': '/legacy-receipt',
	'/success': '/legacy-receipt'
};

function applyCommonHeaders(response: Response): Response {
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	if ((env.WGN_ENV ?? 'staging') !== 'production') {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
	}
	return response;
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.requestId = crypto.randomUUID();
	const alias = aliases[event.url.pathname];
	if (alias) {
		return applyCommonHeaders(
			new Response(null, {
				status: 308,
				headers: { location: `${alias}${event.url.search}` }
			})
		);
	}

	const response = await resolve(event);
	return applyCommonHeaders(response);
};
