import { digest, getStore, stableJson, type DurableStore } from '../db';
import { formsMode, positiveInteger, runtimeEnvironment } from '../config';
import {
	FixtureFormProvider,
	GoogleSheetsProvider,
	type FormProvider,
	type ProviderSubmission
} from './providers';
import { validateSubmission } from './validation';

export type SubmissionResponse = {
	status: number;
	body: Record<string, unknown>;
};

type ServiceOptions = {
	store?: DurableStore;
	provider?: FormProvider;
	now?: () => Date;
};

function defaultProvider(): FormProvider {
	return process.env.WGN_FORMS_MODE === 'google'
		? new GoogleSheetsProvider()
		: new FixtureFormProvider();
}

export async function processSubmission(
	input: unknown,
	idempotencyKey: string,
	identityHash: string,
	options: ServiceOptions = {}
): Promise<SubmissionResponse> {
	if (formsMode() === 'disabled') {
		return {
			status: 503,
			body: {
				error: 'forms_unavailable',
				message: 'Online submissions are temporarily unavailable. Nothing was submitted.'
			}
		};
	}
	const validation = validateSubmission(input);
	if (!validation.ok)
		return { status: 400, body: { error: 'invalid_submission', fields: validation.errors } };
	if (!/^[a-zA-Z0-9_-]{16,80}$/.test(idempotencyKey)) {
		return { status: 400, body: { error: 'invalid_idempotency_key' } };
	}
	const store = options.store ?? getStore();
	const limit = store.consumeRateLimit(
		`forms:${validation.value.formType}`,
		identityHash,
		positiveInteger('WGN_FORM_REQUEST_LIMIT', 8, 50),
		60 * 60 * 1000
	);
	if (!limit.allowed) {
		return {
			status: 429,
			body: { error: 'rate_limited', retryAfter: limit.retryAfterSeconds }
		};
	}

	const requestHash = digest(stableJson(validation.value));
	const claim = store.claimSubmission(idempotencyKey, validation.value.formType, requestHash);
	if (claim.conflict) return { status: 409, body: { error: 'idempotency_conflict' } };
	if (!claim.claimed) {
		if (claim.row.state === 'fixture' || claim.row.state === 'delivered') {
			return {
				status: 200,
				body: {
					accepted: true,
					duplicate: true,
					mode: claim.row.state === 'fixture' ? 'fixture' : 'google',
					receiptId: claim.row.receipt_id
				}
			};
		}
		if (claim.row.state === 'uncertain') {
			return {
				status: 503,
				body: {
					error: 'provider_outcome_uncertain',
					message:
						'The upstream outcome is uncertain. This submission was not automatically sent again.'
				}
			};
		}
		return { status: 409, body: { error: 'submission_in_progress' } };
	}

	const now = (options.now ?? (() => new Date()))();
	const submissionId = `wgn_${crypto.randomUUID()}`;
	const providerSubmission: ProviderSubmission = {
		...validation.value,
		submissionId,
		submittedAt: now.toISOString(),
		environment: runtimeEnvironment(),
		consentVersion: 'WGN-R5-2026-10-14'
	};
	try {
		const result = await (options.provider ?? defaultProvider()).submit(providerSubmission);
		const receiptId = `${result.mode === 'fixture' ? 'WGN-FX' : 'WGN-QA'}-${submissionId.slice(-12)}`;
		store.completeSubmission(
			idempotencyKey,
			result.mode === 'fixture' ? 'fixture' : 'delivered',
			receiptId,
			result.providerReference
		);
		return {
			status: 201,
			body: {
				accepted: true,
				duplicate: false,
				mode: result.mode,
				receiptId,
				storedExternally: result.mode === 'google',
				message:
					result.mode === 'fixture'
						? 'Fixture receipt only. No external system was contacted.'
						: 'Labelled QA record acknowledged by the configured provider.'
			}
		};
	} catch {
		store.markUncertain(idempotencyKey);
		return {
			status: 503,
			body: {
				error: 'provider_unavailable',
				message: 'Your information was not confirmed. It was not automatically sent again.'
			}
		};
	}
}
