import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { ResourceType } from "src/graphql/types/resource.type";
import { PrismaService } from "../../prisma/prisma.service";
import {
	CreateResourceInput,
	UpdateResourceInput,
} from "src/graphql/inputs/resource.input";

@Resolver(() => ResourceType)
export class ResourceResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [ResourceType])
	async resources(): Promise<ResourceType[]> {
		return this.prisma.resource.findMany({
			include: { category: true, tags: true, user: true },
		});
	}

	@Query(() => [ResourceType], { nullable: true })
	async resource(@Args("id") id: string): Promise<ResourceType | null> {
		return this.prisma.resource.findUnique({
			where: { id },
			include: { category: true, tags: true, user: true },
		});
	}

	@Mutation(() => ResourceType)
	async createResource(
		@Args("input") input: CreateResourceInput,
	): Promise<ResourceType> {
		let categoryIdToUse = input.categoryId;

		if (!categoryIdToUse && input.categoryName) {
			const existingCategory = await this.prisma.category.findUnique({
				where: { name: input.categoryName },
			});

			if (!existingCategory) {
				const newCategory = await this.prisma.category.create({
					data: { name: input.categoryName },
				});
				categoryIdToUse = newCategory.id;
			} else {
				categoryIdToUse = existingCategory.id;
			}
		}

		const connectTags = [];
		if (input.tagNames && input.tagNames.length > 0) {
			for (const name of input.tagNames) {
				let tag = await this.prisma.tag.findUnique({ where: { name } });
				if (!tag) {
					tag = await this.prisma.tag.create({ data: { name } });
				}
				connectTags.push({ id: tag.id });
			}
		}

		return this.prisma.resource.create({
			data: {
				title: input.title,
				description: input.description,
				fileUrl: input.fileUrl,
				categoryId: categoryIdToUse,
				userId: input.userId,
				tags: {
					connect: connectTags.length > 0 ? connectTags : undefined,
				},
			},
			include: {
				category: true,
				tags: true,
				user: true,
			},
		});
	}

	@Mutation(() => ResourceType)
	async updateResource(
		@Args("input") input: UpdateResourceInput,
	): Promise<ResourceType> {
		let categoryIdToUse = input.categoryId;

		if (!categoryIdToUse && input.categoryName) {
			const existingCategory = await this.prisma.category.findUnique({
				where: { name: input.categoryName },
			});

			if (existingCategory) {
				categoryIdToUse = existingCategory.id;
			} else {
				const newCategory = await this.prisma.category.create({
					data: { name: input.categoryName },
				});
				categoryIdToUse = newCategory.id;
			}
		}

		const tagsToConnect: { id: string }[] = [];
		if (input.tagNames && input.tagNames.length > 0) {
			for (const tagName of input.tagNames) {
				let tag = await this.prisma.tag.findUnique({
					where: { name: tagName },
				});
				if (!tag) {
					tag = await this.prisma.tag.create({ data: { name: tagName } });
				}
				tagsToConnect.push({ id: tag.id });
			}
		}

		return this.prisma.resource.update({
			where: { id: input.id },
			data: {
				title: input.title,
				description: input.description,
				fileUrl: input.fileUrl,
				categoryId: categoryIdToUse,
				userId: input.userId,
				tags: input.tagNames ? { set: tagsToConnect } : undefined,
			},
			include: {
				category: true,
				tags: true,
				user: true,
			},
		});
	}
}
