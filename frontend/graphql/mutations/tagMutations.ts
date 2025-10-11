import { gql } from "graphql-request";

export const CREATE_TAG = gql`
    mutation CreateTag($name: String!) {
        createTag(input: { name: $name }) {
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

export const DELETE_TAG = gql`
    mutation deleteTag($id: String!) {
        deleteTag(id: $id) {
            id,
            name
        }
    }
`;