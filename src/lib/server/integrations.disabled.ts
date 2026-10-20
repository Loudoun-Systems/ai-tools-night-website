// The default Vercel build resolves $integrations ONLY to this module.
// No runtime or type import from the retained local providers/database is permitted here.
type Result = { status: number; body: Record<string, unknown> };
type FormsHandler = (input: unknown, key: string, identity: string) => Promise<Result>;
type ChatHandler = (input: unknown, identity: string) => Promise<Result>;

export const processSubmission: FormsHandler = async () => ({
	status: 503,
	body: {
		error: 'forms_unavailable',
		message: 'Online submissions are temporarily unavailable. Nothing was submitted.'
	}
});

export const processChat: ChatHandler = async () => ({
	status: 503,
	body: {
		error: 'chat_unavailable',
		message: 'The assistant is temporarily unavailable. Please use the site navigation.'
	}
});
