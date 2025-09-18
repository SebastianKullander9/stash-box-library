import { AppModule } from "../../src/app.module";
import { PrismaService } from "../../src/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

export async function createApp(): Promise<{
	app: INestApplication;
	prisma: PrismaService;
}> {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	const app = moduleFixture.createNestApplication();
	await app.init();
	const prisma = app.get(PrismaService);

	return { app, prisma };
}
