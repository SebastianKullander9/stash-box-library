import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { UserType } from "../../graphql/types/user.type";
import {
	CreateUserInput,
	UpdateUserInput,
} from "../../graphql/inputs/user.input";
import { GqlAuthGuard } from "../../auth/guards/graphql-auth";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/roles.decorator";
import { UserService } from "../services/user.service";

@Resolver(() => UserType)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [UserType])
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("ADMIN")
	async users(): Promise<UserType[]> {
		return this.userService.findAll();
	}

	@Query(() => UserType, { nullable: true })
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("USER")
	async user(@Args("id") id: string): Promise<UserType | null> {
		return this.userService.findById(id);
	}

	@Mutation(() => UserType)
	async createUser(@Args("input") input: CreateUserInput): Promise<UserType> {
		return this.userService.create(input);
	}

	@Mutation(() => UserType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("USER")
	async updateUser(@Args("input") input: UpdateUserInput): Promise<UserType> {
		return this.userService.update(input);
	}

	@Mutation(() => UserType)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles("USER")
	async deleteUser(@Args("id") id: string): Promise<UserType> {
		return this.userService.delete(id);
	}
}
