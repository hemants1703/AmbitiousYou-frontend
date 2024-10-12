// src/routes/+page.server.js
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }: { locals: App.Locals }) => {
	if (!locals.user) {
		redirect(307, '/');
	}

	return {
		userData: locals.user
	};
};
