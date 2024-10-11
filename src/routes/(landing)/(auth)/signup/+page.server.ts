import type { Actions } from './$types';
import { SESSION_COOKIE, createAdminClient } from '$lib/appwrite/appwrite.js';
import { redirect } from '@sveltejs/kit';
import { ID } from 'node-appwrite';

export const actions = {
	createAccount: async ({ request, cookies }) => {
		const data = await request.formData();

		const fullName: string = data.get('fullName') as string;
		const email: FormDataEntryValue = data.get('email') as string;
		const password: FormDataEntryValue = data.get('password') as string;

		console.log('formData', data);

		if (!fullName || !email || !password) {
			return {
				status: 400,
				success: false,
				message: 'All fields are required',
				data: {
					full_name: fullName,
					email: email,
					password: password
				}
			};
		}

		const passwordRegex: RegExp =
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (!passwordRegex.test(password)) {
			console.log('Invalid Password');

			return {
				status: 400,
				success: false,
				message: 'Invalid Password',
				data: {
					fullName: fullName,
					email: email,
					password: password
				}
			};
		}

		let formActionResponse;
		let response;

		try {
			// response = await signupAppwrite(email, password, fullName);
			const { account } = createAdminClient();

			await account.create(ID.unique(), email, password, fullName);
			const session = await account.createEmailPasswordSession(email, password);

			cookies.set(SESSION_COOKIE, session.secret, {
				sameSite: 'strict',
				expires: new Date(session.expire),
				secure: true,
				path: '/'
			});

			console.log('response signing in: ', response);

			formActionResponse = {
				status: 200,
				success: true,
				message: 'Account Created Successfully',
				data: response
			};

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log('error signing up: ', error);
			formActionResponse = {
				status: error.code,
				success: false,
				message: error.response.message,
				data: error
			};
		}

		if (formActionResponse.success) {
			redirect(302, '/dashboard');
		} else {
			return formActionResponse;
		}
	}
} satisfies Actions;
