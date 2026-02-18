import { Module } from "@nestjs/common";
import { CodeService } from "./services/code.service";
import { CodeResolver } from "./resolvers/code.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	providers: [CodeResolver, CodeService, PrismaService],
	exports: [CodeService],
})
export class CodeModule {}
