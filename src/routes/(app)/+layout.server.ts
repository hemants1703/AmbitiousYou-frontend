import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	return {
		userData: locals.user,
		url: url.pathname
	};
};
