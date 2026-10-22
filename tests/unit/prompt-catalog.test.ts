import { describe, expect, test } from 'bun:test';
import { prompts, publicSiteKnowledge } from '../../src/lib/content';
import { extendedPrompts } from '../../src/lib/prompt-catalog';

describe('expanded editorial prompt library', () => {
	test('preserves legacy detail links and supplies unique workflow slugs', () => {
		for (const slug of [
			'notes-to-next-steps',
			'clear-email',
			'repetitive-workflow',
			'compare-with-evidence',
			'learn-by-doing'
		]) {
			expect(prompts.some((prompt) => prompt.slug === slug)).toBe(true);
		}
		expect(new Set(prompts.map((prompt) => prompt.slug)).size).toBe(prompts.length);
	});

	test('adds distinct, complete bilingual workflows across eight practical areas', () => {
		expect(extendedPrompts).toHaveLength(32);
		const categories = new Set(extendedPrompts.map((prompt) => prompt.categoryKey));
		expect(categories.size).toBe(8);
		for (const category of categories) {
			expect(extendedPrompts.filter((prompt) => prompt.categoryKey === category)).toHaveLength(4);
		}
		for (const prompt of extendedPrompts) {
			expect(prompt.inputs).toHaveLength(3);
			expect(prompt.tags?.length).toBeGreaterThanOrEqual(3);
			expect(['intermediate', 'advanced']).toContain(prompt.difficulty ?? '');
			for (const locale of ['en', 'es'] as const) {
				expect(prompt.prompt[locale].split(/\s+/).length).toBeGreaterThanOrEqual(100);
				expect(prompt.outcome?.[locale].length).toBeGreaterThan(30);
				expect(prompt.inputs?.every((input) => input[locale].trim().length > 0)).toBe(true);
			}
			expect(prompt.prompt.en).toContain('WORKFLOW');
			expect(prompt.prompt.en).toContain('DELIVERABLE');
			expect(prompt.prompt.es).toContain('MÉTODO');
			expect(prompt.prompt.es).toContain('ENTREGABLE');
			expect(prompt.reviewStatus.en).toContain('not benchmarked');
		}
		expect(new Set(extendedPrompts.map((prompt) => prompt.prompt.en)).size).toBe(32);
		expect(new Set(extendedPrompts.map((prompt) => prompt.prompt.es)).size).toBe(32);
	});

	test('derives public catalog counts from the records', () => {
		expect(publicSiteKnowledge('en')).toContain(`The ${prompts.length} editable prompt templates`);
		expect(publicSiteKnowledge('es')).toContain(`Las ${prompts.length} plantillas editables`);
		expect(publicSiteKnowledge('en')).toContain(extendedPrompts[0].title.en);
	});
});
