import type { AmbitionType } from './ambitionType';

type ServerFormData = {
	status: number;
	success: boolean;
	message: string;
	userData: object;
	body: AmbitionType;
};

export type { ServerFormData };
