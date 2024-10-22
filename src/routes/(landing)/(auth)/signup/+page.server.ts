import type { Actions, PageServerLoad } from './$types';
import { SESSION_COOKIE, createAdminClient } from '$lib/appwrite/appwrite.js';
import { redirect } from '@sveltejs/kit';
import { ID } from 'node-appwrite';
import chalk from 'chalk';
import { greetUser, loggedInUser } from '$lib/store/userData';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/dashboard');
	}
};

export const actions = {
	createAccount: async ({ request, cookies, locals, event }) => {
		const formData = await request.formData();

		const fullName: string = formData.get('fullName') as string;
		const email: FormDataEntryValue = formData.get('email') as string;
		const password: FormDataEntryValue = formData.get('password') as string;

		console.log(chalk.bgBlueBright.white('formData'), formData);

		if (!fullName || !email || !password) {
			return {
				status: 400,
				success: false,
				message: 'All fields are required',
				body: {
					formData: {
						fullName: fullName,
						email: email,
						password: password
					}
				}
			};
		}

		const passwordRegex: RegExp =
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (!passwordRegex.test(password)) {
			// console.log('Invalid Password');

			return {
				status: 400,
				success: false,
				message: 'Invalid Password',
				body: {
					formData: {
						fullName: fullName,
						email: email,
						password: password
					}
				}
			};
		}

		let formActionResponse;
		let response;

		// Create Account
		try {
			// response = await signupAppwrite(email, password, fullName);
			const { account } = createAdminClient();

			await account.create(ID.unique(), email, password, fullName);

			console.log(chalk.bgGreenBright.white('response signing in: '), response);

			formActionResponse = {
				status: 200,
				success: true,
				message: 'Account Created Successfully',
				body: {
					response: response,
					formData: {
						fullName,
						email,
						password
					}
				}
			};

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(chalk.bgRedBright.white('error signing up: '), error);
			formActionResponse = {
				status: error.code,
				success: false,
				message: error.response.message,
				body: { response: error.response, formData: { fullName, email, password } }
			};
		}

		// If account created successfully we log in the user
		if (formActionResponse.success) {
			try {
				const { account } = createAdminClient();

				const session = await account.createEmailPasswordSession(email, password);

				cookies.set(SESSION_COOKIE, session.secret, {
					sameSite: 'strict',
					expires: new Date(session.expire),
					secure: true,
					path: '/'
				});

				console.log(chalk.bgGreenBright.white('login after sign up session response: '), session);

				const user = await account.get();

				locals.user = user;

				loggedInUser.set(user);
				greetUser.set(true);

				formActionResponse = {
					status: 200,
					success: true,
					message: 'Logged In Successfully',
					body: {
						response: session,
						formData: {
							fullName,
							email,
							password
						}
					}
				};

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.log(chalk.bgRedBright.white('error logging in: '), error);
				formActionResponse = {
					status: error.code,
					success: false,
					message: error.response.message,
					body: { response: error.response, formData: { fullName, email, password } }
				};
			}
		}

		if (formActionResponse.success) {
			redirect(307, '/dashboard');
		}

		return formActionResponse;
	}
} satisfies Actions;
