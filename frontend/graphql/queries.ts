import { gql } from "graphql-request";

export const GET_CATEGORIES = gql`
    query {
        categories(orderBy: "DESC") {
            id
            name
            createdAt
        }
    }
`;