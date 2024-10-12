import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	if (!locals.user) {
		redirect(307, '/');
	}
	const response = await fetch('/api/mock', {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});
	const data = await response.json();
	return data;
};
