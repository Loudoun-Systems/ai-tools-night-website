import { error } from '@sveltejs/kit';
import { prompts } from '$lib/content';

export const load = ({ params }) => {
	const prompt = prompts.find((record) => record.slug === params.slug);
	if (!prompt) error(404, 'Prompt not found');
	return { prompt };
};
