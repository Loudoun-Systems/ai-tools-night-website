// Loopback-only QA shim for the actual generated Vercel Fetch handler.
// This is not a production server or a substitute for Vercel preview verification.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getRequest, setResponse } from '@sveltejs/kit/node';

assert.equal(process.versions.node.split('.')[0], '22', 'Run the Vercel QA handler with Node 22');
const output = resolve('.vercel/output');
const directory = resolve(output, 'functions/![-]/catchall.func');
const metadata = JSON.parse(readFileSync(resolve(directory, '.vc-config.json'), 'utf8'));
assert.equal(metadata.runtime, 'nodejs22.x');
if (process.env.WGN_QA_BLOCK_OUTBOUND === 'true') {
	globalThis.fetch = async () => {
		throw new Error('Outbound requests forbidden in Vercel compatibility QA');
	};
}
const handler = (await import(pathToFileURL(resolve(directory, metadata.handler)).href)).default;
assert.equal(typeof handler.fetch, 'function');
const staticRoot = resolve(output, 'static');
const port = Number(process.env.PORT ?? '4179');
const mime = {
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.ico': 'image/x-icon',
	'.txt': 'text/plain',
	'.woff2': 'font/woff2'
};
const server = createServer(async (req, res) => {
	try {
		const path = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
		const file = resolve(staticRoot, `.${path}`);
		if (file.startsWith(`${staticRoot}${sep}`) && existsSync(file) && statSync(file).isFile()) {
			res.writeHead(200, { 'content-type': mime[extname(file)] ?? 'application/octet-stream' });
			if (req.method === 'HEAD') res.end();
			else createReadStream(file).pipe(res);
			return;
		}
		req.headers['x-forwarded-for'] = 'loopback-qa';
		const request = await getRequest({
			request: req,
			base: `http://127.0.0.1:${port}`,
			bodySizeLimit: 25000
		});
		await setResponse(res, await handler.fetch(request));
	} catch (error) {
		console.error(error);
		res.writeHead(500).end('Vercel output QA handler failure');
	}
});
server.listen(port, '127.0.0.1', () =>
	console.log(
		JSON.stringify({
			qa: 'actual-vercel-fetch-handler',
			node: process.version,
			port,
			environment: process.env.VERCEL_ENV
		})
	)
);
for (const signal of ['SIGINT', 'SIGTERM'])
	process.on(signal, () => server.close(() => process.exit(0)));
