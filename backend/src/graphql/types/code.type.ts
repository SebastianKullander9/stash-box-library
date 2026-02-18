import { ObjectType, ID, Field, Int } from "@nestjs/graphql";
import { TagType } from "./tag.type";

@ObjectType()
export class CodeVersion {
	@Field(() => ID)
	id: string;

	@Field()
	content: string;

	@Field()
	createdAt: Date;
}

@ObjectType()
export class CodeFile {
	@Field(() => ID)
	id: string;

	@Field()
	title: string;

	@Field()
	language: string;

	@Field()
	content: string;

	@Field(() => [CodeVersion])
	codeVersions: CodeVersion[];

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}

@ObjectType()
export class Code {
	@Field(() => ID)
	id: string;

	@Field()
	title: string;

	@Field({ nullable: true })
	description?: string;

	@Field(() => [CodeFile])
	codeFiles: CodeFile[];

	@Field(() => [TagType], { nullable: true })
	tags: TagType[] | null;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}

@ObjectType()
export class CodePage {
	@Field(() => [Code])
	items: Code[];

	@Field(() => Int)
	totalCount: number;

	@Field(() => Int)
	nextOffset: number;
}
