import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
export class UpdateUserInput {
	@Field(() => ID)
	id: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	password?: string;
}
