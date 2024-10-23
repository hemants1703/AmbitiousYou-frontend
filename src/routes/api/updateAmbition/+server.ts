import { PRIVATE_APPWRITE_COLLECTION_ID, PRIVATE_APPWRITE_DATABASE_ID } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { SESSION_COOKIE } from '$lib/appwrite/appwrite.js';
import { json } from '@sveltejs/kit';
import chalk from 'chalk';
import { Client, Databases } from 'node-appwrite';

export async function POST({ request, cookies }) {
	const data = await request.json();
	// console.log(chalk.bgCyanBright.white('updateAmbition received Data: '), data);

	// Stringify ambitionTasks and ambitionNotes before updation to maintain schema
	let ambitionTasks = [];
	if (data.ambitionTasks) {
		ambitionTasks = data.ambitionTasks.map((task: any) => JSON.stringify(task));
	}

	let ambitionNotes = [];
	if (data.ambitionNotes) {
		ambitionNotes = data.ambitionNotes.map((note: any) => JSON.stringify(note));
	}

	// console.log(
	// 	chalk.bgCyanBright.white('updateAmbition Stringified Data: '),
	// 	ambitionTasks,
	// 	ambitionNotes
	// );

	const sessionCookie: string | undefined = cookies.get(SESSION_COOKIE);

	if (!sessionCookie) {
		console.log(chalk.bgRed.white('updateAmbition Error: '), 'No user session');
		return new Response(
			JSON.stringify({
				status: 401,
				success: false,
				message: 'Unauthorized'
			})
		);
	}

	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID)
		.setSession(sessionCookie);

	const database = new Databases(client);

	let responseData = {};

	try {
		const result = await database.updateDocument(
			PRIVATE_APPWRITE_DATABASE_ID, // databaseId
			PRIVATE_APPWRITE_COLLECTION_ID, // collectionId
			data.$id, // documentId
			{
				ambitionStatus: data.ambitionStatus,
				ambitionTasks: ambitionTasks,
				ambitionNotes: ambitionNotes
			} // data (optional)
		);

		// console.log(chalk.bgGreen.white('updateAmbition Result: '), result);

		responseData = {
			status: 200,
			success: true,
			message: 'Ambition Updated'
		};
	} catch (error) {
		console.log(chalk.bgRed.white('updateAmbition Error: '), error);
		responseData = {
			status: 500,
			success: false,
			message: 'Error updating Ambition'
		};
	}

	return new Response(JSON.stringify(responseData));
}
