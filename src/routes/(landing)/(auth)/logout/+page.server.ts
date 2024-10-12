import { createSessionClient, SESSION_COOKIE } from '$lib/appwrite/appwrite';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import chalk from 'chalk';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(307, '/');
	}
};

export const actions: Actions = {
	logout: async (event) => {
		let success = false;
		const { account } = createSessionClient(event);

		try {
			await account.deleteSession('current');
			event.cookies.delete(SESSION_COOKIE, { path: '/' });
			success = true;
		} catch (error) {
			console.error(
				chalk.bgMagentaBright.black('Logout Error: '),
				chalk.bgYellowBright.white(error)
			);
			success = false;
		}

		return { success };
	}
};
