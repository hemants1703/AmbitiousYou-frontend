type LoggedInUserType = {
	$createdAt: string;
	$id: string;
	$updatedAt: string;
	accessedAt: string;
	email: string;
	emailVerification: boolean;
	labels: [];
	mfa: boolean;
	name: string;
	passwordUpdate: string;
	phone: string;
	phoneVerification: boolean;
	prefs: object;
	registration: string;
	status: boolean;
	targets: object[];
};

export type { LoggedInUserType };
