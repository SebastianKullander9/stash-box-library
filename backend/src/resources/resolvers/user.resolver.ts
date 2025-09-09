import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserType } from "src/graphql/types/user.type";
import { PrismaService } from "../../prisma/prisma.service";
import {
	CreateUserInput,
	UpdateUserInput,
} from "src/graphql/inputs/user.input";

@Resolver(() => UserType)
export class UserResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [UserType])
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
		return this.prisma.user.create({
			data: { email: input.email, password: input.password },
			include: { resources: { include: { category: true, tags: true } } },
		});
	}

	@Mutation(() => UserType)
	async updateUser(@Args("input") input: UpdateUserInput): Promise<UserType> {
		return this.prisma.user.update({
			where: { id: input.id },
			data: { email: input.email, password: input.password },
			include: { resources: { include: { category: true, tags: true } } },
		});
	}

	@Mutation(() => UserType)
	async deleteUser(@Args("id") id: string): Promise<UserType> {
		return this.prisma.user.delete({
			where: { id },
			include: { resources: { include: { category: true, tags: true } } },
		});
	}
}
