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

export const CREATE_TAG = gql`
    mutation CreateTag($name: String!) {
        createTag(input: { name: $name }) {
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

export const UPDATE_TAG = gql`
    mutation UpdateTAG($input: UpdateTagInput!) {
        updateTag(input: $input) {
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

export const DELETE_TAG = gql`
    mutation deleteTag($id: String!) {
        deleteTag(id: $id) {
            id,
            name
        }
    }
`;