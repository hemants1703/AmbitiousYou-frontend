import type { PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	confirmAuth(locals);

	const response = await fetch('/api/mock', {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});
	const data = await response.json();
	return { data, userData: locals.user };
};
