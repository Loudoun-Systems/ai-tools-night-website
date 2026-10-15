export type RuntimeEnvironment = 'testing' | 'staging' | 'production';

export function runtimeEnvironment(): RuntimeEnvironment {
	const value = process.env.WGN_ENV ?? 'staging';
	return value === 'testing' || value === 'production' ? value : 'staging';
}

export function allowedOrigins(requestOrigin: string): Set<string> {
	const configured = (process.env.WGN_ALLOWED_ORIGINS ?? '')
		.split(',')
		.map((value) => value.trim())
		.filter(Boolean);
	return new Set([requestOrigin, ...configured]);
}

export function sqlitePath(): string {
	return process.env.WGN_SQLITE_PATH ?? '.wgn-data/wgn.sqlite';
}

export function positiveInteger(name: string, fallback: number, maximum: number): number {
	const value = Number(process.env[name] ?? fallback);
	if (!Number.isSafeInteger(value) || value < 1) return fallback;
	return Math.min(value, maximum);
}
