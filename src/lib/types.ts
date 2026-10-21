export type Locale = 'en' | 'es';

export type Localized = {
	en: string;
	es: string;
};

export type EventRecord = {
	slug: string;
	type: 'meetup' | 'workshop';
	status: 'upcoming' | 'past' | 'cancelled' | 'tbd';
	title: Localized;
	summary: Localized;
	dateStart: string | null;
	dateEnd: string | null;
	timezone: 'America/New_York';
	venue: Localized;
	address: string | null;
	rsvpUrl: string | null;
	source: string;
	reviewedAt: string;
};

export type PromptRecord = {
	slug: string;
	title: Localized;
	category: Localized;
	usefulFor: Localized;
	prompt: Localized;
	example: Localized;
	source: string;
	reviewStatus: Localized;
	reviewedAt: string;
	categoryKey?: string;
	difficulty?: 'intermediate' | 'advanced';
	tags?: string[];
	outcome?: Localized;
	inputs?: Localized[];
};

export type TrackRecord = {
	id: string;
	title: Localized;
	build: Localized;
	share: Localized;
};
