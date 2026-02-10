import { ResourceTag } from "./resource";

export type ColorPaletteToken = {
	value: string;
	role: string;
	order: number;
} 

export type ColorPalette = {
	id: string;
	name: string;
	code: string;
	tokens: ColorPaletteToken[];
	tags: ResourceTag[];
	createdAt: Date;
}

export type ColorPalettesPage = {
	items: ColorPalette[];
	totalCount: number;
	nextOffset: number;
}