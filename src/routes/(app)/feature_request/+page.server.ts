import type { PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';

export const load: PageServerLoad = async ({ locals }) => {
	confirmAuth(locals);
};
