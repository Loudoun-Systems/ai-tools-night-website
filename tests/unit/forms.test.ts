import { describe, expect, test } from 'bun:test';
import { DurableStore } from '../../src/lib/server/db';
import { processSubmission } from '../../src/lib/server/forms/service';
import {
	FixtureFormProvider,
	GoogleSheetsProvider,
	type FormProvider,
	type ProviderSubmission
} from '../../src/lib/server/forms/providers';
import { validateSubmission } from '../../src/lib/server/forms/validation';

const validCommunity = {
	formType: 'community',
	locale: 'en',
	name: 'SYSTEM TEST Visitor',
	email: 'visitor@example.com',
	role: 'Builder',
	interest: 'Learn how to use practical AI tools.',
	contactConsent: true,
	marketingConsent: false
};

describe('strict form validation', () => {
	test('accepts a bounded known schema', () => {
		const result = validateSubmission(validCommunity);
		expect(result.ok).toBe(true);
	});

	test('rejects unknown fields and malformed email', () => {
		const result = validateSubmission({
			...validCommunity,
			email: 'bad',
			destination: 'Arbitrary Tab'
		});
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.errors.email).toBe('invalid_email');
			expect(result.errors.destination).toBe('unknown_field');
		}
	});

	test('rejects non-http project URLs without fetching them', () => {
		const result = validateSubmission({
			formType: 'project_submission',
			locale: 'en',
			name: 'SYSTEM TEST Builder',
			email: 'builder@example.com',
			projectName: 'Example',
			description: 'A safe synthetic project description for validation.',
			projectUrl: 'file:///private/data',
			tools: '',
			sharingPreference: 'maybe',
			contactConsent: true,
			marketingConsent: false
		});
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.errors.projectUrl).toBe('invalid_url');
	});

	test('rejects unknown track, event, comfort and sharing selections', () => {
		const careers = validateSubmission({
			formType: 'careers_interest',
			locale: 'en',
			name: 'Test Person',
			email: 'person@example.com',
			tracks: ['not-a-track'],
			workInterest: 'Build a useful test.',
			portfolioUrl: '',
			learning: '',
			availability: '',
			contactConsent: true,
			marketingConsent: false
		});
		const event = validateSubmission({
			formType: 'event_interest',
			locale: 'en',
			name: 'Test Person',
			email: 'person@example.com',
			eventId: 'invented-event',
			contactConsent: true,
			marketingConsent: false
		});
		const workshop = validateSubmission({
			formType: 'workshop_interest',
			locale: 'en',
			name: 'Test Person',
			email: 'person@example.com',
			task: '',
			aiComfort: 'expert-plus',
			contactConsent: true,
			marketingConsent: false
		});
		const project = validateSubmission({
			formType: 'project_submission',
			locale: 'en',
			name: 'Test Person',
			email: 'person@example.com',
			projectName: 'Example',
			description: 'A sufficiently detailed synthetic project description.',
			projectUrl: '',
			tools: '',
			sharingPreference: 'guaranteed-slot',
			contactConsent: true,
			marketingConsent: false
		});
		for (const result of [careers, event, workshop, project]) expect(result.ok).toBe(false);
	});
});

