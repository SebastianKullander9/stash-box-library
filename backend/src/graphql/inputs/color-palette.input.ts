import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ColorTokenInput {
	@Field()
	value: string;

	@Field({ nullable: true })
	role?: string;
}

@InputType()
export class ColorTokenEntryInput {
	@Field()
	key: string;

	@Field(() => ColorTokenInput)
	token: ColorTokenInput;
}

@InputType()
export class CreateColorPaletteInput {
	@Field()
	name: string;

	@Field({ nullable: true })
	code?: string;

	@Field(() => [ColorTokenEntryInput])
	tokens: ColorTokenEntryInput[];

	@Field(() => [String], { nullable: true })
	tagIds?: string[];
}

@InputType()
export class UpdateColorPaletteInput {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	code?: string;

	@Field(() => [ColorTokenEntryInput], { nullable: true })
	tokens?: ColorTokenEntryInput[];

	@Field(() => [String], { nullable: true })
	tagIds?: string[];
}
