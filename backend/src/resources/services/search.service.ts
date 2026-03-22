import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

export interface SearchResult {
	id: string;
	title: string;
	type: "resource" | "code" | "colorPalette";
	categoryId: string | null;
	rank: number;
}

@Injectable()
export class SearchService {
	constructor(private readonly prisma: PrismaService) {}

	async search(query: string): Promise<SearchResult[]> {
		const [resources, codes, palettes] = await Promise.all([
			this.searchResources(query),
			this.searchCodes(query),
			this.searchPalettes(query),
		]);

		return [...resources, ...codes, ...palettes].sort(
			(a, b) => b.rank - a.rank,
		);
	}

	private async searchResources(query: string): Promise<SearchResult[]> {
		return this.prisma.$queryRaw<SearchResult[]>`
            SELECT
                id,
                title,
                'resource' as type,
                "categoryId",
                ts_rank(
                    coalesce("searchVector", to_tsvector('')) || coalesce("tagsVector", to_tsvector('')),
                    plainto_tsquery('english', ${query})
                ) as rank
            FROM "Resource"
            WHERE
                coalesce("searchVector", to_tsvector('')) || coalesce("tagsVector", to_tsvector(''))
                @@ plainto_tsquery('english', ${query})
            ORDER BY rank DESC
        `;
	}

	private async searchCodes(query: string): Promise<SearchResult[]> {
		return this.prisma.$queryRaw<SearchResult[]>`
            SELECT
                id,
                title,
                'code' as type,
                "categoryId",
                ts_rank(
                    coalesce("searchVector", to_tsvector('')) || coalesce("tagsVector", to_tsvector('')),
                    plainto_tsquery('english', ${query})
                ) as rank
            FROM "Code"
            WHERE
                coalesce("searchVector", to_tsvector('')) || coalesce("tagsVector", to_tsvector(''))
                @@ plainto_tsquery('english', ${query})
            ORDER BY rank DESC
        `;
	}

	private async searchPalettes(query: string): Promise<SearchResult[]> {
		return this.prisma.$queryRaw<SearchResult[]>`
            SELECT
                id,
                name as title,
                'colorPalette' as type,
                "categoryId",
                ts_rank(
                    coalesce("searchVector", to_tsvector('')) || coalesce("tagsVector", to_tsvector('')),
                    plainto_tsquery('english', ${query})
                ) as rank
            FROM "ColorPalette"
            WHERE
                coalesce("searchVector", to_tsvector('')) || coalesce("tagsVector", to_tsvector(''))
                @@ plainto_tsquery('english', ${query})
            ORDER BY rank DESC
        `;
	}
}
