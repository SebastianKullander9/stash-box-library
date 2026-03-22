import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

type SearchVectorTable = "Resource" | "Code" | "ColorPalette";

const JOIN_TABLE_MAP: Record<
	SearchVectorTable,
	{ table: string; ownerCol: string; tagCol: string }
> = {
	Resource: { table: "_ResourceTags", ownerCol: "A", tagCol: "B" },
	Code: { table: "_CodeTags", ownerCol: "A", tagCol: "B" },
	ColorPalette: { table: "_ColorPaletteTags", ownerCol: "A", tagCol: "B" },
};

@Injectable()
export class SearchVectorService {
	constructor(private readonly prisma: PrismaService) {}

	async rebuildTagsVector(table: SearchVectorTable, id: string): Promise<void> {
		const { table: joinTable, ownerCol, tagCol } = JOIN_TABLE_MAP[table];

		await this.prisma.$executeRawUnsafe(
			`
            UPDATE "${table}"
            SET "tagsVector" = (
                SELECT coalesce(to_tsvector('english', string_agg(t.name, ' ')), to_tsvector(''))
                FROM "${joinTable}" jt
                JOIN "Tag" t ON t.id = jt."${tagCol}"
                WHERE jt."${ownerCol}" = $1
            )
            WHERE id = $1
        `,
			id,
		);
	}

	async rebuildTagsVectorForTag(tagId: string): Promise<void> {
		await Promise.all([
			this.rebuildAllConnected("Resource", "_ResourceTags", tagId),
			this.rebuildAllConnected("Code", "_CodeTags", tagId),
			this.rebuildAllConnected("ColorPalette", "_ColorPaletteTags", tagId),
		]);
	}

	private async rebuildAllConnected(
		table: SearchVectorTable,
		joinTable: string,
		tagId: string,
	): Promise<void> {
		const rows = await this.prisma.$queryRawUnsafe<{ id: string }[]>(
			`
            SELECT jt."A" as id
            FROM "${joinTable}" jt
            WHERE jt."B" = $1
        `,
			tagId,
		);

		await Promise.all(rows.map((row) => this.rebuildTagsVector(table, row.id)));
	}
}
