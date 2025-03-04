type FeedbackType = {
	feedbackTitle: string;
	feedbackDescription: string;
	feedbackCategory: string; // Enum for category
	feedbackFromActiveUser: boolean; // If the feedback was created by the active user
	userId?: string; // User who created the feedback
	userEmail?: string; // Email of the user who created the feedback
	createdAt: Date; // Timestamp for when the feedback was created
	updatedAt: Date; // Timestamp for when the feedback was last updated
};

export type { FeedbackType };
