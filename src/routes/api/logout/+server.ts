import { createSessionClient, SESSION_COOKIE } from '$lib/appwrite/appwrite';
import { json } from '@sveltejs/kit';
import chalk from 'chalk';

export async function GET(event) {
	let success = false;
	const { account } = createSessionClient(event);

	try {
		await account.deleteSession('current');
		event.cookies.delete(SESSION_COOKIE, { path: '/' });
		success = true;
	} catch (error) {
		console.error(chalk.bgMagentaBright.black('Logout Error: '), chalk.bgYellowBright.white(error));
		success = false;
	}

	return json({ success });
}
