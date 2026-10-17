export type RuntimeEnvironment = 'testing' | 'staging' | 'production';

export function runtimeEnvironment(): RuntimeEnvironment {
	const fallback = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
	const value = process.env.WGN_ENV ?? fallback;
	return value === 'testing' || value === 'staging' || value === 'production' ? value : fallback;
}

// This release has a QA-only Sheets adapter and benchmark-only chat funding.
// Production must never promote fixtures or reuse those staging approvals.
export function formsMode(): 'fixture' | 'google' | 'disabled' {
	if (runtimeEnvironment() === 'production') return 'disabled';
	const value = process.env.WGN_FORMS_MODE ?? 'fixture';
	return value === 'fixture' || value === 'google' ? value : 'disabled';
}

export function chatMode(): 'fixture' | 'openrouter' | 'disabled' {
	if (runtimeEnvironment() === 'production') return 'disabled';
	const value = process.env.WGN_CHAT_MODE ?? 'fixture';
	return value === 'fixture' || value === 'openrouter' ? value : 'disabled';
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
