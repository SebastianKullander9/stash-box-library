import { Resolver, Query, Args } from "@nestjs/graphql";
import { ResourceType } from "src/graphql/types/resource.type";
import { PrismaService } from "../../prisma/prisma.service";

@Resolver(() => ResourceType)
export class ResourceResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [ResourceType])
	async resources(): Promise<ResourceType[]> {
		return this.prisma.resource.findMany({
			include: { category: true, tags: true, user: true },
		});
	}

	@Query(() => [ResourceType], { nullable: true })
	async resource(@Args("id") id: string): Promise<ResourceType | null> {
		return this.prisma.resource.findUnique({
			where: { id },
			include: { category: true, tags: true, user: true },
		});
	}
}
