import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { PrismaService } from "src/prisma/prisma.service";
import { getJwtForUser } from "../utils/jwt";
import { createApp } from "../utils/setup-e2e";
import { cleanDb } from "../utils/cleanDb";
import bcrypt from "bcrypt";

let app: INestApplication;
let prisma: PrismaService;

beforeAll(async () => {
	({ app, prisma } = await createApp());
});

describe("UserResolver (e2e)", () => {
	beforeEach(async () => {
		await cleanDb(prisma);
	});

	describe("Registration", () => {
		const roles = ["ADMIN", "USER"];

		roles.forEach((role) => {
			it(`should register a ${role} user`, async () => {
				const email = `${role.toLowerCase()}user@example.com`;
				const mutation = `
			mutation {
			  createUser(input:{
				email: "${email}"
				password: "password123"
				role: "${role}"
			  }){
				id
				email
				role
			  }
			}
		  `;

				const res = await request(app.getHttpServer())
					.post("/graphql")
					.send({ query: mutation })
					.expect(200);
				expect(res.body.data.createUser).toEqual({
					id: expect.any(String),
					email: email,
					role: role,
				});
			});
		});

		it("should fail when email already exists", async () => {
			const email = "duplicate@example.com";
			await prisma.user.create({
				data: {
					email,
					password: await bcrypt.hash("password123", 11),
					role: "USER",
				},
			});

			const mutation = `
					mutation {
						createUser(input:{
							email: "${email}"
							password: "password123"
							role: "USER"
						}) {
							id
						}
					}
				`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query: mutation })
				.expect(200);

			expect(res.body.errors).toBeDefined();
		});
	});

	describe("Login", () => {
		beforeEach(async () => {
			await cleanDb(prisma);
			await prisma.user.create({
				data: {
					email: "adminuser@example.com",
					password: await bcrypt.hash("password123", 11),
					role: "ADMIN",
				},
			});
		});

		it("should login an existing user", async () => {
			const mutation = `
					mutation {
						login(email: "adminuser@example.com", password: "password123")
					  }
					`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query: mutation })
				.expect(200);

			expect(res.body.data.login).toEqual(expect.any(String));
		});

		it("should fail with wrong password", async () => {
			const mutation = `
					mutation {
						login(email: "adminuser@example.com", password: "wrongpass")
					}
				`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query: mutation })
				.expect(200);

			expect(res.body.errors).toBeDefined();
		});

		it("should fail with non-existent email", async () => {
			const mutation = `
					mutation {
						login(email: "doesnotexist@example.com", password: "password123")
					}
				`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query: mutation })
				.expect(200);

			expect(res.body.errors).toBeDefined();
		});
	});

	describe("Admin Query", () => {
		let adminToken: string;

		beforeEach(async () => {
			await cleanDb(prisma);
			await prisma.user.create({
				data: {
					email: "admin@example.com",
					password: await bcrypt.hash("password123", 11),
					role: "ADMIN",
				},
			});

			await prisma.user.create({
				data: {
					email: "user@example.com",
					password: await bcrypt.hash("password123", 11),
					role: "USER",
				},
			});

			adminToken = await getJwtForUser(app, "admin@example.com", "password123");
		});

		it("Should allow ADMIN to get all users", async () => {
			const query = `
					query {
						users {
							id
							email
							role
							resources {
								id
								category { id name }
								tags { id name }
							}
						}
					}
				`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query })
				.expect(200);

			expect(res.body.data.users).toBeInstanceOf(Array);
			expect(res.body.data.users.length).toBeGreaterThan(0);
			expect(res.body.data.users[0]).toHaveProperty("email");
		});
	});

	describe("User Query", () => {
		let userToken: string;
		let userId: string;

		beforeEach(async () => {
			await cleanDb(prisma);
			const user = await prisma.user.create({
				data: {
					email: "user@example.com",
					password: await bcrypt.hash("password123", 11),
					role: "USER",
				},
			});

			userId = user.id;
			userToken = await getJwtForUser(app, "user@example.com", "password123");
		});

		it("should allow USER to get their own data", async () => {
			const query = `
				query {
				  user(id: "${userId}") {
					id
					email
					role
					resources { id category { id name } tags { id name } }
				  }
				}
			  `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query })
				.expect(200);

			expect(res.body.data.user).toHaveProperty("email", "user@example.com");
		});

		it("should return null for non-existent user", async () => {
			const query = `
				query {
				  user(id: "nonexistentid") { id email role }
				}
			  `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query })
				.expect(200);

			expect(res.body.data.user).toBeNull();
		});

		it("should fail without token", async () => {
			const query = `
					query {
						user(id: "${userId}") { id email }
					}
				`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query })
				.expect(200);

			expect(res.body.errors).toBeDefined();
		});

		it("should fail with invalid token", async () => {
			const query = `
					query {
						user(id: "${userId}") { id email }
					}
				`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", "Bearer invalidtoken")
				.send({ query })
				.expect(200);

			expect(res.body.errors).toBeDefined();
		});
	});

	describe("Update User", () => {
		let userToken: string;
		let userId: string;

		beforeEach(async () => {
			await cleanDb(prisma);
			const user = await prisma.user.create({
				data: {
					email: "userupdate@example.com",
					password: await bcrypt.hash("password123", 11),
					role: "USER",
				},
			});

			userId = user.id;
			userToken = await getJwtForUser(
				app,
				"userupdate@example.com",
				"password123",
			);
		});

		it("should allow user to update their own email", async () => {
			const mutation = `
					mutation {
						updateUser(input: {
							id: "${userId}"
							email: "newemail@example.com"
						}) {
							id
							email
						}
					}
				`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query: mutation })
				.expect(200);

			expect(res.body.data.updateUser.email).toBe("newemail@example.com");
		});

		it("should forbid user from updating another user", async () => {
			const other = await prisma.user.create({
				data: {
					email: "other@example.com",
					password: await bcrypt.hash("password123", 11),
					role: "USER",
				},
			});

			const mutation = `
					mutation {
						updateUser(input: {
							id: "${other.id}"
							email: "hack@example.com"
						}) {
							id
							email
						}
					}
				`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query: mutation })
				.expect(200);

			expect(res.body.errors).toBeDefined();
		});

		it("should allow user to change their password", async () => {
			const mutation = `
					mutation {
						updateUser(input: {
							id: "${userId}"
							password: "newpassword123"
						}) {
							id
							email
						}
					}
				`;

			// update password
			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query: mutation })
				.expect(200);

			expect(res.body.data.updateUser.id).toBe(userId);

			// old password should fail
			const oldLogin = `
					mutation {
						login(email: "userupdate@example.com", password: "password123")
					}
				`;
			const resOld = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query: oldLogin })
				.expect(200);
			expect(resOld.body.errors).toBeDefined();

			// new password should work
			const newLogin = `
					mutation {
						login(email: "userupdate@example.com", password: "newpassword123")
					}
				`;
			const resNew = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query: newLogin })
				.expect(200);
			expect(resNew.body.data.login).toEqual(expect.any(String));
		});
	});
});
