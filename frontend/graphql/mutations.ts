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