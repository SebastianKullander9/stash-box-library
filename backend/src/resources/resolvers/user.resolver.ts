import { Resolver, Query, Args } from "@nestjs/graphql";
import { UserType } from "src/graphql/types/user.type";
import { PrismaService } from "../../prisma/prisma.service";

@Resolver(() => UserType)
export class UserResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [UserType])
	async users(): Promise<UserType[]> {
		return this.prisma.user.findMany({
			include: {
				resources: {
					include: { category: true, tags: true, user: true },
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
					include: { category: true, tags: true, user: true },
				},
			},
		});
	}
}
