import { SESSION_COOKIE, createSessionClient } from '$lib/appwrite/appwrite.js';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';
import { Client, Users } from 'node-appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { PRIVATE_APPWRITE_KEY } from '$env/static/private';

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
	},
	deleteAccount: async ({ locals }) => {
		const client = new Client()
			.setEndpoint(PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
			.setProject(PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
			.setKey(PRIVATE_APPWRITE_KEY); // Your secret API key

		const users = new Users(client);

		let response;

		let serverActionResponse = {};

		try {
			response = await users.delete(locals.user.$id);
			serverActionResponse = {
				status: 200,
				success: true,
				message: 'Account deleted',
				body: response
			};
		} catch (error) {
			console.error(error);
			return {
				status: 500,
				success: false,
				message: 'Error deleting account',
				body: {
					error
				}
			};
		}

		if (serverActionResponse.success) {
			redirect(308, '/');
		}

		return serverActionResponse;
	}
};
