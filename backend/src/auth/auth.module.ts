import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET || "super-secret-key",
			signOptions: { expiresIn: "24h" },
		}),
	],
	providers: [AuthService, AuthResolver, JwtStrategy, PrismaService],
	exports: [AuthService],
})
export class AuthModule {}
