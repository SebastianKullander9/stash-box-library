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

describe("TagResolver (e2e)", () => {
	beforeEach(async () => {
		await cleanDb(prisma);

		// Create fresh users for every test
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

		// Generate fresh tokens each time
		adminToken = await getJwtForUser(app, "admin@example.com", "password123");
		userToken = await getJwtForUser(app, "user@example.com", "password123");
	});

	describe("Queries", () => {
		it("should return empty tags initially", async () => {
			const query = `{ tags { id name } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query });

			expect(res.body.data.tags).toEqual([]);
		});

		it("should return single tag by ID", async () => {
			const tag = await prisma.tag.create({ data: { name: "Fiction" } });
			const query = `{ tag(id: "${tag.id}") { id name } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query });

			expect(res.body.data.tag).toEqual({ id: tag.id, name: "Fiction" });
		});

		it("should return null for non-existent tag", async () => {
			const query = `{ tag(id: "nonexistent") { id name } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query });

			expect(res.body.data.tag).toBeNull();
		});
	});

	describe("Mutations", () => {
		it("ADMIN should create a tag", async () => {
			const mutation = `
        mutation {
          createTag(input: { name: "Classic" }) { id name }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.data.createTag.name).toBe("Classic");
		});

		it("USER should not create tag", async () => {
			const mutation = `
        mutation {
          createTag(input: { name: "Forbidden" }) { id }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query: mutation });

			expect(res.body.errors[0].message).toMatch(/Requires role/i);
		});

		it("should fail to create duplicate tag", async () => {
			await prisma.tag.create({ data: { name: "Duplicate" } });

			const mutation = `
        mutation {
          createTag(input: { name: "Duplicate" }) { id }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.errors).toBeDefined();
		});

		it("ADMIN should update tag", async () => {
			const tag = await prisma.tag.create({ data: { name: "OldName" } });

			const mutation = `
        mutation {
          updateTag(input: { id: "${tag.id}", name: "NewName" }) { id name }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.data.updateTag.name).toBe("NewName");
		});

		it("ADMIN should not update tag to duplicate name", async () => {
			await prisma.tag.create({ data: { name: "Existing" } });
			const tag = await prisma.tag.create({ data: { name: "ToChange" } });

			const mutation = `
        mutation {
          updateTag(input: { id: "${tag.id}", name: "Existing" }) { id }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.errors).toBeDefined();
		});

		it("ADMIN should delete tag", async () => {
			const tag = await prisma.tag.create({ data: { name: "ToDelete" } });

			const mutation = `
        mutation {
          deleteTag(id: "${tag.id}") { id name }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation });

			expect(res.body.data.deleteTag.id).toBe(tag.id);
		});
	});
});
