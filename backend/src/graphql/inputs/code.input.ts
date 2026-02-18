import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCodeFileInput {
	@Field()
	title: string;

	@Field()
	language: string;

	@Field()
	content: string;
}

@InputType()
export class CreateCodeInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description?: string;

	@Field(() => [CreateCodeFileInput])
	codeFiles: CreateCodeFileInput[];

	@Field(() => [String], { nullable: true })
	tagIds?: string[];
}

@InputType()
export class UpdateCodeFileInput {
	@Field({ nullable: true })
	id?: string;

	@Field({ nullable: true })
	title?: string;

	@Field({ nullable: true })
	language?: string;

	@Field({ nullable: true })
	content?: string;
}

@InputType()
export class UpdateCodeInput {
	@Field({ nullable: true })
	title?: string;

	@Field({ nullable: true })
	description?: string;

	@Field(() => [UpdateCodeFileInput], { nullable: true })
	codeFiles?: UpdateCodeFileInput[];

	@Field(() => [String], { nullable: true })
	tagIds?: string[];
}
