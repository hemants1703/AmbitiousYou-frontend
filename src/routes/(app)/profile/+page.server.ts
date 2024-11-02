import { SESSION_COOKIE } from '$lib/appwrite/appwrite.js';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';
import { Client, Databases, Query, Users } from 'node-appwrite';
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
	deleteAccount: async ({ locals, cookies }) => {
		const client = new Client()
			.setEndpoint(PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
			.setProject(PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
			.setKey(PRIVATE_APPWRITE_KEY); // Your secret API key

		let serverActionResponse = {
			status: 500,
			success: false,
			message: 'Error deleting account',
			body: {}
		};

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
		} catch (error) {
			console.error('Error getting ambitions', error);
			return {
				status: 500,
				success: false,
				message: 'Error getting ambitions',
				body: { error }
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

					serverActionResponse = {
						status: 200,
						success: true,
						message: 'Ambitions Deleted',
						body: response
					};
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

		cookies.delete(SESSION_COOKIE, { path: '/' });

		if (serverActionResponse.success) {
			redirect(308, '/');
		}

		// return serverActionResponse;
	}
};
