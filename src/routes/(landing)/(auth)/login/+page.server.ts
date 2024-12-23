import { createAdminClient, SESSION_COOKIE } from '$lib/appwrite/appwrite';
import chalk from 'chalk';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { greetUser, loggedInUser } from '$lib/store/userData';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/dashboard');
	}
};

export const actions: Actions = {
	login: async ({ request, cookies, locals }) => {
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
	}
};
