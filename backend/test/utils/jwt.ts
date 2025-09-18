import request from "supertest";
import { INestApplication } from "@nestjs/common";

export async function getJwtForUser(
	app: INestApplication,
	email: string,
	password: string,
): Promise<string> {
	const mutation = `
    mutation {
      login(email: "${email}", password: "${password}")
    }
  `;

	const res = await request(app.getHttpServer())
		.post("/graphql")
		.send({ query: mutation })
		.expect(200);
	return res.body.data.login;
}
