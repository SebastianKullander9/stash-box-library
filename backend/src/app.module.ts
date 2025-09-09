import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ResourceModule } from "./resources/resource.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
			playground: true,
			debug: true,
		}),
		ResourceModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
