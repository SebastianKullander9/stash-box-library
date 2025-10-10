import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CategoryType } from "src/graphql/types/category.type";
import { PrismaService } from "../../prisma/prisma.service";
import {
	CreateCategoryInput,
	UpdateCategoryInput,
} from "src/graphql/inputs/category.input";
import { GqlAuthGuard } from "src/auth/guards/graphql-auth";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { UseGuards } from "@nestjs/common";

@Resolver(() => CategoryType)
export class CategoryResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [CategoryType])
	async categories(
		@Args('orderBy', { type: () => String, nullable: true }) orderBy?: 'ASC' | 'DESC'
	): Promise<CategoryType[]> {
		return this.prisma.category.findMany({
			include: {
				resources: {
					include: { tags: true, user: true, category: true },
				},
			},
				orderBy: {
					createdAt: (orderBy || "DESC").toLowerCase() as "asc" | "desc",
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

	@Mutation(() => CategoryType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async createCategory(
		@Args("input") input: CreateCategoryInput,
	): Promise<CategoryType> {
		const existingCategory = await this.prisma.category.findUnique({
			where: { name: input.name },
		});

		if (existingCategory) {
			throw new Error(`Category with name "${input.name}" already exists.`);
		}

		return this.prisma.category.create({
			data: { name: input.name },
			include: {
				resources: {
					include: { category: true, tags: true, user: true },
				},
			},
		});
	}

	@Mutation(() => CategoryType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async updateCategory(
		@Args("input") input: UpdateCategoryInput,
	): Promise<CategoryType> {
		if (input.name) {
			const existingCategory = await this.prisma.category.findUnique({
				where: { name: input.name },
			});

			if (existingCategory && existingCategory.id !== input.id) {
				throw new Error(`Category with name "${input.name}" already exists.`);
			}
		}

		return this.prisma.category.update({
			where: { id: input.id },
			data: { name: input.name },
			include: {
				resources: {
					include: { category: true, tags: true, user: true },
				},
			},
		});
	}

	@Mutation(() => CategoryType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async deleteCategory(@Args("id") id: string): Promise<CategoryType> {
		return this.prisma.category.delete({
			where: { id },
			include: {
				resources: {
					include: { category: true, tags: true, user: true },
				},
			},
		});
	}
}
