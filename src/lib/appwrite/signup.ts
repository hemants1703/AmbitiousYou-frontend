import { Account, ID } from 'appwrite';
import client from './client';

export default async function signupAppwrite(email: string, password: string, name: string) {
	const account = new Account(client);
	const promise = account.create(ID.unique(), email, password, name);

	promise.then(
		function (response) {
			console.log(response); // Success
		},
		function (error) {
			console.log(error); // Failure
		}
	);
}
