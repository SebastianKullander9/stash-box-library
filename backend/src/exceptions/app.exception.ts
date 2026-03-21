export class AppException extends Error {
	constructor(
		public readonly message: string,
		public readonly code: string,
		public readonly statusCode: number = 400,
	) {
		super(message);
	}
}

export class NotFoundException extends AppException {
	constructor(resource: string) {
		super(`${resource} not found`, "NOT_FOUND", 404);
	}
}

export class BadRequestException extends AppException {
	constructor(message: string) {
		super(message, "BAD_REQUEST", 400);
	}
}
