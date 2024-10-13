import type { Actions, PageServerLoad } from './$types';
import confirmAuth from '$lib/utils/auth';

export const load: PageServerLoad = async ({ locals }) => {
	confirmAuth(locals);
};

export const actions: Actions = {
	add_ambition: async ({ request }) => {
		const requestData = await request.formData();

		const ambitionName = requestData.get('ambitionName');
		const ambitionDefinition = requestData.get('ambitionDefinition');
		const ambitionCategory = requestData.get('ambitionCategory');
		const ambitionPriority = requestData.get('ambitionPriority');
		const ambitionStatus = requestData.get('ambitionStatus');
		const ambitionTasks = requestData.get('ambitionTasks');
		const ambitionNotes = requestData.get('ambitionNotes');

		const ambition = {
			name: ambitionName,
			description: ambitionDefinition,
			category: ambitionCategory,
			priority: ambitionPriority,
			status: ambitionStatus,
			tasks: ambitionTasks,
			notes: ambitionNotes
		};

		console.log(requestData);
		console.log(ambition);
	}
};
