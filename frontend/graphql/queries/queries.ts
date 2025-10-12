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

export const GET_RESOURCES = gql`
    query GetAllResources {
        resources {
            id
            title
            description
            category {
                id
                name
            }
            files {
                url
                fileType
            }
        }
    }
`;

export const GET_ONE_RESOURCE = gql`
    query GetResource($id: String!) {
        resource(id: $id) {
            id
            title
            description
            textContent
            category {
                id
                name
            }
            tags {
                id
                name
            }
            user {
                id
                email
            }
            files {
                url
                fileType
                fileRole
            }
        }
    }
`