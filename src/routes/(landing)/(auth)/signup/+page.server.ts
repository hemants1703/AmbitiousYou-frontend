import type { Actions } from './$types';
import { SESSION_COOKIE, createAdminClient } from '$lib/appwrite/appwrite.js';
import { redirect } from '@sveltejs/kit';
import { ID } from 'node-appwrite';

export const actions = {
	createAccount: async ({ request, cookies }) => {
		const formData = await request.formData();

		const fullName: string = formData.get('fullName') as string;
		const email: FormDataEntryValue = formData.get('email') as string;
		const password: FormDataEntryValue = formData.get('password') as string;

		console.log('formData', formData);

		if (!fullName || !email || !password) {
			return {
				status: 400,
				success: false,
				message: 'All fields are required',
				body: {
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
				body: {
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
				body: response
			};

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log('error signing up: ', error);
			formActionResponse = {
				status: error.code,
				success: false,
				message: error.response.message,
				body: error
			};
		}

		if (formActionResponse.success) {
			redirect(302, '/dashboard');
		} else {
			return formActionResponse;
		}
	}
} satisfies Actions;
