import { Module } from "@nestjs/common";
import { CategoryResolver } from "./resolvers/category.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	providers: [CategoryResolver, PrismaService],
})
export class CategoryModule {}
