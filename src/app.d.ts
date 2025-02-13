// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: number;
			response: {
				message?: string;
				code?: number;
			};
			type?: string;
			status?: number;
			message?: string;
		}
		interface Locals {
			user: Models.User<Models.Preferences> | undefined;
			userData: Models.User<Models.Preferences> | undefined;
		}
		interface PageServerLoad {
			status?: number;
			success?: boolean;
			message?: string;
			userData?: Models.User<Models.Preferences> | undefined;
			body?: object;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {
		// 	env: {
		// 		COUNTER: DurableObjectNamespace;
		// 	};
		// 	context: {
		// 		waitUntil(promise: Promise<any>): void;
		// 	};
		// 	caches: CacheStorage & { default: Cache };
		// }
	}
}

export {};
