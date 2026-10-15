import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = ({ locals }) => {
	const releaseSha = /^[0-9a-f]{40}$/.test(env.WGN_RELEASE_SHA ?? '')
		? env.WGN_RELEASE_SHA
		: 'unverified';
	return Response.json(
		{
			status: 'ok',
			service: 'weve-got-now-r5',
			releaseSha,
			requestId: locals.requestId
		},
		{ headers: { 'cache-control': 'no-store' } }
	);
};
