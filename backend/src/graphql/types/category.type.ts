import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ResourceType } from "./resource.type";

@ObjectType()
export class CategoryType {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field(() => [ResourceType], { nullable: "itemsAndList" })
	resources?: ResourceType[] | null;

	@Field()
  	createdAt: Date;
}
