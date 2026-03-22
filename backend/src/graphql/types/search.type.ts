import { ObjectType, Field, Float } from "@nestjs/graphql";

@ObjectType()
export class SearchResultType {
	@Field()
	id: string;

	@Field()
	title: string;

	@Field()
	type: string;

	@Field(() => String, { nullable: true })
	categoryId: string | null;

	@Field(() => Float)
	rank: number;
}
