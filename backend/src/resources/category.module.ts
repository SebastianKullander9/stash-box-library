import { Module } from "@nestjs/common";
import { CategoryResolver } from "./resolvers/category.resolver";
import { CategoryService } from "./services/category.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
	providers: [CategoryResolver, CategoryService, PrismaService],
	exports: [CategoryService],
})
export class CategoryModule {}
