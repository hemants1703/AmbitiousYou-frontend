// src/routes/+page.server.js

import { redirect } from '@sveltejs/kit';

export async function load({ locals }: { locals: App.Locals }) {
	console.log('landing page locals', locals);

	// Access our user from locals.
	if (!locals.user) {
		// If no user is logged in, redirect to the sign up page.
		redirect(307, '/');
	}

	// If the user is logged in, redirect to the account page.
	redirect(301, '/dashboard');
}
