import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { Account, Client } from "appwrite";
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from "$env/static/public";
import validatePassword from "$lib/helpers/validatePassword";

export const load: PageServerLoad = async ({ locals, url }) => {
    if (locals.user) {
		redirect(307, '/dashboard');
	}

    const userId: string = url.searchParams.get('userId') as string;
    const secret: string = url.searchParams.get('secret') as string;

    if (!userId || !secret) {
        redirect(307, '/login');
    }

    return {
        userId,
        secret
    }
};

export const actions = {
    resetPassword: async ({ request }) => {
        const formData: FormData = await request.formData();

        const userId: FormDataEntryValue = formData.get('userId') as string;
        const secret: FormDataEntryValue = formData.get('secret') as string
        const newPassword: FormDataEntryValue = formData.get('newPassword') as string;

        if (!validatePassword(newPassword)) {
            return {
                status: 400,
                success: false,
                message: 'Invalid Password',
                body: {
                    newPassword
                }
            };
        }

        try {
            const client = new Client()
                .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
                .setProject(PUBLIC_APPWRITE_PROJECT_ID);

            const account = new Account(client);

            const resetResult = await account.updateRecovery(
                userId,
                secret,
                newPassword
            )

            console.log('Reset result', resetResult);
        } catch (error) {
            const err = error as App.Error;
            console.error("Error while resetting password", err);
            return {
                status: err.status,
                success: false,
                message: err.message,
                body: {
                    userId: userId,
                    secret: secret,
                    password: newPassword
                }
            }
        }

        return {
            status: 200,
            success: true,
            message: 'Password reset successfully',
            body: {
                userId: userId,
                secret: secret,
                password: newPassword
            }
        }
        
    }
}