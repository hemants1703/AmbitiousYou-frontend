// src/routes/+page.server.js

import { redirect } from '@sveltejs/kit';

export async function load({ locals }: { locals: App.Locals }) {
	// Access our user from locals.
	if (!locals.user) {
		// If no user is logged in, redirect to the sign up page.
		// redirect(307, '/');
		return;
	}

	// If the user is logged in, redirect to the account page.
	redirect(301, '/dashboard');
}
