import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { ResourceType } from "./resource.type";

@ObjectType()
export class TagType {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field(() => [ResourceType], { nullable: "itemsAndList" })
	resources?: ResourceType[] | null;

	@Field()
	createdAt: Date;
}

@ObjectType()
export class TagWithCountType extends TagType {
	@Field(() => Int)
	resourceCount: number;
}
