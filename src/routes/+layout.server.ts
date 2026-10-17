import { chatMode, formsMode, runtimeEnvironment } from '$lib/server/config';

export const load = () => ({
	environment: runtimeEnvironment(),
	formsMode: formsMode(),
	chatMode: chatMode()
});
