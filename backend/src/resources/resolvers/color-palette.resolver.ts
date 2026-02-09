import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ColorPaletteService } from "../services/color-palette.service";
import { ColorPalette } from "src/graphql/types/color-palette.type";
import { ColorPalettePage } from "src/graphql/types/color-palette-page.type";
import {
	CreateColorPaletteInput,
	UpdateColorPaletteInput,
} from "src/graphql/inputs/color-palette.input";

@Resolver(() => ColorPalette)
export class ColorPaletteResolver {
	constructor(private readonly colorPaletteService: ColorPaletteService) {}

	@Query(() => ColorPalettePage)
	async colorPalettes(
		@Args("tagIds", { type: () => [String], nullable: true }) tagIds?: string[],
		@Args("limit", { type: () => Int, nullable: true }) limit?: number,
		@Args("offset", { type: () => Int, nullable: true }) offset?: number,
	): Promise<ColorPalettePage> {
		return this.colorPaletteService.findMany({ tagIds, limit, offset });
	}

	@Query(() => ColorPalette, { nullable: true })
	async colorPalette(@Args("id") id: string): Promise<ColorPalette | null> {
		return this.colorPaletteService.findById(id);
	}

	@Mutation(() => ColorPalette)
	async createColorPalette(
		@Args("input") input: CreateColorPaletteInput,
	): Promise<ColorPalette> {
		return this.colorPaletteService.create(input);
	}

	@Mutation(() => ColorPalette)
	async updateColorPalette(
		@Args("id") id: string,
		@Args("input") input: UpdateColorPaletteInput,
	): Promise<ColorPalette> {
		return this.colorPaletteService.update(id, input);
	}

	@Mutation(() => ColorPalette)
	async deleteColorPalette(@Args("id") id: string): Promise<ColorPalette> {
		return this.colorPaletteService.delete(id);
	}
}
