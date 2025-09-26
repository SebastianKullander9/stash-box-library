import { GraphQLClient } from "graphql-request";

const graphqlUrl = process.env.GRAPHQL_URL;

if (!graphqlUrl) {
    throw new Error("Please set GRAPHQL_URL in your .env file");
}
  
export const graphqlClient = new GraphQLClient(graphqlUrl);