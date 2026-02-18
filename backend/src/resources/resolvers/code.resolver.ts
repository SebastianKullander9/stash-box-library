import { Resolver, Mutation, Query, Args, ID, Int } from "@nestjs/graphql";
import { CodeService } from "../services/code.service";
import { Code, CodePage } from "src/graphql/types/code.type";
import {
	CreateCodeInput,
	UpdateCodeInput,
} from "src/graphql/inputs/code.input";
import { GqlAuthGuard } from "src/auth/guards/graphql-auth";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/roles.decorator";

@Resolver(() => Code)
export class CodeResolver {
	constructor(private readonly codeService: CodeService) {}

	@Query(() => CodePage)
	async codes(
		@Args("tagIds", { type: () => [String], nullable: true }) tagIds?: string[],
		@Args("limit", { type: () => Int, nullable: true }) limit?: number,
		@Args("offset", { type: () => Int, nullable: true }) offset?: number,
	): Promise<CodePage> {
		return this.codeService.findMany({ tagIds, limit, offset });
	}

	@Query(() => Code, { nullable: true })
	async code(@Args("id", { type: () => ID }) id: string): Promise<Code | null> {
		return this.codeService.findById(id);
	}

	@Mutation(() => Code)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async createCode(@Args("input") input: CreateCodeInput): Promise<Code> {
		return this.codeService.create(input);
	}

	@Mutation(() => Code)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async updateCode(
		@Args("id", { type: () => ID }) id: string,
		@Args("input") input: UpdateCodeInput,
	): Promise<Code> {
		return this.codeService.update(id, input);
	}

	@Mutation(() => Code)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async deleteCode(@Args("id", { type: () => ID }) id: string): Promise<Code> {
		return this.codeService.delete(id);
	}
}
