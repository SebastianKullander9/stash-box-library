import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

interface JwtPayload {
	sub: string;
	email: string;
	role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET || "super-secret-key",
		});
	}

	async validate(payload: JwtPayload) {
		return Promise.resolve({
			userId: payload.sub,
			email: payload.email,
			role: payload.role,
		});
	}
}
