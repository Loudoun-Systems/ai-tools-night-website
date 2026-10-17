import { processSubmission } from '$lib/server/forms/service';
import { requestIdentity, validateJsonRequest, MAX_BODY_BYTES } from '$lib/server/http';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const invalid = validateJsonRequest(event);
	if (invalid) return invalid;
	const raw = await event.request.text();
	if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
		return Response.json({ error: 'payload_too_large' }, { status: 413 });
	}
	let input: unknown;
	try {
		input = JSON.parse(raw);
	} catch {
		return Response.json({ error: 'malformed_json' }, { status: 400 });
	}
	const result = await processSubmission(
		input,
		event.request.headers.get('idempotency-key') ?? '',
		requestIdentity(event)
	);
	return Response.json(result.body, {
		status: result.status,
		headers: { 'cache-control': 'no-store' }
	});
};
