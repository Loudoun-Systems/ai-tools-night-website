import { describe, expect, test } from 'bun:test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	events,
	eventStatusLabels,
	nextConfirmedEvent,
	prompts,
	publicSiteKnowledge,
	tracks
} from '../../src/lib/content';

type AssetManifest = {
	originals_preserved: boolean;
	classification: string;
	assets: Array<{
		id: string;
		source: string;
		source_sha256: string;
		derivatives: Array<{ file: string; sha256: string; dimensions: [number, number] }>;
	}>;
};

const assetRoot = resolve(import.meta.dir, '../../static/assets');
const manifest = JSON.parse(
	readFileSync(resolve(assetRoot, 'manifest.json'), 'utf8')
) as AssetManifest;
const hash = (path: string) =>
	createHash('sha256')
		.update(readFileSync(resolve(assetRoot, path)))
		.digest('hex');

describe('content truth and shared records', () => {
	test('keeps all five bilingual prompt templates complete', () => {
		expect(prompts).toHaveLength(5);
		for (const prompt of prompts) {
			expect(prompt.usefulFor.en.length).toBeGreaterThanOrEqual(40);
			expect(prompt.usefulFor.es.length).toBeGreaterThanOrEqual(40);
			expect(prompt.prompt.en.length).toBeGreaterThan(300);
			expect(prompt.prompt.es.length).toBeGreaterThan(300);
			expect(prompt.example.en).toContain('Output shape');
			expect(prompt.example.es).toContain('Forma de salida');
		}
	});

	test('derives next confirmed status without turning TBD or cancelled into upcoming', () => {
		const synthetic = events[0];
		const records = [
			{ ...synthetic, slug: 'tbd', status: 'tbd' as const, dateStart: null },
			{
				...synthetic,
				slug: 'cancelled',
				status: 'cancelled' as const,
				dateStart: '2027-02-01T18:00:00-05:00'
			},
			{
				...synthetic,
				slug: 'later',
				status: 'upcoming' as const,
				dateStart: '2027-03-01T18:00:00-05:00'
			},
			{
				...synthetic,
				slug: 'next',
				status: 'upcoming' as const,
				dateStart: '2027-01-01T18:00:00-05:00'
			}
		];
		expect(nextConfirmedEvent(records, new Date('2026-10-14T00:00:00Z'))?.slug).toBe('next');
		expect(eventStatusLabels.cancelled.es).toBe('Cancelado');
	});

	test('generates public chat knowledge from shared events, tracks and prompts', () => {
		const english = publicSiteKnowledge('en');
		const spanish = publicSiteKnowledge('es');
		expect(english).toContain(events[0].title.en);
		expect(english).toContain(tracks[0].title.en);
		expect(spanish).toContain(prompts[0].title.es);
		expect(english).not.toContain('source');
	});
});

describe('asset lineage', () => {
	test('keeps the concept-art fallback CSP-safe and catches cached image failures', () => {
		const source = readFileSync(
			resolve(import.meta.dir, '../../src/lib/components/ConceptArt.svelte'),
			'utf8'
		);
		expect(source).not.toMatch(/\bonerror\s*=/i);
		expect(source).toContain('onMount(() =>');
		expect(source).toContain("addEventListener('error'");
		expect(source).toContain('node.complete && node.naturalWidth === 0');
		expect(source).toContain("removeEventListener('error'");
	});

	test('preserves exact source files and verifies every derivative hash', () => {
		expect(manifest.originals_preserved).toBe(true);
		expect(manifest.classification).toContain('AI-generated concept artwork');
		expect(manifest.assets).toHaveLength(8);
		expect(manifest.assets.filter((asset) => asset.id.startsWith('WGN-SUPPORT-'))).toHaveLength(6);
		for (const asset of manifest.assets) {
			expect(hash(asset.source)).toBe(asset.source_sha256);
			for (const derivative of asset.derivatives) {
				expect(hash(derivative.file)).toBe(derivative.sha256);
				expect(derivative.dimensions[0]).toBeGreaterThan(0);
				expect(derivative.dimensions[1]).toBeGreaterThan(0);
			}
		}
	});
});
