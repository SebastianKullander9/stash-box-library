jest.mock("graphql-upload/graphqlUploadExpress.mjs", () => ({
	__esModule: true,
	default: () => (req: any, res: any, next: any) => next(),
}));
