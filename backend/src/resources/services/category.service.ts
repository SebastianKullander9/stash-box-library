import {
	Injectable,
	NotFoundException,
	ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
	CreateCategoryInput,
	UpdateCategoryInput,
} from "../../graphql/inputs/category.input";
import { CategoryType } from "../../graphql/types/category.type";

const FULL_RESOURCE_INCLUDE = {
	category: true,
	tags: true,
	user: true,
	files: true,
} as const;

type OrderDirection = "ASC" | "DESC";

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(orderBy: OrderDirection = "DESC"): Promise<CategoryType[]> {
		return this.prisma.category.findMany({
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
			orderBy: {
				createdAt: orderBy.toLowerCase() as "asc" | "desc",
			},
		});
	}

	async findOne(id?: string, name?: string): Promise<CategoryType | null> {
		if (!id && !name) {
			return null;
		}

		return this.prisma.category.findUnique({
			where: id ? { id } : { name },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async create(input: CreateCategoryInput): Promise<CategoryType> {
		const existingCategory = await this.prisma.category.findUnique({
			where: { name: input.name },
		});

		if (existingCategory) {
			throw new ConflictException(
				`Category with name "${input.name}" already exists`,
			);
		}

		return this.prisma.category.create({
			data: { name: input.name },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async update(input: UpdateCategoryInput): Promise<CategoryType> {
		const existingCategory = await this.prisma.category.findUnique({
			where: { id: input.id },
		});

		if (!existingCategory) {
			throw new NotFoundException(`Category with ID ${input.id} not found`);
		}

		if (input.name && input.name !== existingCategory.name) {
			const nameConflict = await this.prisma.category.findUnique({
				where: { name: input.name },
			});

			if (nameConflict) {
				throw new ConflictException(
					`Category with name "${input.name}" already exists`,
				);
			}
		}

		return this.prisma.category.update({
			where: { id: input.id },
			data: { name: input.name },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async delete(id: string): Promise<CategoryType> {
		const category = await this.prisma.category.findUnique({
			where: { id },
			include: {
				resources: true,
			},
		});

		if (!category) {
			throw new NotFoundException(`Category with ID ${id} not found`);
		}

		return this.prisma.category.delete({
			where: { id },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}
}
