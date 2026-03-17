import { Injectable } from "@nestjs/common";
import {
	CreateCodeInput,
	UpdateCodeInput,
} from "src/graphql/inputs/code.input";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoryLookupService } from "./category-lookup.service";
import { Code } from "src/graphql/types/code.type";
import {
	Code as PrismaCode,
	CodeFile as PrismaCodeFile,
	CodeVersion as PrismaCodeVersion,
	CodeSnapshot as PrismaCodeSnapshot,
	DeletedFile as PrismaDeletedFile,
	Tag as PrismaTag,
} from "@prisma/client";
import { CodePage } from "src/graphql/types/code.type";

type CodeWithRelations = PrismaCode & {
	tags: PrismaTag[];
	codeFiles: (PrismaCodeFile & {
		codeVersions: PrismaCodeVersion[];
	})[];
	snapshots: (PrismaCodeSnapshot & {
		fileVersions: PrismaCodeVersion[];
		addedFiles: PrismaCodeFile[];
		deletedFiles: PrismaDeletedFile[];
	})[];
};

export interface CodeQueryOptions {
	tagIds?: string[];
	limit?: number;
	offset?: number;
}

@Injectable()
export class CodeService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly categoryLookup: CategoryLookupService,
	) {}

	async create(input: CreateCodeInput): Promise<Code> {
		const categoryId = await this.categoryLookup.resolveId(
			undefined,
			input.categoryName,
		);

		const code = await this.prisma.code.create({
			data: {
				title: input.title,
				description: input.description ?? null,
				category: categoryId ? { connect: { id: categoryId } } : undefined,
				codeFiles: {
					create: input.codeFiles.map((file) => ({
						title: file.title,
						language: file.language,
						content: file.content,
					})),
				},
				tags: input.tagIds
					? { connect: input.tagIds.map((id) => ({ id })) }
					: undefined,
			},
			include: {
				tags: true,
				codeFiles: { include: { codeVersions: true } },
				snapshots: {
					include: {
						fileVersions: true,
						addedFiles: true,
						deletedFiles: true,
					},
				},
			},
		});

		return this.mapToGraphQLType(code);
	}

	async update(id: string, input: UpdateCodeInput): Promise<Code> {
		const currentFiles = input.codeFiles?.filter((file) => file.id)
			? await this.prisma.codeFile.findMany({
					where: {
						id: {
							in: input.codeFiles
								.filter((file) => file.id)
								.map((file) => file.id!),
						},
					},
					select: { id: true, content: true },
				})
			: [];

		const hasChanged = (fileId: string, newContent: string) => {
			const current = currentFiles.find((file) => file.id === fileId);
			return !current || current.content !== newContent;
		};

		const versionCounts = input.codeFiles
			? await Promise.all(
					input.codeFiles
						.filter(
							(file) =>
								file.id && file.content && hasChanged(file.id, file.content),
						)
						.map(async (file) => ({
							fileId: file.id!,
							count: await this.prisma.codeVersion.count({
								where: { codeFileId: file.id! },
							}),
						})),
				)
			: [];

		const deletedFileTitles = input.deletedFileIds?.length
			? await this.prisma.codeFile.findMany({
					where: { id: { in: input.deletedFileIds } },
					select: { id: true, title: true, language: true },
				})
			: [];

		const getNextVersion = (fileId: string) => {
			const entry = versionCounts.find((version) => version.fileId === fileId);
			return (entry?.count ?? 0) + 1;
		};

		const code = await this.prisma.code.update({
			where: { id },
			data: {
				title: input.title,
				description: input.description ?? null,
				tags: input.tagIds
					? { set: input.tagIds.map((id) => ({ id })) }
					: undefined,
				codeFiles: {
					...(input.deletedFileIds?.length && {
						delete: input.deletedFileIds.map((id) => ({ id })),
					}),
					...(input.codeFiles?.length && {
						upsert: input.codeFiles.map((file) => {
							return {
								where: { id: file.id ?? "" },
								update: {
									title: file.title,
									language: file.language,
									content: file.content,
									...(file.content &&
										file.id &&
										hasChanged(file.id, file.content) && {
											codeVersions: {
												create: [
													{
														content: file.content,
														versionNumber: getNextVersion(file.id),
													},
												],
											},
										}),
								},
								create: {
									title: file.title ?? "",
									language: file.language ?? "",
									content: file.content ?? "",
								},
							};
						}),
					}),
				},
			},
			include: {
				tags: true,
				codeFiles: {
					include: {
						codeVersions: {
							orderBy: { createdAt: "asc" },
						},
					},
				},
				snapshots: {
					include: {
						fileVersions: true,
						addedFiles: true,
						deletedFiles: true,
					},
				},
			},
		});

		const existingFileIds = new Set(
			input.codeFiles?.filter((f) => f.id).map((f) => f.id!) ?? [],
		);
		const newFiles = code.codeFiles.filter((f) => !existingFileIds.has(f.id));

		const changedFileIds = new Set(
			input.codeFiles
				?.filter((f) => f.id && f.content && hasChanged(f.id, f.content))
				.map((f) => f.id!) ?? [],
		);

		const changedFileVersions = code.codeFiles
			.filter((file) => changedFileIds.has(file.id))
			.flatMap((file) => file.codeVersions.slice(-1));

		await this.prisma.codeSnapshot.create({
			data: {
				message: input.versionMessage || "No change message was provided.",
				code: { connect: { id } },
				fileVersions: {
					connect: changedFileVersions.map((v) => ({ id: v.id })),
				},
				addedFiles: newFiles.length
					? { connect: newFiles.map((f) => ({ id: f.id })) }
					: undefined,
				deletedFiles: deletedFileTitles.length
					? {
							create: deletedFileTitles.map((file) => ({
								title: file.title,
								language: file.language,
							})),
						}
					: undefined,
			},
		});

		return this.mapToGraphQLType(code);
	}

	async findMany(options: CodeQueryOptions): Promise<CodePage> {
		const { tagIds, limit = 20, offset = 0 } = options;

		const where = {
			...(tagIds?.length && { tags: { some: { id: { in: tagIds } } } }),
		};

		const [codes, totalCount] = await Promise.all([
			this.prisma.code.findMany({
				where,
				include: {
					tags: true,
					codeFiles: {
						include: {
							codeVersions: { orderBy: { createdAt: "asc" } },
						},
					},
					snapshots: {
						include: {
							fileVersions: true,
							addedFiles: true,
							deletedFiles: true,
						},
						orderBy: { createdAt: "desc" },
					},
				},
				take: limit,
				skip: offset,
				orderBy: { createdAt: "desc" },
			}),
			this.prisma.code.count({ where }),
		]);

		return {
			items: codes.map((code) => this.mapToGraphQLType(code)),
			totalCount,
			nextOffset: offset + codes.length,
		};
	}

	async findById(id: string): Promise<Code | null> {
		const code = await this.prisma.code.findUnique({
			where: { id },
			include: {
				tags: true,
				codeFiles: {
					include: {
						codeVersions: { orderBy: { createdAt: "asc" } },
					},
				},
				snapshots: {
					include: {
						fileVersions: true,
						addedFiles: true,
						deletedFiles: true,
					},
					orderBy: { createdAt: "desc" },
				},
			},
		});

		if (!code) return null;

		return this.mapToGraphQLType(code);
	}

	async delete(id: string): Promise<Code> {
		const code = await this.prisma.code.delete({
			where: { id },
			include: {
				tags: true,
				codeFiles: {
					include: {
						codeVersions: { orderBy: { createdAt: "asc" } },
					},
				},
				snapshots: {
					include: {
						fileVersions: true,
						addedFiles: true,
						deletedFiles: true,
					},
				},
			},
		});

		return this.mapToGraphQLType(code);
	}

	private mapToGraphQLType(code: CodeWithRelations): Code {
		return {
			id: code.id,
			title: code.title,
			description: code.description ?? undefined,
			tags: code.tags,
			codeFiles: code.codeFiles.map((file) => ({
				id: file.id,
				title: file.title,
				language: file.language,
				content: file.content,
				codeVersions: file.codeVersions.map((version) => ({
					id: version.id,
					content: version.content,
					versionNumber: version.versionNumber,
					createdAt: version.createdAt,
				})),
				createdAt: file.createdAt,
				updatedAt: file.updatedAt,
			})),
			snapshots: code.snapshots.map((snapshot) => ({
				id: snapshot.id,
				message: snapshot.message,
				fileVersions: snapshot.fileVersions.map((version) => ({
					id: version.id,
					content: version.content,
					versionNumber: version.versionNumber,
					createdAt: version.createdAt,
				})),
				addedFiles: snapshot.addedFiles.map((file) => ({
					id: file.id,
					title: file.title,
					language: file.language,
					content: file.content,
					codeVersions: [],
					createdAt: file.createdAt,
					updatedAt: file.updatedAt,
				})),
				deletedFiles: snapshot.deletedFiles.map((file) => ({
					id: file.id,
					title: file.title,
					language: file.language,
					createdAt: file.createdAt,
				})),
				createdAt: snapshot.createdAt,
			})),
			createdAt: code.createdAt,
			updatedAt: code.updatedAt,
		};
	}
}
