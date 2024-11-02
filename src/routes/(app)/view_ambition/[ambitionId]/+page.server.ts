import confirmAuth from '$lib/utils/auth';
import type { PageServerLoad, Actions } from './$types';
import { SESSION_COOKIE } from '$lib/appwrite/appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { PRIVATE_APPWRITE_DATABASE_ID, PRIVATE_APPWRITE_COLLECTION_ID } from '$env/static/private';
import { Client, Databases } from 'node-appwrite';
import chalk from 'chalk';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params, cookies }) => {
	confirmAuth(locals);

	const { ambitionId } = params;
	let pageServerResponse: {
		status: number;
		success: boolean;
		message: string;
		userData: object;
		body: object;
	} = {
		status: 0,
		success: false,
		message: '',
		userData: {},
		body: {}
	};

	const sessionCookie: string | undefined = cookies.get(SESSION_COOKIE);

	if (!sessionCookie) {
		return {
			status: 401,
			success: false,
			message: 'Unauthorized',
			userData: locals.user,
			body: {
				ambitionId: ambitionId
			}
		};
	}

	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID)
		.setSession(sessionCookie);

	const databases = new Databases(client);

	try {
		const documentListingResult = await databases.getDocument(
			PRIVATE_APPWRITE_DATABASE_ID,
			PRIVATE_APPWRITE_COLLECTION_ID,
			ambitionId
		);

		// console.log(chalk.bgWhiteBright.black('Ambitions List: '), documentListingResult);

		pageServerResponse = {
			status: 200,
			success: true,
			message: 'Received All Data',
			userData: locals.user,
			body: documentListingResult
		};
	} catch (error) {
		const appwriteError = error as { response: { code: number; message: string } };
		console.error(chalk.bgRedBright.white('All Ambitions Page Server Load Error: '), error);
		pageServerResponse = {
			status: appwriteError.response.code,
			success: false,
			message: appwriteError.response.message,
			userData: locals.user,
			body: {
				ambitionId: ambitionId
			}
		};
	}

	if (!pageServerResponse.success) {
		error(404, pageServerResponse);
	}

	return pageServerResponse;
};

export const actions: Actions = {
	deleteAmbition: async ({ params, locals, cookies }) => {
		let pageServerResponse: {
			status: number;
			success: boolean;
			message: string;
			userData: object;
			body: object;
		} = {
			status: 0,
			success: true,
			message: '',
			userData: {},
			body: {}
		};

		const { ambitionId } = params;

		// console.log(requestData);
		console.log(chalk.bgWhiteBright.black('Ambition ID:'), ambitionId);

		const sessionCookie: string | undefined = cookies.get(SESSION_COOKIE);

		if (!sessionCookie) {
			return {
				status: 401,
				success: false,
				message: 'Unauthorized',
				userData: locals.user,
				body: {
					ambitionId: ambitionId
				}
			};
		}

		const client = new Client()
			.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
			.setProject(PUBLIC_APPWRITE_PROJECT_ID)
			.setSession(sessionCookie);

		const databases = new Databases(client);

		try {
			const result = await databases.deleteDocument(
				PRIVATE_APPWRITE_DATABASE_ID,
				PRIVATE_APPWRITE_COLLECTION_ID,
				ambitionId
			);

			console.log(chalk.bgGreenBright.black('Delete Ambition Result: '), result);

			pageServerResponse = {
				status: 204,
				success: true,
				message: 'Ambition Deleted',
				userData: locals.user,
				body: {
					ambitionId: ambitionId
				}
			};
		} catch (error) {
			console.error(error);
			pageServerResponse = {
				status: 500,
				success: false,
				message: 'Error deleting Ambition',
				userData: locals.user,
				body: {
					ambitionId: ambitionId
				}
			};
		}

		if (pageServerResponse.success) {
			redirect(307, '/all_ambitions');
		}

		return pageServerResponse;
	}
};