describe('form idempotency and provider outcomes', () => {
	test('fixture mode acknowledges without any external fetch', async () => {
		const originalFetch = globalThis.fetch;
		let fetchCalls = 0;
		globalThis.fetch = (async () => {
			fetchCalls += 1;
			throw new Error('unexpected external call');
		}) as unknown as typeof fetch;
		try {
			const store = new DurableStore(':memory:');
			const result = await processSubmission(validCommunity, 'fixture-key-123456', 'identity-a', {
				store,
				provider: new FixtureFormProvider()
			});
			expect(result.status).toBe(201);
			expect(result.body.mode).toBe('fixture');
			expect(result.body.storedExternally).toBe(false);
			expect(fetchCalls).toBe(0);
			store.close();
		} finally {
			globalThis.fetch = originalFetch;
		}
	});

	test('returns the same receipt and calls the provider once on retry', async () => {
		let calls = 0;
		const provider: FormProvider = {
			submit: async () => {
				calls += 1;
				return { mode: 'fixture', providerReference: null };
			}
		};
		const store = new DurableStore(':memory:');
		const first = await processSubmission(validCommunity, 'duplicate-key-1234', 'identity-b', {
			store,
			provider
		});
		const second = await processSubmission(validCommunity, 'duplicate-key-1234', 'identity-b', {
			store,
			provider
		});
		expect(first.status).toBe(201);
		expect(second.status).toBe(200);
		expect(second.body.duplicate).toBe(true);
		expect(second.body.receiptId).toBe(first.body.receiptId);
		expect(calls).toBe(1);
		store.close();
	});

	test('allows only one provider call during concurrent duplicates', async () => {
		let release: (() => void) | undefined;
		let entered: (() => void) | undefined;
		const enteredPromise = new Promise<void>((resolve) => (entered = resolve));
		const releasePromise = new Promise<void>((resolve) => (release = resolve));
		let calls = 0;
		const provider: FormProvider = {
			submit: async () => {
				calls += 1;
				entered?.();
				await releasePromise;
				return { mode: 'fixture', providerReference: null };
			}
		};
		const store = new DurableStore(':memory:');
		const firstPromise = processSubmission(validCommunity, 'concurrent-key-12', 'identity-c', {
			store,
			provider
		});
		await enteredPromise;
		const second = await processSubmission(validCommunity, 'concurrent-key-12', 'identity-c', {
			store,
			provider
		});
		expect(second.status).toBe(409);
		expect(second.body.error).toBe('submission_in_progress');
		release?.();
		expect((await firstPromise).status).toBe(201);
		expect(calls).toBe(1);
		store.close();
	});

	test('does not automatically reappend after an uncertain provider failure', async () => {
		let calls = 0;
		const provider: FormProvider = {
			submit: async () => {
				calls += 1;
				throw new Error('transport outcome unknown');
			}
		};
		const store = new DurableStore(':memory:');
		const first = await processSubmission(validCommunity, 'uncertain-key-123', 'identity-d', {
			store,
			provider
		});
		const second = await processSubmission(validCommunity, 'uncertain-key-123', 'identity-d', {
			store,
			provider
		});
		expect(first.status).toBe(503);
		expect(second.body.error).toBe('provider_outcome_uncertain');
		expect(calls).toBe(1);
		store.close();
	});
});

