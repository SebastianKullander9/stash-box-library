import { GraphQLScalarType, Kind } from "graphql";

// Dummy scalar for testing
const GraphQLUpload = new GraphQLScalarType({
	name: "Upload",
	description: "Mock Upload scalar",
	parseValue(value) {
		return value;
	},
	serialize(value) {
		return value;
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING) return ast.value;
		return null;
	},
});

export default GraphQLUpload;
export type FileUpload = any;
