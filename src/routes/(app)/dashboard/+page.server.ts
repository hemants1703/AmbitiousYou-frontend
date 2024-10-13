import type { PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';

export const load: PageServerLoad = async ({ locals }: { locals: App.Locals }) => {
	confirmAuth(locals);

	return {
		userData: locals.user
	};
};
