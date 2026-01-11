import {
	Injectable,
	NotFoundException,
	ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
	CreateUserInput,
	UpdateUserInput,
} from "../../graphql/inputs/user.input";
import { UserType } from "../../graphql/types/user.type";
import * as bcrypt from "bcrypt";

const FULL_RESOURCE_INCLUDE = {
	category: true,
	tags: true,
	user: true,
	files: true,
} as const;

@Injectable()
export class UserService {
	private readonly SALT_ROUNDS = 10;

	constructor(private readonly prisma: PrismaService) {}

	async findAll(): Promise<UserType[]> {
		return this.prisma.user.findMany({
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async findById(id: string): Promise<UserType | null> {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async findByEmail(email: string): Promise<UserType | null> {
		return this.prisma.user.findUnique({
			where: { email },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async create(input: CreateUserInput): Promise<UserType> {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: input.email },
		});

		if (existingUser) {
			throw new ConflictException(
				`User with email ${input.email} already exists`,
			);
		}

		const hashedPassword = await this.hashPassword(input.password);

		return this.prisma.user.create({
			data: {
				email: input.email,
				password: hashedPassword,
				role: input.role ?? "USER",
			},
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async update(input: UpdateUserInput): Promise<UserType> {
		const existingUser = await this.prisma.user.findUnique({
			where: { id: input.id },
		});

		if (!existingUser) {
			throw new NotFoundException(`User with ID ${input.id} not found`);
		}

		if (input.email && input.email !== existingUser.email) {
			const emailTaken = await this.prisma.user.findUnique({
				where: { email: input.email },
			});

			if (emailTaken) {
				throw new ConflictException(`Email ${input.email} is already taken`);
			}
		}

		const hashedPassword = input.password
			? await this.hashPassword(input.password)
			: undefined;

		return this.prisma.user.update({
			where: { id: input.id },
			data: {
				...(input.email && { email: input.email }),
				...(hashedPassword && { password: hashedPassword }),
				...(input.role && { role: input.role }),
			},
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});
	}

	async delete(id: string): Promise<UserType> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		const deletedUser = await this.prisma.user.delete({
			where: { id },
			include: {
				resources: {
					include: FULL_RESOURCE_INCLUDE,
				},
			},
		});

		return deletedUser;
	}

	async validatePassword(
		plainPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		return bcrypt.compare(plainPassword, hashedPassword);
	}

	private async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, this.SALT_ROUNDS);
	}
}
