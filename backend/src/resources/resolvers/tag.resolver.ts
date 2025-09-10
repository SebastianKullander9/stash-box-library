import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TagType } from "src/graphql/types/tag.type";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTagInput, UpdateTagInput } from "src/graphql/inputs/tag.input";
import { GqlAuthGuard } from "src/auth/guards/graphql-auth";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { UseGuards } from "@nestjs/common";

@Resolver(() => TagType)
export class TagResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [TagType])
	async tags(): Promise<TagType[]> {
		return this.prisma.tag.findMany({
			include: {
				resources: {
					include: { category: true, tags: true, user: true },
				},
			},
		});
	}

	@Query(() => TagType, { nullable: true })
	async tag(@Args("id") id: string): Promise<TagType | null> {
		return this.prisma.tag.findUnique({
			where: { id },
			include: {
				resources: {
					include: { category: true, tags: true, user: true },
				},
			},
		});
	}

	@Mutation(() => TagType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async createTag(@Args("input") input: CreateTagInput): Promise<TagType> {
		const existingTag = await this.prisma.tag.findUnique({
			where: { name: input.name },
		});

		if (existingTag) {
			throw new Error(`Tag with name "${input.name}" already exists.`);
		}

		return this.prisma.tag.create({
			data: { name: input.name },
			include: {
				resources: { include: { category: true, tags: true, user: true } },
			},
		});
	}

	@Mutation(() => TagType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async updateTag(@Args("input") input: UpdateTagInput): Promise<TagType> {
		if (input.name) {
			const existingTag = await this.prisma.tag.findUnique({
				where: { name: input.name },
			});

			if (existingTag && existingTag.id !== input.id) {
				throw new Error(`Tag with name "${input.name}" already exists.`);
			}
		}

		return this.prisma.tag.update({
			where: { id: input.id },
			data: { name: input.name },
			include: {
				resources: { include: { category: true, tags: true, user: true } },
			},
		});
	}

	@Mutation(() => TagType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async deleteTag(@Args("id") id: string): Promise<TagType> {
		return this.prisma.tag.delete({
			where: { id },
			include: {
				resources: { include: { category: true, tags: true, user: true } },
			},
		});
	}
}
