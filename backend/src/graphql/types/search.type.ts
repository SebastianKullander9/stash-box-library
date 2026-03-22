import { ObjectType, Field, Float } from "@nestjs/graphql";

@ObjectType()
export class SearchResultType {
	@Field()
	id: string;

	@Field()
	title: string;

	@Field(() => String, { nullable: true })
	description: string | null;

	@Field()
	type: string;

	@Field(() => String, { nullable: true })
	categoryName: string | null;

	@Field(() => Float)
	rank: number;
}
