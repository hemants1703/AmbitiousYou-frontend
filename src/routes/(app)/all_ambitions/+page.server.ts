import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/mock', {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});
	const data = await response.json();
	return data;
};
