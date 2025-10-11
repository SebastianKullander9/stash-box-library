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

export const GET_TAGS = gql`
    query {
        tags(orderBy: "DESC") {
            id
            name
            createdAt
        }
    }
`;