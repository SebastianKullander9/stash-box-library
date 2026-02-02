import { Module } from "@nestjs/common";
import { ResourceResolver } from "./resolvers/resource.resolver";
import { ResourceService } from "./services/resource.service";
import { FileUploadService } from "./services/file-upload.service";
import { PrismaService } from "../prisma/prisma.service";
import { FontService } from "./services/font-metadata.service";
import { S3Module } from "../s3/s3.module";

@Module({
	imports: [S3Module],
	providers: [
		ResourceResolver,
		ResourceService,
		FileUploadService,
		PrismaService,
		FontService,
	],
	exports: [ResourceService],
})
export class ResourceModule {}
