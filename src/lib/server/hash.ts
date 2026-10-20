import { createHash } from 'node:crypto';

// Pure Node helpers must not pull Bun/SQLite into public HTTP handlers.
export function digest(value: string): string {
	return createHash('sha256').update(value).digest('hex');
}

export function stableJson(value: unknown): string {
	if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
	if (value && typeof value === 'object') {
		return `{${Object.entries(value as Record<string, unknown>)
			.sort(([left], [right]) => left.localeCompare(right))
			.map(([key, entry]) => `${JSON.stringify(key)}:${stableJson(entry)}`)
			.join(',')}}`;
	}
	return JSON.stringify(value);
}
