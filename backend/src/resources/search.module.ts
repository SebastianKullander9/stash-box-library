import { Module } from "@nestjs/common";
import { SearchService } from "./services/search.service";
import { SearchResolver } from "./resolvers/search.resolver";
import { PrismaService } from "../prisma/prisma.service";

@Module({
	providers: [SearchResolver, SearchService, PrismaService],
	exports: [SearchService],
})
export class SearchModule {}
