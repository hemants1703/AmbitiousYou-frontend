import type { PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';
import type { Actions } from '@sveltejs/kit';
import type { FeedbackType } from '$lib/types/feedbackType';
import chalk from 'chalk';
import client from '$lib/appwrite/client';
import { ID, Databases } from 'node-appwrite';
import {
	PRIVATE_APPWRITE_DATABASE_ID,
	PRIVATE_APPWRITE_COLLECTION_ID_FOR_FEEDBACK
} from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
	confirmAuth(locals);
};

export const actions: Actions = {
	postFeedback: async ({ request, locals }) => {
		const formData = await request.formData();

		const feedbackTitle = formData.get('feedbackTitle') as string;
		const feedbackDescription = formData.get('feedbackDescription') as string;
		const feedbackCategory = formData.get('feedbackCategory') as string;

		const feedbackData: FeedbackType = {
			feedbackTitle,
			feedbackDescription,
			feedbackCategory,
			feedbackFromActiveUser: true,
			userId: locals.user.$id,
			userEmail: locals.user.email,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		const database = new Databases(client);

		try {
			const response = await database.createDocument(
				PRIVATE_APPWRITE_DATABASE_ID,
				PRIVATE_APPWRITE_COLLECTION_ID_FOR_FEEDBACK,
				ID.unique(),
				feedbackData
			);

			console.log(chalk.bgGreenBright.black('Feedback posted successfully: '), response);

			return {
				status: 200,
				success: true,
				message: 'Your feedback is much appreciated! Thank you for taking the time to share your thoughts. 😊',
				body: { feedbackData }
			};
		} catch (error) {
			const err = error as App.Error;
			console.error(chalk.bgRedBright.white('Error posting feedback: '), err);
			return {
				status: 400,
				success: false,
				message: 'Uh oh, something unexpected happened! Please try again, and don\'t worry—we\'re on it.',
				body: { feedbackData }
			};
		}
	}
};
