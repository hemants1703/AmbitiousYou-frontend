// src/routes/+page.server.js
import { redirect } from '@sveltejs/kit';

export async function load({ locals }: { locals: App.Locals }) {
	if (!locals.user) {
		redirect(307, '/');
	}
}
