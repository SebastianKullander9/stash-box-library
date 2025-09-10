import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateResourceInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description?: string;

	@Field({ nullable: true })
	textContent?: string;

	@Field(() => ID, { nullable: true })
	categoryId?: string;

	@Field({ nullable: true })
	categoryName?: string;

	@Field(() => [String], { nullable: true })
	tagNames?: string[];

	@Field(() => ID, { nullable: true })
	userId?: string;

	@Field(() => [FileInput], { nullable: true })
	files?: FileInput[];
}

@InputType()
export class FileInput {
	@Field()
	url: string;

	@Field()
	fileType: string;
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
	textContent?: string;

	@Field(() => [FileInput], { nullable: true })
	files?: FileInput[];

	@Field(() => ID, { nullable: true })
	categoryId?: string;

	@Field({ nullable: true })
	categoryName?: string;

	@Field(() => [String], { nullable: true })
	tagNames?: string[];

	@Field(() => ID, { nullable: true })
	userId?: string;
}
