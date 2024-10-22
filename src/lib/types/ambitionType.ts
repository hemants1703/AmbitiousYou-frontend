type AmbitionTaskType = {
	id: number;
	name: string;
	description: string;
	checked: boolean;
};

type AmbitionNoteType = {
	id: number;
	content: string;
	created_at: string;
};

type AmbitionType = {
	userId: string;
	userEmail: string;
	ambitionName: string;
	ambitionDefinition: string;
	ambitionType: string;
	ambitionStartDate: string;
	ambitionEndDate: string;
	ambitionCompletionDate: string | null;
	ambitionStatus: string;
	ambitionPriority: string;
	ambitionCategory: string;
	ambitionPercentageCompleted: number;
	ambitionTasks: AmbitionTaskType[]; // Array of AmbitionTaskType
	ambitionTags: string[];
	ambitionNotes: AmbitionNoteType[]; // Array of AmbitionNoteType
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	$databaseId: string;
	$collectionId: string;
};

export type { AmbitionNoteType, AmbitionTaskType, AmbitionType };
