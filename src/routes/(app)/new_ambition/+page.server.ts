import type { Action } from './$types';

export const actions = {
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
} satisfies Action;
