import { JWT } from 'google-auth-library';
import type { ValidSubmission, FormType } from './validation';

export type ProviderSubmission = ValidSubmission & {
	submissionId: string;
	submittedAt: string;
	environment: string;
	consentVersion: string;
};

export type ProviderResult = {
	mode: 'fixture' | 'google';
	providerReference: string | null;
};

export interface FormProvider {
	submit(submission: ProviderSubmission): Promise<ProviderResult>;
}

export class FixtureFormProvider implements FormProvider {
	async submit(): Promise<ProviderResult> {
		return { mode: 'fixture', providerReference: null };
	}
}

export const QA_TAB_ALLOWLIST: Record<FormType, string> = {
	workshop_interest: 'Website QA — Workshop Interest',
	event_interest: 'Website QA — Event Registrations',
	community: 'Website QA — Community',
	careers_interest: 'Website QA — Careers',
	project_submission: 'Website QA — Projects'
};

type GoogleAdapterOptions = {
	sheetId?: string;
	serviceAccountEmail?: string;
	privateKey?: string;
	automationExclusionVerified?: boolean;
	testDataOnly?: boolean;
	getAccessToken?: () => Promise<string>;
	fetchImplementation?: typeof fetch;
};

export class GoogleSheetsProvider implements FormProvider {
	private readonly options: Required<Omit<GoogleAdapterOptions, 'getAccessToken'>> & {
		getAccessToken?: () => Promise<string>;
	};

	constructor(options: GoogleAdapterOptions = {}) {
		this.options = {
			sheetId: options.sheetId ?? process.env.WGN_SHEET_ID ?? process.env.GOOGLE_SHEET_ID ?? '',
			serviceAccountEmail:
				options.serviceAccountEmail ?? process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '',
			privateKey: (options.privateKey ?? process.env.GOOGLE_PRIVATE_KEY ?? '').replace(
				/\\n/g,
				'\n'
			),
			automationExclusionVerified:
				options.automationExclusionVerified ??
				process.env.WGN_AUTOMATION_EXCLUSION_VERIFIED === 'true',
			testDataOnly: options.testDataOnly ?? process.env.WGN_TEST_DATA_ONLY === 'true',
			fetchImplementation: options.fetchImplementation ?? fetch,
			getAccessToken: options.getAccessToken
		};
	}

	private assertSafeConfiguration(): void {
		if (!this.options.sheetId || !this.options.serviceAccountEmail || !this.options.privateKey) {
			throw new Error('google_provider_not_configured');
		}
		if (!this.options.automationExclusionVerified || !this.options.testDataOnly) {
			throw new Error('google_provider_safety_gate_closed');
		}
	}

	private assertSyntheticSubmission(submission: ProviderSubmission): void {
		const emailDomain = submission.email.split('@')[1]?.toLowerCase();
		if (
			submission.environment !== 'staging' ||
			!submission.name.startsWith('SYSTEM TEST') ||
			!['example.com', 'example.net', 'example.org'].includes(emailDomain ?? '')
		) {
			throw new Error('google_provider_requires_synthetic_staging_record');
		}
	}

	private async accessToken(): Promise<string> {
		if (this.options.getAccessToken) return this.options.getAccessToken();
		const client = new JWT({
			email: this.options.serviceAccountEmail,
			key: this.options.privateKey,
			scopes: ['https://www.googleapis.com/auth/spreadsheets']
		});
		const credentials = await client.authorize();
		if (!credentials.access_token) throw new Error('google_access_token_missing');
		return credentials.access_token;
	}

	async submit(submission: ProviderSubmission): Promise<ProviderResult> {
		this.assertSafeConfiguration();
		this.assertSyntheticSubmission(submission);
		const tab = QA_TAB_ALLOWLIST[submission.formType];
		const token = await this.accessToken();
		const row = [
			submission.submissionId,
			submission.submittedAt,
			'Website',
			submission.environment,
			true,
			submission.formType,
			'R5-2026-10-14',
			'',
			submission.name,
			submission.email,
			JSON.stringify(submission.data),
			submission.consentVersion,
			submission.submittedAt,
			submission.marketingConsent,
			'',
			'Test-NoFollowUp',
			'',
			''
		];
		const endpoint = new URL(
			`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(this.options.sheetId)}/values/${encodeURIComponent(`${tab}!A:R`)}:append`
		);
		endpoint.searchParams.set('valueInputOption', 'RAW');
		endpoint.searchParams.set('insertDataOption', 'INSERT_ROWS');
		const response = await this.options.fetchImplementation(endpoint, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({ majorDimension: 'ROWS', values: [row] }),
			signal: AbortSignal.timeout(8000)
		});
		if (!response.ok) throw new Error('google_append_outcome_uncertain');
		const body = (await response.json()) as {
			spreadsheetId?: string;
			updates?: {
				spreadsheetId?: string;
				updatedRange?: string;
				updatedRows?: number;
				updatedColumns?: number;
				updatedCells?: number;
			};
		};
		const expectedRange = new RegExp(
			`^'?${tab.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'?!A\\d+:R\\d+$`
		);
		const acknowledgedSheet = body.spreadsheetId ?? body.updates?.spreadsheetId;
		if (
			acknowledgedSheet !== this.options.sheetId ||
			!body.updates?.updatedRange ||
			!expectedRange.test(body.updates.updatedRange) ||
			body.updates.updatedRows !== 1 ||
			body.updates.updatedColumns !== 18 ||
			body.updates.updatedCells !== 18
		) {
			throw new Error('google_append_acknowledgement_uncertain');
		}
		return { mode: 'google', providerReference: body.updates.updatedRange };
	}
}
