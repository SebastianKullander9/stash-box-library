import { Catch, ArgumentsHost } from "@nestjs/common";
import {
	GqlExceptionFilter as IGqlExceptionFilter,
	GqlArgumentsHost,
} from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { AppException } from "./app.exception";

@Catch()
export class GqlExceptionFilter implements IGqlExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		GqlArgumentsHost.create(host);
		const isProd = process.env.NODE_ENV === "production";

		if (exception instanceof AppException) {
			return new GraphQLError(exception.message, {
				extensions: {
					code: exception.code,
					statusCode: exception.statusCode,
				},
			});
		}

		const message =
			exception instanceof Error ? exception.message : "Unknown error";
		console.error("Unhandled exception:", exception);

		return new GraphQLError(isProd ? "Internal server error" : message, {
			extensions: { code: "INTERNAL_SERVER_ERROR" },
		});
	}
}
