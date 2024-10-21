import { SESSION_COOKIE, createSessionClient } from '$lib/appwrite/appwrite.js';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';

export const load: PageServerLoad = ({ locals }) => {
	confirmAuth(locals);

	// Pass the stored user local to the page.
	return {
		user: locals.user
	};
};

// Define our log out endpoint/server action.
export const actions: Actions = {
	default: async (event) => {
		// Create the Appwrite client.
		const { account } = createSessionClient(event);

		// Delete the session on Appwrite, and delete the session cookie.
		await account.deleteSession('current');
		event.cookies.delete(SESSION_COOKIE, { path: '/' });

		// Redirect to the sign up page.
		redirect(302, '/signup');
	}
};
