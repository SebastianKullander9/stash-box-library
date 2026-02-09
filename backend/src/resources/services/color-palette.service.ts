import { TokenValidationService } from "./token-validation.service";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
	CreateColorPaletteInput,
	UpdateColorPaletteInput,
	ColorTokenEntryInput,
} from "src/graphql/inputs/color-palette.input";
import { ColorPalette } from "src/graphql/types/color-palette.type";
import {
	ColorPalette as PrismaColorPalette,
	ColorToken as PrismaColorToken,
	Tag as PrismaTag,
} from "@prisma/client";

type ColorPaletteWithRelations = PrismaColorPalette & {
	tokens: PrismaColorToken[];
	tags: PrismaTag[];
};

export interface ColorPaletteQueryOptions {
	tagIds?: string[];
	limit?: number;
	offset?: number;
}

export interface ColorPalettePage {
	items: ColorPalette[];
	totalCount: number;
	nextOffset: number;
}

@Injectable()
export class ColorPaletteService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly tokenValidator: TokenValidationService,
	) {}

	async create(input: CreateColorPaletteInput): Promise<ColorPalette> {
		const tokensObject = this.arrayToTokensObject(input.tokens);
		this.tokenValidator.validate(tokensObject);

		const code = input.code ?? this.generateCode(tokensObject);

		const palette = await this.prisma.colorPalette.create({
			data: {
				name: input.name,
				code,
				tokens: {
					create: input.tokens.map((entry) => ({
						value: entry.token.value ?? "",
						role: entry.token.role ?? entry.key,
						order: this.getRoleOrder(entry.token.role ?? entry.key),
					})),
				},
				tags: input.tagIds
					? {
							connect: input.tagIds.map((id) => ({ id })),
						}
					: undefined,
			},
			include: {
				tokens: true,
				tags: true,
			},
		});

		return this.mapToGraphQLType(palette);
	}

	async findMany(options: ColorPaletteQueryOptions): Promise<ColorPalettePage> {
		const { tagIds, limit = 20, offset = 0 } = options;

		const where = {
			...(tagIds?.length && { tags: { some: { id: { in: tagIds } } } }),
		};

		const [palettes, totalCount] = await Promise.all([
			this.prisma.colorPalette.findMany({
				where,
				include: {
					tags: true,
					tokens: {
						orderBy: { order: "asc" },
					},
				},
				take: limit,
				skip: offset,
				orderBy: { createdAt: "desc" },
			}),
			this.prisma.colorPalette.count({ where }),
		]);

		return {
			items: palettes.map((palette) => this.mapToGraphQLType(palette)),
			totalCount,
			nextOffset: offset + palettes.length,
		};
	}

	async findById(id: string): Promise<ColorPalette | null> {
		const palette = await this.prisma.colorPalette.findUnique({
			where: { id },
			include: {
				tokens: {
					orderBy: { order: "asc" },
				},
				tags: true,
			},
		});

		if (!palette) {
			return null;
		}

		return this.mapToGraphQLType(palette);
	}

	async update(
		id: string,
		input: UpdateColorPaletteInput,
	): Promise<ColorPalette> {
		if (input.tokens) {
			const tokensObject = this.arrayToTokensObject(input.tokens);
			this.tokenValidator.validate(tokensObject);
		}

		const palette = await this.prisma.colorPalette.update({
			where: { id },
			data: {
				name: input.name,
				code: input.code,
				tokens: input.tokens
					? {
							deleteMany: {},
							create: input.tokens.map((entry) => ({
								value: entry.token.value ?? "",
								role: entry.token.role ?? entry.key,
								order: this.getRoleOrder(entry.token.role ?? entry.key),
							})),
						}
					: undefined,
				tags: input.tagIds
					? {
							set: input.tagIds.map((id) => ({ id })),
						}
					: undefined,
			},
			include: {
				tokens: true,
				tags: true,
			},
		});

		return this.mapToGraphQLType(palette);
	}

	async delete(id: string): Promise<ColorPalette> {
		const palette = await this.prisma.colorPalette.delete({
			where: { id },
			include: {
				tokens: true,
				tags: true,
			},
		});

		return this.mapToGraphQLType(palette);
	}

	private getRoleOrder(role: string): number {
		const roleHierarchy: Record<string, number> = {
			primary: 0,
			secondary: 10,
			accent: 20,
			success: 30,
			warning: 40,
			error: 50,
			danger: 50,
			info: 60,
			neutral: 70,
			background: 80,
			surface: 85,
			text: 90,
			border: 95,
		};

		return roleHierarchy[role.toLowerCase()] ?? 999;
	}

	private mapToGraphQLType(palette: ColorPaletteWithRelations): ColorPalette {
		return {
			id: palette.id,
			name: palette.name,
			code: palette.code,
			tokens: palette.tokens.map((token) => ({
				value: token.value,
				role: token.role ?? undefined,
				order: token.order ?? undefined,
			})),
			tags: palette.tags,
			createdAt: palette.createdAt,
		};
	}

	private arrayToTokensObject(
		entries: ColorTokenEntryInput[],
	): Record<string, ColorTokenEntryInput["token"]> {
		return entries.reduce(
			(acc, entry) => {
				acc[entry.key] = entry.token;
				return acc;
			},
			{} as Record<string, ColorTokenEntryInput["token"]>,
		);
	}

	private generateCode(
		tokens: Record<string, ColorTokenEntryInput["token"]>,
	): string {
		const firstLetters = Object.values(tokens)
			.map((t) => t.role?.[0]?.toUpperCase() ?? "X")
			.join("");

		const count = Object.keys(tokens).length;

		return `${firstLetters}-C${count}`;
	}
}
