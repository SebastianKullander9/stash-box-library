import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ColorPalette } from "./color-palette.type";

@ObjectType()
export class ColorPalettePage {
	@Field(() => [ColorPalette])
	items: ColorPalette[];

	@Field(() => Int)
	totalCount: number;

	@Field(() => Int)
	nextOffset: number;
}
