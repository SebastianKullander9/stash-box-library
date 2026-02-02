import { ObjectType, Field, ID } from "@nestjs/graphql";
import { CategoryType } from "./category.type";
import { TagType } from "./tag.type";
import { UserType } from "./user.type";
import { FontMetadataType } from "./font-metadata.type";

@ObjectType()
export class FileType {
	@Field()
	url: string;

	@Field()
	fileType: string;

	@Field()
	fileRole: string;

	@Field(() => FontMetadataType, { nullable: true })
	fontMetadata?: FontMetadataType | null;
}

@ObjectType()
export class ResourceType {
	@Field(() => ID)
	id: string;

	@Field()
	title: string;

	@Field(() => String, { nullable: true })
	description?: string | null;

	@Field(() => String, { nullable: true })
	textContent?: string | null;

	@Field(() => CategoryType, { nullable: true })
	category?: CategoryType | null;

	@Field({ nullable: true })
	categoryName?: string;

	@Field(() => [TagType], { nullable: true })
	tags: TagType[] | null;

	@Field(() => UserType, { nullable: true })
	user?: UserType | null;

	@Field(() => [FileType], { nullable: true })
	files?: FileType[] | null;

	@Field(() => Date)
	createdAt: Date;
}
