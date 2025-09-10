import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { ResourceModule } from "./resources/resource.module";
import { UserModule } from "./resources/user.module";
import { TagModule } from "./resources/tag.module";
import { CategoryModule } from "./resources/category.module";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
			playground: true,
			debug: true,
			context: ({ req }: { req: Request }) => ({ req }),
		}),
		ResourceModule,
		UserModule,
		TagModule,
		CategoryModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				graphqlUploadExpress({
					maxFileSize: 10000000, //10MB
					maxFiles: 10,
				}),
			)
			.forRoutes("graphql");
	}
}
