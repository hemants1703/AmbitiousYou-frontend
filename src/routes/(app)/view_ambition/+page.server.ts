import confirmAuth from '$lib/utils/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	confirmAuth(locals);
};
