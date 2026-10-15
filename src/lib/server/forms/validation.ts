import type { Locale } from '$lib/types';
import { events, tracks } from '$lib/content';

export const FORM_TYPES = [
	'workshop_interest',
	'event_interest',
	'community',
	'careers_interest',
	'project_submission'
] as const;

export type FormType = (typeof FORM_TYPES)[number];

export type ValidSubmission = {
	formType: FormType;
	locale: Locale;
	name: string;
	email: string;
	contactConsent: true;
	marketingConsent: boolean;
	data: Record<string, string | string[]>;
};

export type ValidationResult =
	{ ok: true; value: ValidSubmission } | { ok: false; errors: Record<string, string> };

const common = new Set([
	'formType',
	'locale',
	'name',
	'email',
	'contactConsent',
	'marketingConsent'
]);

const formFields: Record<FormType, Set<string>> = {
	workshop_interest: new Set(['task', 'aiComfort']),
	event_interest: new Set(['eventId']),
	community: new Set(['role', 'interest']),
	careers_interest: new Set(['tracks', 'workInterest', 'portfolioUrl', 'learning', 'availability']),
	project_submission: new Set([
		'projectName',
		'description',
		'projectUrl',
		'tools',
		'sharingPreference'
	])
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const trackIds = new Set(tracks.map((track) => track.id));
const eventIds = new Set(events.map((event) => event.slug));
const aiComfortValues = new Set(['', 'new', 'some', 'regular']);
const sharingPreferences = new Set(['yes', 'maybe', 'no']);

function stringField(
	value: unknown,
	field: string,
	errors: Record<string, string>,
	minimum: number,
	maximum: number,
	required = true
): string {
	if (typeof value !== 'string') {
		if (required) errors[field] = 'required';
		return '';
	}
	const normalized = value.trim();
	if (required && normalized.length < minimum) errors[field] = 'too_short';
	if (normalized.length > maximum) errors[field] = 'too_long';
	return normalized;
}

function safeUrl(value: unknown, field: string, errors: Record<string, string>): string {
	const normalized = stringField(value, field, errors, 0, 500, false);
	if (!normalized) return '';
	try {
		const parsed = new URL(normalized);
		if (!['https:', 'http:'].includes(parsed.protocol)) errors[field] = 'invalid_url';
	} catch {
		errors[field] = 'invalid_url';
	}
	return normalized;
}

export function validateSubmission(input: unknown): ValidationResult {
	const errors: Record<string, string> = {};
	if (!input || typeof input !== 'object' || Array.isArray(input)) {
		return { ok: false, errors: { body: 'invalid_object' } };
	}
	const record = input as Record<string, unknown>;
	if (typeof record.formType !== 'string' || !FORM_TYPES.includes(record.formType as FormType)) {
		return { ok: false, errors: { formType: 'unsupported' } };
	}
	const formType = record.formType as FormType;
	const allowed = new Set([...common, ...formFields[formType]]);
	for (const key of Object.keys(record)) {
		if (!allowed.has(key)) errors[key] = 'unknown_field';
	}

	const locale = record.locale === 'es' ? 'es' : record.locale === 'en' ? 'en' : null;
	if (!locale) errors.locale = 'unsupported';
	const name = stringField(record.name, 'name', errors, 2, 100);
	const email = stringField(record.email, 'email', errors, 5, 254).toLowerCase();
	if (email && !emailPattern.test(email)) errors.email = 'invalid_email';
	if (record.contactConsent !== true) errors.contactConsent = 'required';
	if (typeof record.marketingConsent !== 'boolean') errors.marketingConsent = 'invalid_boolean';

	const data: Record<string, string | string[]> = {};
	if (formType === 'workshop_interest') {
		data.task = stringField(record.task, 'task', errors, 0, 1000, false);
		data.aiComfort = stringField(record.aiComfort, 'aiComfort', errors, 0, 80, false);
		if (!aiComfortValues.has(data.aiComfort)) errors.aiComfort = 'invalid_selection';
	}
	if (formType === 'event_interest') {
		data.eventId = stringField(record.eventId, 'eventId', errors, 2, 120);
		if (data.eventId && !eventIds.has(data.eventId)) errors.eventId = 'invalid_selection';
	}
	if (formType === 'community') {
		data.role = stringField(record.role, 'role', errors, 0, 120, false);
		data.interest = stringField(record.interest, 'interest', errors, 2, 1000);
	}
	if (formType === 'careers_interest') {
		if (
			!Array.isArray(record.tracks) ||
			record.tracks.length < 1 ||
			record.tracks.length > 5 ||
			!record.tracks.every((entry) => typeof entry === 'string' && trackIds.has(entry)) ||
			new Set(record.tracks).size !== record.tracks.length
		) {
			errors.tracks = 'invalid_selection';
		} else {
			data.tracks = [...new Set(record.tracks as string[])];
		}
		data.workInterest = stringField(record.workInterest, 'workInterest', errors, 2, 1000);
		data.portfolioUrl = safeUrl(record.portfolioUrl, 'portfolioUrl', errors);
		data.learning = stringField(record.learning, 'learning', errors, 0, 1000, false);
		data.availability = stringField(record.availability, 'availability', errors, 0, 200, false);
	}
	if (formType === 'project_submission') {
		data.projectName = stringField(record.projectName, 'projectName', errors, 2, 120);
		data.description = stringField(record.description, 'description', errors, 20, 2000);
		data.projectUrl = safeUrl(record.projectUrl, 'projectUrl', errors);
		data.tools = stringField(record.tools, 'tools', errors, 0, 500, false);
		data.sharingPreference = stringField(
			record.sharingPreference,
			'sharingPreference',
			errors,
			2,
			80
		);
		if (data.sharingPreference && !sharingPreferences.has(data.sharingPreference)) {
			errors.sharingPreference = 'invalid_selection';
		}
	}

	if (Object.keys(errors).length > 0 || !locale) return { ok: false, errors };
	return {
		ok: true,
		value: {
			formType,
			locale,
			name,
			email,
			contactConsent: true,
			marketingConsent: record.marketingConsent as boolean,
			data
		}
	};
}
