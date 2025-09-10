import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import bcrypt from "bcrypt";
import { UnauthorizedException } from "@nestjs/common";

@Resolver()
export class AuthResolver {
	constructor(
		private authService: AuthService,
		private prisma: PrismaService,
	) {}

	@Mutation(() => String)
	async login(
		@Args("email") email: string,
		@Args("password") password: string,
	) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) throw new UnauthorizedException("Invalid credentials");

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) throw new UnauthorizedException("Invalid credentials");

		const token = await this.authService.login({
			id: user.id,
			email: user.email,
			role: user.role,
		});

		return token.access_token;
	}
}
