type AmbitionType = {
	id: number;
	userId: number;
	name: string;
	definition: string;
	type: string;
	tasks: Array<object>;
	start_date: string;
	end_date: string;
	completion_date: string;
	status: string;
	priority: string;
	category: string;
	tags: Array<string>;
	notes: Array<string>;
	created_at: string;
	updated_at: string;
};

export type { AmbitionType };
