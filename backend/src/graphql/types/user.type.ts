import { ObjectType, Field, HideField, ID } from "@nestjs/graphql";
import { ResourceType } from "./resource.type";

@ObjectType()
export class UserType {
	@Field(() => ID)
	id: string;

	@Field()
	email: string;

	@HideField()
	password: string;

	@Field(() => [ResourceType], { nullable: "itemsAndList" })
	resources?: ResourceType[] | null;
}
