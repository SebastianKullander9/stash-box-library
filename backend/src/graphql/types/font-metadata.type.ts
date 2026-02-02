import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class FontAxisType {
	@Field()
	tag: string;

	@Field()
	min: number;

	@Field()
	max: number;
}

@ObjectType()
export class FontMetadataType {
	@Field()
	family: string;

	@Field()
	subfamily: string;

	@Field()
	weight: number;

	@Field()
	isVariable: boolean;

	@Field(() => [FontAxisType], { nullable: true })
	variableAxes?: FontAxisType[] | null;

	@Field()
	isThumbnailFace: boolean;
}
