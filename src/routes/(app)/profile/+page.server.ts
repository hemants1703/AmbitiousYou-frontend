import { SESSION_COOKIE, createSessionClient } from '$lib/appwrite/appwrite.js';
import { redirect, type Actions } from '@sveltejs/kit';
import type { ActionData, PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';
import { Account, Client, Databases, Query, Users } from 'node-appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import {
	PRIVATE_APPWRITE_COLLECTION_ID,
	PRIVATE_APPWRITE_DATABASE_ID,
	PRIVATE_APPWRITE_KEY
} from '$env/static/private';

export const load: PageServerLoad = ({ locals }) => {
	confirmAuth(locals);

	// Pass the stored user local to the page.
	return {
		user: locals.user
	};
};

// Define our log out endpoint/server action.
export const actions: Actions = {
	// default: async (event) => {
	// 	// Create the Appwrite client.
	// 	const { account } = createSessionClient(event);

	// 	// Delete the session on Appwrite, and delete the session cookie.
	// 	await account.deleteSession('current');
	// 	event.cookies.delete(SESSION_COOKIE, { path: '/' });

	// 	// Redirect to the sign up page.
	// 	redirect(302, '/signup');
	// },
	deleteAccount: async ({ locals }) => {
		const client = new Client()
			.setEndpoint(PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
			.setProject(PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
			.setKey(PRIVATE_APPWRITE_KEY); // Your secret API key

		const account = new Account(client);

		let serverActionResponse: ActionData = {};

		//	Before Deleting Account, we need to delete all the ambitions
		const databases = new Databases(client);
		let documentIds: string[] = [];

		// Getting all the Ambitions of the user and storing their IDs in an array to delete them
		try {
			const response = await databases.listDocuments(
				PRIVATE_APPWRITE_DATABASE_ID,
				PRIVATE_APPWRITE_COLLECTION_ID,
				[Query.equal('userEmail', [locals.user.email])]
			);

			console.log('Ambitions List: ', response);

			response.documents.forEach((document) => {
				documentIds = [...documentIds, document.$id];
			});

			console.log('Document IDs: ', documentIds);

			serverActionResponse = {
				status: 200,
				success: true,
				message: 'Received All Data',
				body: response
			};
		} catch {
			console.error('Error getting ambitions');
			return {
				status: 500,
				success: false,
				message: 'Error getting ambitions',
				body: {
					error
				}
			};
		}

		// Deleting All the Ambitions one by one
		if (documentIds.length > 0) {
			documentIds.forEach(async (documentId) => {
				try {
					const response = await databases.deleteDocument(
						PRIVATE_APPWRITE_DATABASE_ID,
						PRIVATE_APPWRITE_COLLECTION_ID,
						documentId
					);

					if (response.code === 204) {
						serverActionResponse = {
							status: 200,
							success: true,
							message: 'Ambitions Deleted',
							body: response
						};
					}
				} catch (error) {
					console.error('Error deleting ambitions');
					return {
						status: 500,
						success: false,
						message: 'Error deleting ambitions',
						body: {
							error
						}
					};
				}
			});
		}

		// Deleting Account
		const users = new Users(client);
		try {
			const response = await users.delete(locals.user.$id);

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

		// if (serverActionResponse.success) {
		redirect(308, '/');
		// }

		return serverActionResponse;
	}
};
