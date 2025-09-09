import { ObjectType, Field, ID } from "@nestjs/graphql";
import { CategoryType } from "./category.type";
import { TagType } from "./tag.type";
import { UserType } from "./user.type";

@ObjectType()
export class ResourceType {
	@Field(() => ID)
	id: string;

	@Field()
	title: string;

	@Field(() => String, { nullable: true })
	description?: string | null;

	@Field()
	fileUrl: string;

	@Field(() => CategoryType, { nullable: true })
	category?: CategoryType | null;

	@Field(() => [TagType], { nullable: true })
	tags: TagType[] | null;

	@Field(() => UserType, { nullable: true })
	user?: UserType | null;
}
