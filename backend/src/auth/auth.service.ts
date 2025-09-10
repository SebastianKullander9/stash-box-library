import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async login(user: { id: string; email: string; role: string }) {
		const payload = { sub: user.id, email: user.email, role: user.role };
		const token = await this.jwtService.signAsync(payload);
		return { access_token: token };
	}
}
