import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateTagInput {
	@Field()
	name: string;
}

@InputType()
export class UpdateTagInput {
	@Field(() => ID)
	id: string;

	@Field({ nullable: true })
	name?: string;
}
