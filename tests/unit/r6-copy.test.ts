import { test, expect } from 'bun:test';
import copy from '../../src/lib/r6-copy.json';
import { events, prompts, tracks } from '../../src/lib/content';
function localized(value: unknown, at = 'copy'): string[] {
	if (Array.isArray(value))
		return value.flatMap((item, index) => localized(item, `${at}[${index}]`));
	if (value && typeof value === 'object') {
		const object = value as Record<string, unknown>;
		if ('en' in object || 'es' in object) {
			expect(typeof object.en, at).toBe('string');
			expect(typeof object.es, at).toBe('string');
			expect((object.en as string).trim().length, at).toBeGreaterThan(0);
			expect((object.es as string).trim().length, at).toBeGreaterThan(0);
			return [at];
		}
		return Object.entries(object).flatMap(([key, value]) => localized(value, `${at}.${key}`));
	}
	return [];
}
test('R6 editorial copy supplies nonempty EN/ES for every localized record', () => {
	expect(localized(copy).length).toBeGreaterThan(0);
});
test('R6 workshop copy remains planned and never opens payment or reservations', () => {
	expect(copy.workshops.status.en).toContain('Registration is not open');
	expect(copy.workshops.status.es).toContain('aún no están abiertas');
	expect(copy.workshops.flowNote.en).toContain('not a finalized agenda');
	expect(events.filter((e) => e.status === 'upcoming')).toHaveLength(0);
});
test('preserved factual resource records support all nineteen public routes', () => {
	expect(prompts).toHaveLength(5);
	expect(tracks).toHaveLength(5);
	expect(events).toHaveLength(3);
	expect(events.filter((e) => e.status === 'past')).toHaveLength(2);
});

test('R6 hero image error handling is CSP safe and handles cached image failures', async () => {
	const source = await Bun.file('src/lib/components/HeroArt.svelte').text();
	expect(source).not.toMatch(/\son(?:error|load)\s*=/);
	expect(source).toContain("addEventListener('error', fail)");
	expect(source).toContain('node.complete && node.naturalWidth === 0');
});
