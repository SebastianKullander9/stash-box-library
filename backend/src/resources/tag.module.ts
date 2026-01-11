import { Module } from "@nestjs/common";
import { TagResolver } from "./resolvers/tag.resolver";
import { TagService } from "./services/tag.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
	providers: [TagResolver, TagService, PrismaService],
	exports: [TagService],
})
export class TagModule {}
