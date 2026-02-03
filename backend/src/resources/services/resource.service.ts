/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { S3Service } from "../../s3/s3.service";
import {
	CreateResourceInput,
	UpdateResourceInput,
} from "../../graphql/inputs/resource.input";
import { ResourceType } from "../../graphql/types/resource.type";
import { ResourcePage } from "../../graphql/types/resourcePage.type";
import { FontService } from "./font-metadata.service";
import opentype from "opentype.js";

interface ResourceQueryOptions {
	categoryId?: string;
	tagIds?: string[];
	limit?: number;
	offset?: number;
}

@Injectable()
export class ResourceService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3Service: S3Service,
		private readonly fontService: FontService,
	) {}

	async findMany(options: ResourceQueryOptions): Promise<ResourcePage> {
		const { categoryId, tagIds, limit = 20, offset = 0 } = options;

		const where = {
			...(categoryId && { categoryId }),
			...(tagIds?.length && { tags: { some: { id: { in: tagIds } } } }),
		};

		const [resources, totalCount] = await Promise.all([
			this.prisma.resource.findMany({
				where,
				include: {
					category: true,
					tags: true,
					user: true,
					files: { include: { fontMetadata: true } },
				},
				take: limit,
				skip: offset,
			}),
			this.prisma.resource.count({ where }),
		]);

		const resourcesWithUrls = await this.attachPresignedUrls(resources);

		return {
			items: resourcesWithUrls,
			totalCount,
			nextOffset: offset + resourcesWithUrls.length,
		};
	}

	async findById(id: string): Promise<ResourceType | null> {
		const resource = await this.prisma.resource.findUnique({
			where: { id },
			include: {
				category: true,
				tags: true,
				user: true,
				files: { include: { fontMetadata: true } },
			},
		});

		if (!resource) return null;

		const [resourceWithUrls] = await this.attachPresignedUrls([resource]);
		return resourceWithUrls;
	}

	async create(
		input: CreateResourceInput,
		userId: string,
	): Promise<ResourceType> {
		const categoryId = await this.resolveCategoryId(
			input.categoryId,
			input.categoryName,
		);
		const tagIds = await this.resolveTagIds(input.tagNames);

		const resource = await this.prisma.resource.create({
			data: {
				title: input.title,
				description: input.description,
				textContent: input.textContent,
				categoryId,
				userId,
				tags: tagIds.length
					? { connect: tagIds.map((id) => ({ id })) }
					: undefined,
				files: input.files?.length ? { create: input.files } : undefined,
			},
			include: { category: true, tags: true, user: true, files: true },
		});

		return resource;
	}

	async update(input: UpdateResourceInput): Promise<ResourceType> {
		const categoryId = await this.resolveCategoryId(
			input.categoryId,
			input.categoryName,
		);
		const tagIds = input.tagNames
			? await this.resolveTagIds(input.tagNames)
			: null;

		return this.prisma.resource.update({
			where: { id: input.id },
			data: {
				title: input.title,
				description: input.description,
				textContent: input.textContent,
				categoryId,
				userId: input.userId,
				tags: tagIds ? { set: tagIds.map((id) => ({ id })) } : undefined,
				files: input.files?.length ? { create: input.files } : undefined,
			},
			include: { category: true, tags: true, user: true, files: true },
		});
	}

	async delete(id: string): Promise<ResourceType> {
		const resource = await this.prisma.resource.findUnique({
			where: { id },
			include: { category: true, tags: true, user: true, files: true },
		});

		if (!resource) {
			throw new NotFoundException(`Resource with ID ${id} not found`);
		}

		const deletedResource = await this.prisma.resource.delete({
			where: { id },
			include: { category: true, tags: true, user: true, files: true },
		});

		this.deleteFilesFromS3(resource.files.map((f) => f.url)).catch((err) =>
			console.error(`Failed to delete S3 files for resource ${id}:`, err),
		);

		return deletedResource;
	}

	async uploadFiles(
		files: Array<{ filename: string; buffer: Buffer; mimetype: string }>,
		fileRole: string,
		resourceId?: string,
	): Promise<ResourceType> {
		const uploadedFiles: Array<{
			url: string;
			fileType: string;
			fileRole: string;
		}> = [];
		const fontMetadataMap: Map<string, { metadata: any; score: number }> =
			new Map();

		for (let i = 0; i < files.length; i++) {
			const { filename, buffer, mimetype } = files[i];
			const mimeType = this.resolveMimeType(filename, mimetype);

			const key = await this.s3Service.uploadFile(filename, buffer, mimeType);

			if (mimeType.startsWith("font/")) {
				const arrayBuffer = buffer.buffer.slice(
					buffer.byteOffset,
					buffer.byteOffset + buffer.byteLength,
				) as ArrayBuffer;

				const font = opentype.parse(arrayBuffer);
				const metadata = this.fontService.parseFont(font);
				const score = this.fontService.scoreFontForThumbnail(font);

				fontMetadataMap.set(key, { metadata, score });
			}

			uploadedFiles.push({
				url: key,
				fileType: mimeType,
				fileRole,
			});
		}

		const resource = resourceId
			? await this.prisma.resource.update({
					where: { id: resourceId },
					data: { files: { create: uploadedFiles } },
					include: {
						files: { include: { fontMetadata: true } },
						category: true,
						tags: true,
						user: true,
					},
				})
			: await this.prisma.resource.create({
					data: {
						title: uploadedFiles[0]?.url || "Untitled",
						files: { create: uploadedFiles },
					},
					include: {
						files: { include: { fontMetadata: true } },
						category: true,
						tags: true,
						user: true,
					},
				});

		let thumbnailKey: string | null = null;

		if (fontMetadataMap.size > 0) {
			thumbnailKey = [...fontMetadataMap.entries()].reduce((best, current) =>
				current[1].score < best[1].score ? current : best,
			)[0];
		}

		for (const file of resource.files) {
			const entry = fontMetadataMap.get(file.url);

			if (entry) {
				await this.prisma.fontMetadata.create({
					data: {
						fileId: file.id,
						resourceId: resource.id,
						...entry.metadata,
						isThumbnailFace: file.url === thumbnailKey,
					},
				});
			}
		}

		const [resourceWithUrls] = await this.attachPresignedUrls([resource]);
		return resourceWithUrls;
	}

	private async resolveCategoryId(
		categoryId?: string,
		categoryName?: string,
	): Promise<string | undefined> {
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

	private async resolveTagIds(tagNames?: string[]): Promise<string[]> {
		if (!tagNames?.length) return [];

		const tagIds: string[] = [];
		for (const name of tagNames) {
			let tag = await this.prisma.tag.findUnique({ where: { name } });
			if (!tag) {
				tag = await this.prisma.tag.create({ data: { name } });
			}
			tagIds.push(tag.id);
		}
		return tagIds;
	}

	private async attachPresignedUrls(resources: any[]): Promise<any[]> {
		const result = await Promise.all(
			resources.map(async (resource) => ({
				...resource,
				files: await Promise.all(
					resource.files.map(async (file: any) => {
						const transformed = {
							...file,
							url: await this.s3Service.getPresignedUrl(file.url, 7000),
						};

						return transformed;
					}),
				),
			})),
		);

		return result;
	}

	private async deleteFilesFromS3(keys: string[]): Promise<void> {
		await Promise.all(keys.map((key) => this.s3Service.deleteFile(key)));
	}

	private resolveMimeType(filename: string, incomingMime: string): string {
		const extensionToMime: Record<string, string> = {
			".ttf": "font/ttf",
			".otf": "font/otf",
			".glb": "model/gltf-binary",
			".gltf": "model/gltf+json",
			".svg": "image/svg+xml",
			".jpg": "image/jpeg",
			".jpeg": "image/jpeg",
			".png": "image/png",
			".html": "text/html",
			".css": "text/css",
			".js": "application/javascript",
			".mjs": "application/javascript",
			".cjs": "application/javascript",
			".ts": "text/typescript",
			".tsx": "text/typescript",
			".json": "application/json",
		};

		const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
		return (
			extensionToMime[extension] || incomingMime || "application/octet-stream"
		);
	}
}
