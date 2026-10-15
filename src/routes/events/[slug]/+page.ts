import { error } from '@sveltejs/kit';
import { events } from '$lib/content';

export const load = ({ params }) => {
	const event = events.find((record) => record.slug === params.slug);
	if (!event) error(404, 'Event not found');
	return { event };
};
