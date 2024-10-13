import type { Actions, PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';
import chalk from 'chalk';
import { Client, Databases, ID } from 'node-appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { SESSION_COOKIE } from '$lib/appwrite/appwrite';
import { PRIVATE_APPWRITE_DATABASE_ID, PRIVATE_APPWRITE_COLLECTION_ID } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
	confirmAuth(locals);

	const pageServerResponse = {
		userData: locals.user
	};

	return pageServerResponse;
};

export const actions: Actions = {
	add_ambition: async ({ request, locals, cookies }) => {
		const requestData = await request.formData();

		console.log(chalk.bgWhiteBright.black('Ambition Submission Request Data: '), requestData);

		let pageFormAction = {};

		// Extract the userId for which the ambition is to be created & added
		const userData = locals.user;
		const userId = userData.$id;
		const userEmail = userData.email;
		const userFullName = userData.name;

		const ambitionName = (requestData.get('ambitionName') as string) || '';
		const ambitionDefinition = (requestData.get('ambitionDefinition') as string) || '';
		const ambitionType = (requestData.get('ambitionType') as string) || '';
		const ambitionTasks = (requestData.get('ambitionTasks') as string) || '';
		const ambitionStartDate = (requestData.get('ambitionStartDate') as string) || '';
		const ambitionEndDate = (requestData.get('ambitionEndDate') as string) || '';
		const ambitionCompletionDate = (requestData.get('ambitionCompletionDate') as string) || '';
		const ambitionStatus = (requestData.get('ambitionStatus') as string) || '';
		const ambitionPriority = (requestData.get('ambitionPriority') as string) || '';
		const ambitionCategory = (requestData.get('ambitionCategory') as string) || '';
		const ambitionTags = (requestData.get('ambitionTags') as string) || '';
		const ambitionNotes = (requestData.get('ambitionNotes') as string) || '';

		// Check if all the required fields are filled
		if (
			!ambitionName ||
			!ambitionDefinition ||
			!ambitionType ||
			!ambitionTasks ||
			!ambitionStartDate ||
			!ambitionEndDate ||
			!ambitionCompletionDate ||
			!ambitionStatus ||
			!ambitionPriority ||
			!ambitionCategory ||
			!ambitionTags ||
			!ambitionNotes
		) {
			return {
				status: 400,
				success: false,
				message: 'Please fill in all the fields.'
			};
		}

		const ambition = {
			userId: userId,
			userEmail: userEmail,
			ambitionName: ambitionName,
			ambitionDefinition: ambitionDefinition,
			ambitionType: ambitionType,
			ambitionTasks: ambitionTasks,
			ambitionStartDate: ambitionStartDate,
			ambitionEndDate: ambitionEndDate,
			ambitionCompletionDate: ambitionCompletionDate,
			ambitionStatus: ambitionStatus,
			ambitionPriority: ambitionPriority,
			ambitionCategory: ambitionCategory,
			ambitionTags: ambitionTags,
			ambitionNotes: ambitionNotes,
			ambitionPercentageCompleted: 0
		};

		console.log(
			chalk.bgWhiteBright.black(`Ambition Submitted by (${userFullName}: ${userId})`),
			ambition
		);

		const sessionCookie: string | undefined = cookies.get(SESSION_COOKIE);

		if (!sessionCookie) {
			return {
				status: 401,
				success: false,
				message: 'Unauthorized'
			};
		}

		const client = new Client()
			.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
			.setProject(PUBLIC_APPWRITE_PROJECT_ID)
			.setSession(sessionCookie);

		const databases = new Databases(client);

		try {
			const documentCreationResult = await databases.createDocument(
				PRIVATE_APPWRITE_DATABASE_ID, // databaseId
				PRIVATE_APPWRITE_COLLECTION_ID, // collectionId
				ID.unique(), // documentId
				ambition // data
			);

			console.log(chalk.bgGreenBright.white('Ambition Creation Result: '), documentCreationResult);
			pageFormAction = {
				status: 201,
				success: true,
				message: 'Your new Ambition was successfully added '
			};
		} catch (error) {
			console.error(chalk.bgRedBright.black('Ambition Creation Error: '), error);
			pageFormAction = {
				status: error.response.code,
				success: false,
				message: error.response.message
			};
		}

		// const documentListingResult = await databases.listDocuments(
		// 	PRIVATE_APPWRITE_DATABASE_ID,
		// 	PRIVATE_APPWRITE_COLLECTION_ID,
		// 	[]
		// );

		// console.log(chalk.bgWhiteBright.black('Ambitions List: '), documentListingResult);

		return pageFormAction;
	}
};
