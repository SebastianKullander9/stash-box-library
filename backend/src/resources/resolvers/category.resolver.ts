import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CategoryType } from "../../graphql/types/category.type";
import {
	CreateCategoryInput,
	UpdateCategoryInput,
} from "../../graphql/inputs/category.input";
import { GqlAuthGuard } from "../../auth/guards/graphql-auth";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/roles.decorator";
import { CategoryService } from "../services/category.service";

@Resolver(() => CategoryType)
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}

	@Query(() => [CategoryType])
	async categories(
		@Args("orderBy", { type: () => String, nullable: true })
		orderBy?: "ASC" | "DESC",
	): Promise<CategoryType[]> {
		return this.categoryService.findAll(orderBy);
	}

	@Query(() => CategoryType, { nullable: true })
	async category(
		@Args("id", { nullable: true }) id?: string,
		@Args("name", { nullable: true }) name?: string,
	): Promise<CategoryType | null> {
		return this.categoryService.findOne(id, name);
	}

	@Mutation(() => CategoryType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async createCategory(
		@Args("input") input: CreateCategoryInput,
	): Promise<CategoryType> {
		return this.categoryService.create(input);
	}

	@Mutation(() => CategoryType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async updateCategory(
		@Args("input") input: UpdateCategoryInput,
	): Promise<CategoryType> {
		return this.categoryService.update(input);
	}

	@Mutation(() => CategoryType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async deleteCategory(@Args("id") id: string): Promise<CategoryType> {
		return this.categoryService.delete(id);
	}
}
