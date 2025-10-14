import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ResourceType } from "./resource.type";

@ObjectType()
export class ResourcePage {
    @Field(() => [ResourceType])
    items: ResourceType[];

    @Field(() => Int)
    totalCount: number;

    @Field(() => Int)
    nextOffset: number;
}