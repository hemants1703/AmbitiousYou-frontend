import confirmAuth from '$lib/utils/auth';
import type { PageServerLoad, Actions } from './$types';
import { SESSION_COOKIE } from '$lib/appwrite/appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { PRIVATE_APPWRITE_DATABASE_ID, PRIVATE_APPWRITE_COLLECTION_ID } from '$env/static/private';
import { Client, Databases } from 'node-appwrite';
import chalk from 'chalk';

export const load: PageServerLoad = async ({ locals, params, cookies }) => {
	confirmAuth(locals);

	const { ambitionId } = params;
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
		const documentListingResult = await databases.getDocument(
			PRIVATE_APPWRITE_DATABASE_ID,
			PRIVATE_APPWRITE_COLLECTION_ID,
			ambitionId
		);

		console.log(chalk.bgWhiteBright.black('Ambitions List: '), documentListingResult);

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

	// const response = await fetch('/api/mock', {
	// 	method: 'GET',
	// 	headers: {
	// 		'content-type': 'application/json'
	// 	}
	// });
	// const data = await response.json();
	return pageServerResponse;
};

export const actions = {
	addNewTaskForAmbition: async ({ request }) => {
		const requestData = await request.formData();

		const taskName: FormDataEntryValue = requestData.get('taskName') as string;
		const taskDescription: FormDataEntryValue = requestData.get('taskDescription') as string;

		const ambitionTask = {
			id: 0,
			name: taskName,
			description: taskDescription,
			status: '',
			checked: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		};

		console.log(requestData);
		console.log(ambitionTask);
	},
	addNewNoteForAmbition: async ({ request }) => {
		const requestData = await request.formData();

		const noteContent: FormDataEntryValue = requestData.get('noteContent') as string;

		const ambitionNode = {
			id: 0,
			content: noteContent,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		};

		console.log(requestData);
		console.log(ambitionNode);
	}
} satisfies Actions;
