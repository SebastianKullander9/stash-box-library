import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GqlExceptionFilter } from "./exceptions/gql-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new GqlExceptionFilter());

	app.enableCors({
		origin: ["http://localhost:3001"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true,
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"x-apollo-operation-name",
			"apollo-require-preflight",
		],
	});

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
