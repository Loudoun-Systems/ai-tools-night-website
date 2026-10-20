import type { RequestHandler } from './$types';
import { runtimeEnvironment } from '$lib/server/config';
import { robotsPolicy } from '$lib/server/robots';

export const GET: RequestHandler = () =>
	new Response(robotsPolicy(runtimeEnvironment()), {
		headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' }
	});
