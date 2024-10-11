import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
// import { API_URL } from '$env/static/private';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();

		const email: FormDataEntryValue = data.get('email') as string;
		const password: FormDataEntryValue = data.get('password') as string;

		const formData = new FormData();

		formData.append('email', email);
		formData.append('password', password);

		console.log('formData', formData);
	}
} satisfies Actions;
