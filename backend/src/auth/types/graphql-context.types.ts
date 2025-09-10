import { Request } from "express";

interface CurrentUserType {
	userId: string;
	email: string;
	role: string;
}

export interface GraphQLContext {
	req: Request & { user?: CurrentUserType };
}
