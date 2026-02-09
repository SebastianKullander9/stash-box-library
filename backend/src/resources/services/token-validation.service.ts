import { BadRequestException, Injectable } from "@nestjs/common";

export interface ColorToken {
	value?: string;
	role?: string;
}

export type PaletteTokens = Record<string, ColorToken>;

@Injectable()
export class TokenValidationService {
	validate(tokens: PaletteTokens) {
		this.validateRoot(tokens);
		this.validateKeys(tokens);
		this.validateTokenValues(tokens);
	}

	private validateRoot(tokens: PaletteTokens) {
		if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) {
			throw new BadRequestException("Tokens must be an object");
		}
	}

	private validateKeys(tokens: PaletteTokens) {
		for (const key of Object.keys(tokens)) {
			if (!this.isValidTokenKey(key)) {
				throw new BadRequestException(
					`Invalid token key "${key}". Use camelCase identifiers only.`,
				);
			}
		}
	}

	private validateTokenValues(tokens: PaletteTokens) {
		for (const [key, token] of Object.entries(tokens)) {
			if (!token || typeof token !== "object") {
				throw new BadRequestException(`Token "${key}" must be an object`);
			}

			if (!token.value) {
				throw new BadRequestException(`Token "${key}" must have a value`);
			}

			if (!this.isValidHex(token.value)) {
				throw new BadRequestException(`Invalid hex color for token "${key}"`);
			}
		}
	}

	private isValidTokenKey(key: string): boolean {
		return /^[a-z][a-zA-Z0-9]*$/.test(key);
	}

	private isValidHex(value: string): boolean {
		return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
	}
}
