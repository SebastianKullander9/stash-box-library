import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { TagType } from "./tag.type";

@ObjectType()
export class ColorToken {
	@Field()
	value: string;

	@Field({ nullable: true })
	role?: string;

	@Field(() => Int, { nullable: true })
	order?: number;
}

@ObjectType()
export class ColorPalette {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	code: string;

	@Field(() => [ColorToken], { nullable: true })
	tokens?: ColorToken[];

	@Field(() => [TagType], { nullable: true })
	tags?: TagType[];

	@Field()
	createdAt: Date;
}
