import { Module } from "@nestjs/common";
import { ResourceResolver } from "./resolvers/resource.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	providers: [ResourceResolver, PrismaService],
})
export class ResourceModule {}
