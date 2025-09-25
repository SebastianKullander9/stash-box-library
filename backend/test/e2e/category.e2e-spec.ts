import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { getJwtForUser } from "../utils/jwt";
import bcrypt from "bcrypt";
import { cleanDb } from "../utils/cleanDb";

let app: INestApplication;
let prisma: PrismaService;
let adminToken: string;
let userToken: string;

beforeAll(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();
	prisma = app.get(PrismaService);
});

afterAll(async () => {
	await app.close();
});

describe("CategoryResolver (e2e)", () => {
	beforeEach(async () => {
		await cleanDb(prisma);

		// Create users fresh each test
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
		userToken = await getJwtForUser(app, "user@example.com", "password123");
	});

	describe("Queries", () => {
		it("should return empty categories initially", async () => {
			const query = `{ categories { id name } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query });

			expect(res.body.data.categories).toEqual([]);
		});

		it("should return single category by ID", async () => {
			const category = await prisma.category.create({
				data: { name: "Books" },
			});
			const query = `{ category(id: "${category.id}") { id name } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query });

			expect(res.body.data.category).toEqual({
				id: category.id,
				name: "Books",
			});
		});

		it("should return null for non-existent category", async () => {
			const query = `{ category(id: "nonexistent") { id name } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query });

			expect(res.body.data.category).toBeNull();
		});
	});

	describe("Mutations", () => {
		it("ADMIN should create a category", async () => {
			const mutation = `
        mutation {
          createCategory(input: { name: "Movies" }) {
            id
            name
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.data.createCategory).toHaveProperty("name", "Movies");
		});

		it("USER should not create category", async () => {
			const mutation = `
        mutation {
          createCategory(input: { name: "Forbidden" }) {
            id
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query: mutation });

			expect(res.body.errors[0].message).toMatch(/Requires role/i);
		});

		it("should fail to create duplicate category", async () => {
			await prisma.category.create({ data: { name: "Duplicate" } });

			const mutation = `
        mutation {
          createCategory(input: { name: "Duplicate" }) { id }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.errors).toBeDefined();
		});

		it("ADMIN should update category", async () => {
			const category = await prisma.category.create({
				data: { name: "OldName" },
			});

			const mutation = `
        mutation {
          updateCategory(input: { id: "${category.id}", name: "NewName" }) {
            id
            name
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.data.updateCategory.name).toBe("NewName");
		});

		it("ADMIN should not update category to duplicate name", async () => {
			await prisma.category.create({ data: { name: "Existing" } });
			const category = await prisma.category.create({
				data: { name: "ToChange" },
			});

			const mutation = `
        mutation {
          updateCategory(input: { id: "${category.id}", name: "Existing" }) { id }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.errors).toBeDefined();
		});

		it("ADMIN should delete category", async () => {
			const category = await prisma.category.create({
				data: { name: "ToDelete" },
			});

			const mutation = `
        mutation {
          deleteCategory(id: "${category.id}") {
            id
            name
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.data.deleteCategory.id).toBe(category.id);
		});
	});
});
