import { Injectable } from "@nestjs/common";
import {
	CreateCodeInput,
	UpdateCodeInput,
} from "src/graphql/inputs/code.input";
import { PrismaService } from "src/prisma/prisma.service";
import { Code } from "src/graphql/types/code.type";
import {
	Code as PrismaCode,
	CodeFile as PrismaCodeFile,
	CodeVersion as PrismaCodeVersion,
	Tag as PrismaTag,
} from "@prisma/client";

import { CodePage } from "src/graphql/types/code.type";

type CodeWithRelations = PrismaCode & {
	tags: PrismaTag[];
	codeFiles: (PrismaCodeFile & {
		codeVersions: PrismaCodeVersion[];
	})[];
};
export interface CodeQueryOptions {
	tagIds?: string[];
	limit?: number;
	offset?: number;
}

@Injectable()
export class CodeService {
	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateCodeInput): Promise<Code> {
		const code = await this.prisma.code.create({
			data: {
				title: input.title,
				description: input.description ?? null,
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
				codeFiles: {
					include: { codeVersions: true },
				},
			},
		});

		return this.mapToGraphQLType(code);
	}

	async update(id: string, input: UpdateCodeInput): Promise<Code> {
		const code = await this.prisma.code.update({
			where: { id },
			data: {
				title: input.title,
				description: input.description ?? null,
				tags: input.tagIds
					? { set: input.tagIds.map((id) => ({ id })) }
					: undefined,
				codeFiles: input.codeFiles
					? {
							upsert: input.codeFiles.map((file) => ({
								where: { id: file.id ?? "" },
								update: {
									title: file.title,
									language: file.language,
									content: file.content,
									...(file.content && {
										codeVersions: {
											create: [{ content: file.content }],
										},
									}),
								},
								create: {
									title: file.title ?? "",
									language: file.language ?? "",
									content: file.content ?? "",
								},
							})),
						}
					: undefined,
			},
			include: {
				tags: true,
				codeFiles: { include: { codeVersions: true } },
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
					codeFiles: { include: { codeVersions: true } },
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
				codeFiles: { include: { codeVersions: true } },
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
				codeFiles: { include: { codeVersions: true } },
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
					createdAt: version.createdAt,
				})),
				createdAt: file.createdAt,
				updatedAt: file.updatedAt,
			})),
			createdAt: code.createdAt,
			updatedAt: code.updatedAt,
		};
	}
}
