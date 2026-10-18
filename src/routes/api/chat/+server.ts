import { processChat } from '$integrations';
import { MAX_BODY_BYTES, requestIdentity, validateJsonRequest } from '$lib/server/http';
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
	const result = await processChat(input, requestIdentity(event));
	return Response.json(result.body, { status: result.status, headers: { 'cache-control': 'no-store' } });
};
