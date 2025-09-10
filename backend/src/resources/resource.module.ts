import { Module } from "@nestjs/common";
import { ResourceResolver } from "./resolvers/resource.resolver";
import { PrismaService } from "src/prisma/prisma.service";
import { S3Module } from "../s3/s3.module";

@Module({
	imports: [S3Module],
	providers: [ResourceResolver, PrismaService],
})
export class ResourceModule {}
