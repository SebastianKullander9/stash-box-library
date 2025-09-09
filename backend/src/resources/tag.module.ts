import { Module } from "@nestjs/common";
import { TagResolver } from "./resolvers/tag.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	providers: [TagResolver, PrismaService],
})
export class TagModule {}
