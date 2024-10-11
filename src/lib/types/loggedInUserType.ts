import type { UserType } from '$lib/types/userType';
import type { AmbitionType } from '$lib/types/ambitionType';

type LoggedInUserType = {
	user: UserType;
	ambitions: AmbitionType[];
};

export type { LoggedInUserType };
