import { redirect } from '@sveltejs/kit';

/**
 * Checks if the user is authenticated.
 *
 * This function verifies if the `user` property exists in the `locals` object.
 * If the `user` property is not present, it redirects the client to the root URL ('/').
 *
 * @param locals - An object containing local variables, including the `user` property.
 * @returns A redirection to the root URL if the user is not authenticated.
 */

export default function confirmAuth(locals: App.Locals) {
	if (!locals.user) {
		return redirect(307, '/');
	}
}
