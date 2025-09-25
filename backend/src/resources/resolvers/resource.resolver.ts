import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { ResourceType } from "src/graphql/types/resource.type";
import { PrismaService } from "../../prisma/prisma.service";
import {
	CreateResourceInput,
	UpdateResourceInput,
} from "src/graphql/inputs/resource.input";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user.decorator";
import { GqlAuthGuard } from "src/auth/guards/graphql-auth";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { S3Service } from "src/s3/s3.service";
import GraphQLUpload, { FileUpload } from "graphql-upload/GraphQLUpload.mjs";

interface CurrentUserType {
	userId: string;
	email: string;
	role: string;
}

@Resolver(() => ResourceType)
export class ResourceResolver {
	constructor(
		private prisma: PrismaService,
		private s3Service: S3Service,
	) {}

	@Query(() => [ResourceType])
	async resources(
		@Args("categoryId", { nullable: true }) categoryId?: string,
		@Args("tagIds", { type: () => [String], nullable: true }) tagIds?: string[],
	): Promise<ResourceType[]> {
		return this.prisma.resource.findMany({
			where: {
				...(categoryId ? { categoryId } : {}),
				...(tagIds && tagIds.length > 0
					? {
							tags: {
								some: { id: { in: tagIds } },
							},
						}
					: {}),
			},
			include: { category: true, tags: true, user: true, files: true },
		});
	}

	@Query(() => ResourceType, { nullable: true })
	async resource(@Args("id") id: string): Promise<ResourceType | null> {
		return this.prisma.resource.findUnique({
			where: { id },
			include: { category: true, tags: true, user: true, files: true },
		});
	}

	@Mutation(() => ResourceType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async createResource(
		@Args("input") input: CreateResourceInput,
		@CurrentUser() user: CurrentUserType,
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

		const resource = await this.prisma.resource.create({
			data: {
				title: input.title,
				description: input.description,
				textContent: input.textContent,
				categoryId: categoryIdToUse,
				userId: user.userId,
				tags: connectTags.length > 0 ? { connect: connectTags } : undefined,
				files: input.files?.length
					? {
							create: input.files.map((f) => ({
								url: f.url,
								fileType: f.fileType,
								fileRole: f.fileRole,
							})),
						}
					: undefined,
			},
			include: {
				category: true,
				tags: true,
				user: true,
				files: true,
			},
		});

		return resource;
	}

	@Mutation(() => ResourceType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
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
				textContent: input.textContent,
				categoryId: categoryIdToUse,
				userId: input.userId,
				tags: input.tagNames ? { set: tagsToConnect } : undefined,
				files: input.files?.length
					? {
							create: input.files.map((f) => ({
								url: f.url,
								fileType: f.fileType,
								fileRole: f.fileRole,
							})),
						}
					: undefined,
			},
			include: { category: true, tags: true, user: true, files: true },
		});
	}

	@Mutation(() => ResourceType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async deleteResource(@Args("id") id: string): Promise<ResourceType> {
		return this.prisma.resource.delete({
			where: { id },
			include: { category: true, tags: true, user: true, files: true },
		});
	}

	/* eslint-disable @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-call,
    @typescript-eslint/no-unsafe-argument */
	@Mutation(() => ResourceType)
	async uploadFiles(
		@Args({ name: "files", type: () => [GraphQLUpload] })
		files: Promise<FileUpload>[],
		@Args("fileRole", { type: () => String }) fileRole: string,
		@Args("resourceId", { nullable: true }) resourceId?: string,
	) {
		const uploadedFiles = [];

		for (const filePromise of files) {
			const file: FileUpload = await filePromise;
			const { createReadStream, filename, mimetype } = file;
			const buffer = await this.streamToBuffer(createReadStream());
			const key = await this.s3Service.uploadFile(filename, buffer, mimetype);
			uploadedFiles.push({ url: key, fileType: mimetype, fileRole });
		}

		let resource;
		if (!resourceId) {
			resource = await this.prisma.resource.create({
				data: {
					title: uploadedFiles[0]?.url || "Untitled",
					files: { create: uploadedFiles },
				},
				include: { files: true, category: true, tags: true, user: true },
			});
		} else {
			resource = await this.prisma.resource.update({
				where: { id: resourceId },
				data: { files: { create: uploadedFiles } },
				include: { files: true, category: true, tags: true, user: true },
			});
		}

		const filesWithUrls = await Promise.all(
			resource.files.map(async (f) => ({
				fileType: f.fileType,
				url: await this.s3Service.getPresignedUrl(f.url, 7000),
			})),
		);

		return { ...resource, files: filesWithUrls };
	}
	/* eslint-enable @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-call,
    @typescript-eslint/no-unsafe-argument */

	private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
		const chunks = [];
		for await (const chunk of stream) {
			chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
		}
		return Buffer.concat(chunks);
	}
}
