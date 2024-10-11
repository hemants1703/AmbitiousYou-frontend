// src/hooks.server.js
import { createSessionClient } from '$lib/appwrite/appwrite';

export async function handle({ event, resolve }) {
	try {
		// Use our helper function to create the Appwrite client.
		const { account } = createSessionClient(event);
		// Store the current logged in user in locals,
		// for easy access in our other routes.
		event.locals.user = await account.get();
	} catch (error) {
		// If the user is not logged in, we will catch the error
		// and continue with the request.
		console.error('Error from Svelte Server-Side Hook', error);
		event.locals.user = null;
	}

	// Continue with the request.
	return resolve(event);
}
