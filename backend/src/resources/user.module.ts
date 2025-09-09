import { Module } from "@nestjs/common";
import { UserResolver } from "./resolvers/user.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	providers: [UserResolver, PrismaService],
})
export class UserModule {}
