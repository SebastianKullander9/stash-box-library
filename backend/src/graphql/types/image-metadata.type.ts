import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class ImageMetadataType {
	@Field(() => Int)
	width: number;

	@Field(() => Int)
	height: number;
}
