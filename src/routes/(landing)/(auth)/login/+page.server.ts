import { createAdminClient, SESSION_COOKIE } from '$lib/appwrite/appwrite';
import chalk from 'chalk';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import validEmail from '$lib/helpers/validateEmail';
import { Client, Account } from 'appwrite';

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

		try {
			const client = new Client()
				.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
				.setProject(PUBLIC_APPWRITE_PROJECT_ID)

			const account = new Account(client);

			const mailResult = await account.createRecovery(
				userEmail,
				"http://localhost:5173/reset_password"
			)

			console.log("MAIL SENT RESPONSE: ", mailResult);
		} catch (error) {
			const err = error as App.Error;

			console.error(err);

			if (err.type === 'general_rate_limit_exceeded') {
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
				message: err.message,
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
