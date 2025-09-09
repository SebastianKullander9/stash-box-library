import { Resolver, Query, Args } from "@nestjs/graphql";
import { TagType } from "src/graphql/types/tag.type";
import { PrismaService } from "../../prisma/prisma.service";

@Resolver(() => TagType)
export class TagResolver {
	constructor(private prisma: PrismaService) {}

	@Query(() => [TagType])
	async tags(): Promise<TagType[]> {
		return this.prisma.tag.findMany({
			include: {
				resources: {
					include: { category: true, tags: true, user: true },
				},
			},
		});
	}

	@Query(() => TagType, { nullable: true })
	async tag(@Args("id") id: string): Promise<TagType | null> {
		return this.prisma.tag.findUnique({
			where: { id },
			include: {
				resources: {
					include: { category: true, tags: true, user: true },
				},
			},
		});
	}
}
