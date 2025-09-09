import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateResourceInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description?: string;

	@Field()
	fileUrl: string;

	@Field(() => ID, { nullable: true })
	categoryId?: string;

	@Field({ nullable: true })
	categoryName?: string;

	@Field(() => [String], { nullable: true })
	tagNames?: string[];

	@Field(() => ID, { nullable: true })
	userId?: string;
}

@InputType()
export class UpdateResourceInput {
	@Field(() => ID)
	id: string;

	@Field({ nullable: true })
	title?: string;

	@Field({ nullable: true })
	description?: string;

	@Field({ nullable: true })
	fileUrl?: string;

	@Field(() => ID, { nullable: true })
	categoryId?: string;

	@Field({ nullable: true })
	categoryName?: string;

	@Field(() => [String], { nullable: true })
	tagNames?: string[];

	@Field(() => ID, { nullable: true })
	userId?: string;
}
