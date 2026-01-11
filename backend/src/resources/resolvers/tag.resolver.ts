import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { TagType } from "../../graphql/types/tag.type";
import { CreateTagInput, UpdateTagInput } from "../../graphql/inputs/tag.input";
import { GqlAuthGuard } from "../../auth/guards/graphql-auth";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/roles.decorator";
import { TagService } from "../services/tag.service";

@Resolver(() => TagType)
export class TagResolver {
	constructor(private readonly tagService: TagService) {}

	@Query(() => [TagType])
	async tags(
		@Args("orderBy", { type: () => String, nullable: true })
		orderBy?: "ASC" | "DESC",
	): Promise<TagType[]> {
		return this.tagService.findAll(orderBy);
	}

	@Query(() => TagType, { nullable: true })
	async tag(@Args("id") id: string): Promise<TagType | null> {
		return this.tagService.findById(id);
	}

	@Mutation(() => TagType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async createTag(@Args("input") input: CreateTagInput): Promise<TagType> {
		return this.tagService.create(input);
	}

	@Mutation(() => TagType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async updateTag(@Args("input") input: UpdateTagInput): Promise<TagType> {
		return this.tagService.update(input);
	}

	@Mutation(() => TagType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async deleteTag(@Args("id") id: string): Promise<TagType> {
		return this.tagService.delete(id);
	}
}
