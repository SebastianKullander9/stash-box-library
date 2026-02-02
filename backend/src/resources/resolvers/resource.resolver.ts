import { Resolver, Mutation, Query, Args, Int } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { ResourceType } from "../../graphql/types/resource.type";
import { ResourcePage } from "../../graphql/types/resourcePage.type";
import {
	CreateResourceInput,
	UpdateResourceInput,
} from "../../graphql/inputs/resource.input";
import { CurrentUser } from "../../auth/current-user.decorator";
import { GqlAuthGuard } from "../../auth/guards/graphql-auth";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/roles.decorator";
import { ResourceService } from "../services/resource.service";
import { FileUploadService } from "../services/file-upload.service";
import GraphQLUpload, { FileUpload } from "graphql-upload/GraphQLUpload.mjs";

interface CurrentUserType {
	userId: string;
	email: string;
	role: string;
}

@Resolver(() => ResourceType)
export class ResourceResolver {
	constructor(
		private readonly resourceService: ResourceService,
		private readonly fileUploadService: FileUploadService,
	) {}

	@Query(() => ResourcePage)
	async resources(
		@Args("categoryId", { nullable: true }) categoryId?: string,
		@Args("tagIds", { type: () => [String], nullable: true }) tagIds?: string[],
		@Args("limit", { type: () => Int, nullable: true }) limit = 20,
		@Args("offset", { type: () => Int, nullable: true }) offset = 0,
	): Promise<ResourcePage> {
		return this.resourceService.findMany({
			categoryId,
			tagIds,
			limit,
			offset,
		});
	}

	@Query(() => ResourceType, { nullable: true })
	async resource(@Args("id") id: string): Promise<ResourceType | null> {
		return this.resourceService.findById(id);
	}

	@Mutation(() => ResourceType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async createResource(
		@Args("input") input: CreateResourceInput,
		@CurrentUser() user: CurrentUserType,
	): Promise<ResourceType> {
		return this.resourceService.create(input, user.userId);
	}

	@Mutation(() => ResourceType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async updateResource(
		@Args("input") input: UpdateResourceInput,
	): Promise<ResourceType> {
		return this.resourceService.update(input);
	}

	@Mutation(() => ResourceType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async deleteResource(@Args("id") id: string): Promise<ResourceType> {
		return this.resourceService.delete(id);
	}

	@Mutation(() => ResourceType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async uploadFiles(
		@Args({ name: "files", type: () => [GraphQLUpload] })
		files: Promise<FileUpload>[],
		@Args("fileRole", { type: () => String }) fileRole: string,
		@Args("resourceId", { nullable: true }) resourceId?: string,
	): Promise<ResourceType> {
		const processedFiles = await this.fileUploadService.processUploads(files);
		return this.resourceService.uploadFiles(
			processedFiles,
			fileRole,
			resourceId,
		);
	}
}
