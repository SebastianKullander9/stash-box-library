import { Module } from "@nestjs/common";
import { TagResolver } from "./resolvers/tag.resolver";
import { TagService } from "./services/tag.service";
import { SearchVectorService } from "./services/search-vector.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
	providers: [TagResolver, TagService, PrismaService, SearchVectorService],
	exports: [TagService],
})
export class TagModule {}
