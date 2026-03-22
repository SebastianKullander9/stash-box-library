import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

export interface SearchResult {
	id: string;
	title: string;
	description: string;
	type: "resource" | "code" | "colorPalette";
	categoryName: string | null;
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
                r.id,
                r.title,
				r.description,
                'resource' as type,
                c.name as "categoryName",
                ts_rank(
                    coalesce(r."searchVector", to_tsvector('')) || coalesce(r."tagsVector", to_tsvector('')),
                    plainto_tsquery('english', ${query})
                ) as rank
            FROM "Resource" r
            LEFT JOIN "Category" c ON c.id = r."categoryId"
            WHERE
                coalesce(r."searchVector", to_tsvector('')) || coalesce(r."tagsVector", to_tsvector(''))
                @@ plainto_tsquery('english', ${query})
            ORDER BY rank DESC
        `;
	}

	private async searchCodes(query: string): Promise<SearchResult[]> {
		return this.prisma.$queryRaw<SearchResult[]>`
            SELECT
                r.id,
                r.title,
				r.description,
                'code' as type,
                c.name as "categoryName",
                ts_rank(
                    coalesce(r."searchVector", to_tsvector('')) || coalesce(r."tagsVector", to_tsvector('')),
                    plainto_tsquery('english', ${query})
                ) as rank
            FROM "Code" r
            LEFT JOIN "Category" c ON c.id = r."categoryId"
            WHERE
                coalesce(r."searchVector", to_tsvector('')) || coalesce(r."tagsVector", to_tsvector(''))
                @@ plainto_tsquery('english', ${query})
            ORDER BY rank DESC
        `;
	}

	private async searchPalettes(query: string): Promise<SearchResult[]> {
		return this.prisma.$queryRaw<SearchResult[]>`
            SELECT
                r.id,
                r.name as title,
				r.code as description,
                'colorPalette' as type,
                c.name as "categoryName",
                ts_rank(
                    coalesce(r."searchVector", to_tsvector('')) || coalesce(r."tagsVector", to_tsvector('')),
                    plainto_tsquery('english', ${query})
                ) as rank
            FROM "ColorPalette" r
            LEFT JOIN "Category" c ON c.id = r."categoryId"
            WHERE
                coalesce(r."searchVector", to_tsvector('')) || coalesce(r."tagsVector", to_tsvector(''))
                @@ plainto_tsquery('english', ${query})
            ORDER BY rank DESC
        `;
	}
}
