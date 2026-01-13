/* eslint-disable prettier/prettier */
import {
	Injectable,
	NotFoundException,
	ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
	CreateTagInput,
	UpdateTagInput,
} from "../../graphql/inputs/tag.input";
import { TagType } from "../../graphql/types/tag.type";

const FULL_RESOURCE_INCLUDE = {
	category: true,
	tags: true,
	user: true,
	files: true,
} as const;

type OrderDirection = "ASC" | "DESC";

@Injectable()
export class TagService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(orderBy: OrderDirection = "DESC"): Promise<TagType[]> {
		return this.prisma.tag.findMany({
			orderBy: {
				createdAt: orderBy.toLowerCase() as "asc" | "desc",
			},
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async findById(id: string): Promise<TagType | null> {
		return this.prisma.tag.findUnique({
			where: { id },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async findByName(name: string): Promise<TagType | null> {
		return this.prisma.tag.findUnique({
			where: { name },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async create(input: CreateTagInput): Promise<TagType> {
		const existingTag = await this.prisma.tag.findUnique({
			where: { name: input.name },
		});

		if (existingTag) {
			throw new ConflictException(
				`Tag with name "${input.name}" already exists`,
			);
		}

		return this.prisma.tag.create({
			data: { name: input.name },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async update(input: UpdateTagInput): Promise<TagType> {
		const existingTag = await this.prisma.tag.findUnique({
			where: { id: input.id },
		});

		if (!existingTag) {
			throw new NotFoundException(`Tag with ID ${input.id} not found`);
		}

		// Check if new name conflicts with another tag
		if (input.name && input.name !== existingTag.name) {
			const nameConflict = await this.prisma.tag.findUnique({
				where: { name: input.name },
			});

			if (nameConflict) {
				throw new ConflictException(
					`Tag with name "${input.name}" already exists`,
				);
			}
		}

		return this.prisma.tag.update({
			where: { id: input.id },
			data: { name: input.name },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async delete(id: string): Promise<TagType> {
		const tag = await this.prisma.tag.findUnique({
			where: { id },
			include: {
				resources: true,
			},
		});

		if (!tag) {
			throw new NotFoundException(`Tag with ID ${id} not found`);
		}

		return this.prisma.tag.delete({
			where: { id },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async findPopular(limit: number = 10): Promise<Array<TagType & { resourceCount: number }>> {
		const tags = await this.prisma.tag.findMany({
			include: {
				_count: {
					select: { resources: true }
				}
			},
			orderBy: {
				resources: {
					_count: "desc"
				}
			},
			take: limit,
		});

		return tags.map(tag => ({
			...tag,
			resourceCount: tag._count.resources,
		}));
	}
}
