import type { RequestEvent } from '@sveltejs/kit';
import { allowedOrigins } from './config';
import { digest } from './db';

export const MAX_BODY_BYTES = 20_000;

export function validateJsonRequest(event: RequestEvent): Response | null {
	const contentType = event.request.headers.get('content-type')?.split(';')[0].trim();
	if (contentType !== 'application/json') {
		return Response.json({ error: 'unsupported_media_type' }, { status: 415 });
	}
	const contentLength = Number(event.request.headers.get('content-length') ?? 0);
	if (contentLength > MAX_BODY_BYTES) {
		return Response.json({ error: 'payload_too_large' }, { status: 413 });
	}
	const origin = event.request.headers.get('origin');
	if (!origin || !allowedOrigins(event.url.origin).has(origin)) {
		return Response.json({ error: 'origin_not_allowed' }, { status: 403 });
	}
	return null;
}

export function requestIdentity(event: RequestEvent): string {
	const address = event.getClientAddress();
	const salt = process.env.WGN_RATE_LIMIT_SALT ?? 'fixture-local-only';
	return digest(`${salt}:${address}`);
}
