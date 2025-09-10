import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ROLES_KEY } from "../roles.decorator";
import { GraphQLContext } from "../types/graphql-context.types";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}

		const ctx = GqlExecutionContext.create(context);
		const user = ctx.getContext<GraphQLContext>().req.user;

		if (!user) {
			throw new ForbiddenException("Not authenticated");
		}

		if (!requiredRoles.includes(user.role)) {
			throw new ForbiddenException(
				`Requires role: ${requiredRoles.join(", ")}`,
			);
		}

		return true;
	}
}
