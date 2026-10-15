import { env } from '$env/dynamic/private';

export const load = () => ({
	environment: env.WGN_ENV ?? 'staging',
	formsMode: env.WGN_FORMS_MODE ?? 'fixture',
	chatMode: env.WGN_CHAT_MODE ?? 'fixture'
});
