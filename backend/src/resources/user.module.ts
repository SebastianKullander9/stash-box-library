import { Module } from "@nestjs/common";
import { UserResolver } from "./resolvers/user.resolver";
import { UserService } from "./services/user.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
	providers: [UserResolver, UserService, PrismaService],
	exports: [UserService],
})
export class UserModule {}
