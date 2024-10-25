import type { PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';
import { Client, Databases, Query } from 'node-appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { PRIVATE_APPWRITE_DATABASE_ID, PRIVATE_APPWRITE_COLLECTION_ID } from '$env/static/private';
import { SESSION_COOKIE } from '$lib/appwrite/appwrite';
import chalk from 'chalk';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	confirmAuth(locals);

	let pageServerResponse = {};

	const sessionCookie: string | undefined = cookies.get(SESSION_COOKIE);

	if (!sessionCookie) {
		return {
			status: 401,
			success: false,
			message: 'Unauthorized',
			userData: locals.user,
			body: null
		};
	}

	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID)
		.setSession(sessionCookie);

	const databases = new Databases(client);

	try {
		const documentListingResult = await databases.listDocuments(
			PRIVATE_APPWRITE_DATABASE_ID,
			PRIVATE_APPWRITE_COLLECTION_ID,
			[Query.equal('userEmail', [locals.user.email])]
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
		console.error(
			chalk.bgRedBright.white('All Ambitions Page Server Load Error: '),
			error.response.message
		);
		pageServerResponse = {
			status: error.response.code,
			success: false,
			message: error.response.message,
			userData: locals.user,
			body: null
		};
	}

	return pageServerResponse;
};
