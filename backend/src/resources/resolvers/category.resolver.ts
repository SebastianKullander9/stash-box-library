import { Resolver, Query, Args } from "@nestjs/graphql";
import { CategoryType } from "src/graphql/types/category.type";
import { PrismaService } from "../../prisma/prisma.service";

@Resolver(() => CategoryType)
export class CategoryResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [CategoryType])
	async categories(): Promise<CategoryType[]> {
		return this.prisma.category.findMany({
			include: {
				resources: {
					include: { tags: true, user: true, category: true },
				},
			},
		});
	}

	@Query(() => CategoryType, { nullable: true })
	async category(@Args("id") id: string): Promise<CategoryType | null> {
		return this.prisma.category.findUnique({
			where: { id },
			include: {
				resources: {
					include: { tags: true, user: true, category: true },
				},
			},
		});
	}
}
