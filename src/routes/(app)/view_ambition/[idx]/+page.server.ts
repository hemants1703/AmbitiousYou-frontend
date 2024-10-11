import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { idx } = params;
	const response = await fetch('/api/mock', {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});
	const data = await response.json();
	return { idx, data };
};

export const actions = {
	addNewTaskForAmbition: async ({ request }) => {
		const requestData = await request.formData();

		const taskName: FormDataEntryValue = requestData.get('taskName') as string;
		const taskDescription: FormDataEntryValue = requestData.get('taskDescription') as string;

		const ambitionTask = {
			id: 0,
			name: taskName,
			description: taskDescription,
			status: '',
			checked: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		};

		console.log(requestData);
		console.log(ambitionTask);
	},
	addNewNoteForAmbition: async ({ request }) => {
		const requestData = await request.formData();

		const noteContent: FormDataEntryValue = requestData.get('noteContent') as string;

		const ambitionNode = {
			id: 0,
			content: noteContent,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		};

		console.log(requestData);
		console.log(ambitionNode);
	}
} satisfies Actions;
