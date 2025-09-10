import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

interface CurrentUserType {
	userId: string;
	email: string;
	role: string;
}

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext<{ req: { user: CurrentUserType } }>().req.user;
	},
);
