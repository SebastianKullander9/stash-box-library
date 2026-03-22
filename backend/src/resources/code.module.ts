import { Module } from "@nestjs/common";
import { CodeService } from "./services/code.service";
import { CodeResolver } from "./resolvers/code.resolver";
import { CategoryLookupService } from "./services/category-lookup.service";
import { SearchVectorService } from "./services/search-vector.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	providers: [
		CodeResolver,
		CodeService,
		PrismaService,
		CategoryLookupService,
		SearchVectorService,
	],
	exports: [CodeService],
})
export class CodeModule {}