describe('Google Sheets QA adapter', () => {
	test('uses the immutable QA tab, RAW input and literal user strings', async () => {
		let requestedUrl = '';
		let requestBody = '';
		const provider = new GoogleSheetsProvider({
			sheetId: 'sheet-id',
			serviceAccountEmail: 'fixture@example.iam.gserviceaccount.com',
			privateKey: 'fixture-private-key',
			automationExclusionVerified: true,
			testDataOnly: true,
			getAccessToken: async () => 'fixture-token',
			fetchImplementation: (async (input: string | URL | Request, init?: RequestInit) => {
				requestedUrl = input.toString();
				requestBody = String(init?.body);
				return Response.json({
					spreadsheetId: 'sheet-id',
					updates: {
						updatedRange: "'Website QA — Community'!A2:R2",
						updatedRows: 1,
						updatedColumns: 18,
						updatedCells: 18
					}
				});
			}) as unknown as typeof fetch
		});
		const submission: ProviderSubmission = {
			formType: 'community',
			locale: 'en',
			name: 'SYSTEM TEST =IMPORTXML("https://example.com")',
			email: 'system-test@example.com',
			contactConsent: true,
			marketingConsent: false,
			data: { role: 'Builder', interest: '=1+1' },
			submissionId: 'wgn_fixture',
			submittedAt: '2026-10-14T12:00:00.000Z',
			environment: 'staging',
			consentVersion: 'WGN-R5-2026-10-14'
		};
		const result = await provider.submit(submission);
		expect(decodeURIComponent(requestedUrl)).toContain('Website QA — Community!A:R');
		expect(requestedUrl).toContain('valueInputOption=RAW');
		expect(requestedUrl).not.toContain('Arbitrary');
		expect(requestBody).toContain('=IMPORTXML');
		expect(requestBody).toContain('=1+1');
		expect(result.providerReference).toBe("'Website QA — Community'!A2:R2");
	});

	test('rejects nonsynthetic or nonstaging records before token or fetch activity', async () => {
		let tokenCalls = 0;
		let fetchCalls = 0;
		const provider = new GoogleSheetsProvider({
			sheetId: 'sheet-id',
			serviceAccountEmail: 'fixture@example.iam.gserviceaccount.com',
			privateKey: 'fixture-private-key',
			automationExclusionVerified: true,
			testDataOnly: true,
			getAccessToken: async () => {
				tokenCalls += 1;
				return 'fixture-token';
			},
			fetchImplementation: (async () => {
				fetchCalls += 1;
				return Response.json({});
			}) as unknown as typeof fetch
		});
		const base: ProviderSubmission = {
			formType: 'community',
			locale: 'en',
			name: 'Real Visitor',
			email: 'visitor@real-domain.test',
			contactConsent: true,
			marketingConsent: false,
			data: {},
			submissionId: 'wgn_fixture',
			submittedAt: '2026-10-14T12:00:00.000Z',
			environment: 'staging',
			consentVersion: 'WGN-R5-2026-10-14'
		};
		await expect(provider.submit(base)).rejects.toThrow(
			'google_provider_requires_synthetic_staging_record'
		);
		await expect(
			provider.submit({
				...base,
				name: 'SYSTEM TEST Person',
				email: 'person@example.com',
				environment: 'production'
			})
		).rejects.toThrow('google_provider_requires_synthetic_staging_record');
		expect(tokenCalls).toBe(0);
		expect(fetchCalls).toBe(0);
	});

	test('treats empty or mismatched append acknowledgements as uncertain', async () => {
		let responseBody: Record<string, unknown> = {};
		const provider = new GoogleSheetsProvider({
			sheetId: 'sheet-id',
			serviceAccountEmail: 'fixture@example.iam.gserviceaccount.com',
			privateKey: 'fixture-private-key',
			automationExclusionVerified: true,
			testDataOnly: true,
			getAccessToken: async () => 'fixture-token',
			fetchImplementation: (async () => Response.json(responseBody)) as unknown as typeof fetch
		});
		const submission: ProviderSubmission = {
			formType: 'community',
			locale: 'en',
			name: 'SYSTEM TEST Person',
			email: 'person@example.com',
			contactConsent: true,
			marketingConsent: false,
			data: {},
			submissionId: 'wgn_fixture',
			submittedAt: '2026-10-14T12:00:00.000Z',
			environment: 'staging',
			consentVersion: 'WGN-R5-2026-10-14'
		};
		await expect(provider.submit(submission)).rejects.toThrow(
			'google_append_acknowledgement_uncertain'
		);
		responseBody = {
			spreadsheetId: 'other-sheet',
			updates: {
				updatedRange: "'Website QA — Community'!A2:R2",
				updatedRows: 1,
				updatedColumns: 18,
				updatedCells: 18
			}
		};
		await expect(provider.submit(submission)).rejects.toThrow(
			'google_append_acknowledgement_uncertain'
		);
	});

	test('fails closed when automation exclusion is not verified', async () => {
		let calls = 0;
		const provider = new GoogleSheetsProvider({
			sheetId: 'sheet-id',
			serviceAccountEmail: 'fixture@example.iam.gserviceaccount.com',
			privateKey: 'fixture-private-key',
			automationExclusionVerified: false,
			testDataOnly: true,
			getAccessToken: async () => 'fixture-token',
			fetchImplementation: (async () => {
				calls += 1;
				return Response.json({});
			}) as unknown as typeof fetch
		});
		await expect(
			provider.submit({
				formType: 'community',
				locale: 'en',
				name: 'SYSTEM TEST',
				email: 'system-test@example.com',
				contactConsent: true,
				marketingConsent: false,
				data: {},
				submissionId: 'wgn_fixture',
				submittedAt: '2026-10-14T12:00:00.000Z',
				environment: 'staging',
				consentVersion: 'WGN-R5-2026-10-14'
			})
		).rejects.toThrow('google_provider_safety_gate_closed');
		expect(calls).toBe(0);
	});
});
