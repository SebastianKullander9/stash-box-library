import { gql } from "graphql-request";

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
            id
            name
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($input: UpdateCategoryInput!) {
        updateCategory(input: $input) {
            id
            name
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($id: String!) {
        deleteCategory(id: $id) {
            id,
            name
        }
    }
`;

