import { gql } from "graphql-request";

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

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