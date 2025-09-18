import { PrismaService } from "src/prisma/prisma.service";

export async function cleanDb(prisma: PrismaService) {
	await prisma.$transaction([
		prisma.file.deleteMany(),
		prisma.resource.deleteMany(),
		prisma.tag.deleteMany(),
		prisma.category.deleteMany(),
		prisma.user.deleteMany(),
	]);
}
