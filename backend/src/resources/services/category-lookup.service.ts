import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryLookupService {
	constructor(private readonly prisma: PrismaService) {}

	async resolveId(categoryId?: string, categoryName?: string) {
		if (categoryId) return categoryId;
		if (!categoryName) return undefined;

		const existing = await this.prisma.category.findUnique({
			where: { name: categoryName },
		});

		if (existing) return existing.id;

		const newCategory = await this.prisma.category.create({
			data: { name: categoryName },
		});

		return newCategory.id;
	}
}
