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
		user: locals.user
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
		let ambitionTasks = (requestData.get('ambitionTasks') as string) || '';
		let ambitionStartDate = (requestData.get('ambitionStartDate') as string) || '';
		let ambitionEndDate = (requestData.get('ambitionEndDate') as string) || '';
		const ambitionCompletionDate = null;
		const ambitionStatus = (requestData.get('ambitionStatus') as string) || '';
		const ambitionPriority = (requestData.get('ambitionPriority') as string) || '';
		const ambitionCategory = (requestData.get('ambitionCategory') as string) || '';
		// let ambitionTags = (requestData.get('ambitionTags') as string) || '';
		let ambitionNotes = (requestData.get('ambitionNotes') as string) || '';

		// Check if all the required fields are filled
		// if (
		// 	!ambitionName ||
		// 	!ambitionDefinition ||
		// 	!ambitionCategory ||
		// 	!ambitionPriority ||
		// 	!ambitionStatus
		// ) {
		// 	return {
		// 		status: 400,
		// 		success: false,
		// 		message: 'Please fill in all the fields.',
		// 		body: {
		// 			ambitionName: ambitionName,
		// 			ambitionDefinition: ambitionDefinition,
		// 			ambitionType: ambitionType,
		// 			ambitionTasks: ambitionTasks,
		// 			ambitionStartDate: ambitionStartDate,
		// 			ambitionEndDate: ambitionEndDate,
		// 			ambitionCompletionDate: ambitionCompletionDate,
		// 			ambitionStatus: ambitionStatus,
		// 			ambitionPriority: ambitionPriority,
		// 			ambitionCategory: ambitionCategory,
		// 			// ambitionTags: ambitionTags,
		// 			ambitionNotes: ambitionNotes
		// 		}
		// 	};
		// } else if (!ambitionStartDate || !ambitionEndDate) {
		// 	return {
		// 		status: 400,
		// 		success: false,
		// 		message: 'Please select a Start and End date as well in the date picker!',
		// 		body: {
		// 			ambitionName: ambitionName,
		// 			ambitionDefinition: ambitionDefinition,
		// 			ambitionType: ambitionType,
		// 			ambitionTasks: ambitionTasks,
		// 			ambitionStartDate: ambitionStartDate,
		// 			ambitionEndDate: ambitionEndDate,
		// 			ambitionCompletionDate: ambitionCompletionDate,
		// 			ambitionStatus: ambitionStatus,
		// 			ambitionPriority: ambitionPriority,
		// 			ambitionCategory: ambitionCategory,
		// 			// ambitionTags: ambitionTags,
		// 			ambitionNotes: ambitionNotes
		// 		}
		// 	};
		// }

		ambitionTasks = JSON.parse(ambitionTasks).map((task: object) => JSON.stringify(task));
		ambitionNotes = JSON.parse(ambitionNotes).map((note: object) => JSON.stringify(note));
		// ambitionTags = JSON.parse(ambitionTags).map((tag) => JSON.stringify(tag));

		ambitionStartDate = new Date(ambitionStartDate).toISOString();
		ambitionEndDate = new Date(ambitionEndDate).toISOString();

		console.log(chalk.bgWhiteBright.black('Ambition Tasks after processing: '), ambitionTasks);

		if (ambitionTasks.length === 0) {
			return {
				status: 400,
				success: false,
				message: "Please add at least one task to the Ambition's task list.",
				body: {
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
					// ambitionTags: ambitionTags,
					ambitionNotes: ambitionNotes
				}
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
			// ambitionTags: ambitionTags,
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
			const appwriteError = error as { response?: { code?: number; message?: string } };
			pageFormAction = {
				status: appwriteError?.response?.code ?? 500,
				success: false,
				message: appwriteError?.response?.message ?? 'An unexpected error occurred'
			};
		}

		return pageFormAction;
	}
};
