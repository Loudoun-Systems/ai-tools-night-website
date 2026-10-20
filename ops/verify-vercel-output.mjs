import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, realpathSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('.vercel/output');
const config = JSON.parse(readFileSync(join(root, 'config.json'), 'utf8'));
assert.equal(config.version, 3);
const functionsRoot = join(root, 'functions');
const functions = new Set();
function collect(path) {
	for (const name of readdirSync(path)) {
		const entry = join(path, name);
		if (!statSync(entry).isDirectory()) continue;
		if (name.endsWith('.func')) functions.add(realpathSync(entry));
		else collect(entry);
	}
}
collect(functionsRoot);
assert.ok(functions.size > 0, 'No actual Vercel functions were generated');
let checkedFiles = 0;
function inspect(path) {
	for (const name of readdirSync(path)) {
		const entry = join(path, name);
		if (statSync(entry).isDirectory()) inspect(entry);
		else if (/\.(?:[cm]?js|json)$/.test(name)) {
			const source = readFileSync(entry, 'utf8');
			assert.doesNotMatch(
				source,
				/bun:sqlite|class DurableStore|sqliteWaitBuffer|openrouter\.ai|sheets\.googleapis\.com|google-auth-library|\.wgn-data|\.config\/wgn/,
				`Forbidden local/provider dependency: ${entry}`
			);
			checkedFiles++;
		}
	}
}
for (const directory of functions) {
	const metadata = JSON.parse(readFileSync(join(directory, '.vc-config.json'), 'utf8'));
	assert.equal(metadata.runtime, 'nodejs22.x');
	inspect(directory);
}
assert.match(
	readFileSync('.vercelignore', 'utf8'),
	/^\/api\//m,
	'Retired root API must be excluded without excluding src/routes/api'
);
console.log(
	JSON.stringify(
		{
			vercelBuildOutput: 'verified',
			runtime: 'nodejs22.x',
			functions: functions.size,
			checkedFiles,
			localSQLiteAndProviders: 'excluded'
		},
		null,
		2
	)
);
