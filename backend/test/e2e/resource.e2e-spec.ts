import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { S3Service } from "src/s3/s3.service";
import { getJwtForUser } from "../utils/jwt";
import { cleanDb } from "../utils/cleanDb";
import bcrypt from "bcrypt";

let app: INestApplication;
let prisma: PrismaService;
let adminToken: string;
let userToken: string;

beforeAll(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	})
		.overrideProvider(S3Service)
		.useValue({
			uploadFile: jest.fn().mockResolvedValue("fake-s3-key"),
			getPresignedUrl: jest.fn().mockResolvedValue("http://fake-s3-url"),
		})
		.compile();

	app = moduleFixture.createNestApplication();
	await app.init();
	prisma = app.get(PrismaService);
});

afterAll(async () => {
	await app.close();
});

describe("ResourceResolver (e2e)", () => {
	beforeEach(async () => {
		await cleanDb(prisma);

		// Create test users
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
		it("should return empty resources initially", async () => {
			const query = `{ resources { id title } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query })
				.expect(200);

			expect(res.body.data.resources).toEqual([]);
		});

		it("should return a single resource if it exists", async () => {
			const resource = await prisma.resource.create({
				data: {
					title: "Test Resource",
					description: "Desc",
					user: { connect: { email: "admin@example.com" } },
				},
			});

			const query = `{ resource(id: "${resource.id}") { id title } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query })
				.expect(200);

			expect(res.body.data.resource.title).toBe("Test Resource");
		});

		it("should return null for non-existent resource", async () => {
			const query = `{ resource(id: "nonexistentid") { id title } }`;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query })
				.expect(200);

			expect(res.body.data.resource).toBeNull();
		});
	});

	describe("Mutations", () => {
		it("ADMIN should create a resource with new category + tags", async () => {
			const mutation = `
        mutation {
          createResource(input: {
            title: "Test Resource"
            description: "Description"
            textContent: "Some content"
            categoryName: "Books"
            tagNames: ["fiction", "classic"]
            files: [{ url: "http://example.com/file.pdf", fileType: "pdf", fileRole: "MAIN" }]
          }) {
            id
            title
            category { id name }
            tags { id name }
            files { url fileType fileRole }
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation })
				.expect(200);

			expect(res.body.data.createResource.title).toBe("Test Resource");
			expect(res.body.data.createResource.category.name).toBe("Books");
			expect(res.body.data.createResource.tags).toHaveLength(2);
		});

		it("USER should not be able to create resource", async () => {
			const mutation = `
        mutation {
          createResource(input: { title: "Nope", description: "Fail" }) {
            id
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query: mutation })
				.expect(200);

			expect(res.body.errors[0].message).toMatch(/Requires role/i);
		});

		it("ADMIN should update a resource", async () => {
			const resource = await prisma.resource.create({
				data: {
					title: "Old Title",
					description: "Old",
					user: { connect: { email: "admin@example.com" } },
				},
			});

			const mutation = `
        mutation {
          updateResource(input: {
            id: "${resource.id}"
            title: "New Title"
            description: "Updated"
          }) {
            id
            title
            description
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation })
				.expect(200);

			expect(res.body.data.updateResource.title).toBe("New Title");
		});

		it("USER should not update a resource", async () => {
			const resource = await prisma.resource.create({
				data: {
					title: "User Resource",
					description: "Desc",
					user: { connect: { email: "admin@example.com" } },
				},
			});

			const mutation = `
        mutation {
          updateResource(input: { id: "${resource.id}", title: "Hack" }) {
            id
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${userToken}`)
				.send({ query: mutation })
				.expect(200);

			expect(res.body.errors[0].message).toMatch(/Requires role/i);
		});

		it("ADMIN should delete a resource", async () => {
			const resource = await prisma.resource.create({
				data: {
					title: "To Delete",
					description: "Desc",
					user: { connect: { email: "admin@example.com" } },
				},
			});

			const mutation = `
        mutation {
          deleteResource(id: "${resource.id}") {
            id
            title
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.set("Authorization", `Bearer ${adminToken}`)
				.send({ query: mutation })
				.expect(200);

			expect(res.body.data.deleteResource.title).toBe("To Delete");
		});
	});

	describe("File Upload", () => {
		it("should create a new resource with uploaded files", async () => {
			const mutation = `
        mutation {
          uploadFiles(files: [], fileRole: "MAIN") {
            id
            files { url fileType fileRole }
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query: mutation })
				.expect(200);

			expect(res.body.data.uploadFiles.files).toBeDefined();
		});

		it("should attach files to an existing resource", async () => {
			const resource = await prisma.resource.create({
				data: {
					title: "Attach Test",
					description: "Desc",
					user: { connect: { email: "admin@example.com" } },
				},
			});

			const mutation = `
        mutation {
          uploadFiles(files: [], fileRole: "MAIN", resourceId: "${resource.id}") {
            id
            files { url fileType fileRole }
          }
        }
      `;

			const res = await request(app.getHttpServer())
				.post("/graphql")
				.send({ query: mutation })
				.expect(200);

			expect(res.body.data.uploadFiles.id).toBe(resource.id);
		});
	});
});
