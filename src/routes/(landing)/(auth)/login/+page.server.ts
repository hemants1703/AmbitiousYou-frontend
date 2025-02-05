import { createAdminClient, SESSION_COOKIE } from '$lib/appwrite/appwrite';
import chalk from 'chalk';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import validEmail from '$lib/helpers/validateEmail';
import { ID, Client, Messaging, Users, Query } from 'node-appwrite';
import { PRIVATE_APPWRITE_KEY } from '$env/static/private';
import formatDateTime from '$lib/helpers/formatDateTime';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/dashboard');
	}
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();

		const email: FormDataEntryValue = formData.get('email') as string;
		const password: FormDataEntryValue = formData.get('password') as string;

		let formActionResponse = {
			status: 400,
			success: false,
			message: 'All fields are required',
			body: {}
		};

		if (!email || !password) {
			return {
				status: 400,
				success: false,
				message: 'All fields are required',
				body: {
					email: email,
					password: password
				}
			};
		}

		if (!validEmail(email)) {
			return {
				status: 400,
				success: false,
				message: 'Invalid email address',
				body: {
					email: email,
					password: password
				}
			};
		}

		const { account } = createAdminClient();

		try {
			const session = await account.createEmailPasswordSession(email, password);

			console.log(chalk.bgWhiteBright.black('Session response'), session);

			cookies.set(SESSION_COOKIE, session.secret, {
				sameSite: 'strict',
				expires: new Date(session.expire),
				secure: true,
				path: '/'
			});

			// const user = await account.get();

			// console.log(chalk.bgWhiteBright.black('User account get request response'), user);

			// locals.user = user;

			// loggedInUser.set(user);
			// greetUser.set(true);

			formActionResponse = {
				status: 200,
				success: true,
				message: 'Login successful',
				body: session
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error(chalk.bgRedBright.white('Error'), error);
			formActionResponse = {
				status: 401,
				success: false,
				message: error.response.message,
				body: error.response
			};
			console.log(chalk.bgRedBright.white('Login Form Response'), formActionResponse);
		}

		if (formActionResponse.success) {
			redirect(302, '/dashboard');
		}

		return formActionResponse;
	},
	forgotPassword: async ({ request }) => {
		const formData = await request.formData();

		const userEmail: FormDataEntryValue = formData.get('email') as string;

		console.log('FormData: ', formData);
		console.log('Email: ', userEmail);

		if (!validEmail(userEmail)) {
			return {
				status: 400,
				success: false,
				message: 'Invalid email address',
				body: {
					email: userEmail
				}
			};
		}

		// Check and see if the email exists in the database, if it does, send a password reset link to the email
		let accountExists = false;
		let queriedUserFromEmail;
		try {
			const client = new Client()
				.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
				.setProject(PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
				.setKey(PRIVATE_APPWRITE_KEY); // Your secret API key

			const users = new Users(client);

			queriedUserFromEmail = await users.list(
				[Query.equal('email', userEmail)] // queries (optional)
			);

			// console.log("Users List: ", queriedUserFromEmail);

			accountExists = queriedUserFromEmail.total > 0;
		} catch (error) {
			console.error(error);
			accountExists = false;
			return {
				status: 400,
				success: false,
				message: error.message,
				body: {
					email: userEmail
				}
			};
		}

		// If the account does not exist, don't send mail and return the error message
		if (!accountExists) {
			return {
				status: 404,
				success: false,
				message: 'Account does not exist for provided mail ID, Create an Account Today!',
				body: {
					email: userEmail
				}
			};
		}

		// If the account exists for the provided userEmail, send the password reset link to the email
		try {
			const client = new Client()
				.setEndpoint(PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
				.setProject(PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
				.setKey(PRIVATE_APPWRITE_KEY);

			const messaging = new Messaging(client);

			const mailContent = `
			<h2>Since you forgot your password for you AmbitiousYou Account, here you have you password reset link.</h2>
			Click on the link to reset your password: <b><a href="https://ambitiousyou.pro/>Reset Password</a></b>
			`;

			// Format the date time for mail scheduling
			const formattedDateTime = formatDateTime(new Date());
			console.log('Formatted Date Time: ', formattedDateTime);

			const mailResult = await messaging.createEmail(
				ID.unique(), // messageId
				'Password Recovery Link', // subject
				mailContent, // content
				[], // topics (optional)
				[queriedUserFromEmail.users[0].$id], // users (optional)
				[], // targets (optional)
				[], // cc (optional)
				[], // bcc (optional)
				[], // attachments (optional)
				false, // draft (optional)
				true, // html (optional)
				formattedDateTime // scheduledAt (optional)
			);

			console.log(mailResult);
		} catch (error) {
			console.error(error);

			if (error.type === 'general_rate_limit_exceeded') {
				return {
					status: 429,
					success: false,
					message:
						'Servers are under heavy load! please try again later, incovenience is regretted',
					body: {
						email: userEmail
					}
				};
			}

			return {
				status: 400,
				success: false,
				message: error.message,
				body: {
					email: userEmail
				}
			};
		}

		return {
			status: 200,
			success: true,
			message: 'Password reset link sent to your email',
			body: {
				email: userEmail
			}
		};
	}
};
