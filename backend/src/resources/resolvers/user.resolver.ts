import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserType } from "src/graphql/types/user.type";
import { PrismaService } from "../../prisma/prisma.service";
import {
	CreateUserInput,
	UpdateUserInput,
} from "src/graphql/inputs/user.input";
import bcrypt from "bcrypt";
import { GqlAuthGuard } from "src/auth/guards/graphql-auth";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import { UseGuards } from "@nestjs/common";

@Resolver(() => UserType)
export class UserResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [UserType])
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async users(): Promise<UserType[]> {
		return this.prisma.user.findMany({
			include: {
				resources: {
					include: { category: true, tags: true },
				},
			},
		});
	}

	@Query(() => UserType, { nullable: true })
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("USER")
	async user(@Args("id") id: string): Promise<UserType | null> {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				resources: {
					include: { category: true, tags: true },
				},
			},
		});
	}

	@Mutation(() => UserType)
	async createUser(@Args("input") input: CreateUserInput): Promise<UserType> {
		const hashedPassword = await bcrypt.hash(input.password, 10);
		return this.prisma.user.create({
			data: {
				email: input.email,
				password: hashedPassword,
				role: input.role ?? "USER",
			},
			include: { resources: { include: { category: true, tags: true } } },
		});
	}

	@Mutation(() => UserType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("USER")
	async updateUser(@Args("input") input: UpdateUserInput): Promise<UserType> {
		let hashedPassword = undefined;
		if (input.password) {
			hashedPassword = await bcrypt.hash(input.password, 10);
		}
		return this.prisma.user.update({
			where: { id: input.id },
			data: {
				email: input.email,
				...(hashedPassword && { password: hashedPassword }),
				...(input.role && { role: input.role }),
			},
			include: { resources: { include: { category: true, tags: true } } },
		});
	}

	@Mutation(() => UserType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("USER")
	async deleteUser(@Args("id") id: string): Promise<UserType> {
		return this.prisma.user.delete({
			where: { id },
			include: { resources: { include: { category: true, tags: true } } },
		});
	}
}
