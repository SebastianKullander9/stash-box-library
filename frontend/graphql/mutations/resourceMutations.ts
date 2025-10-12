import { gql } from "graphql-request";

export const UPLOAD_FILES = gql`
	mutation UploadFiles($files: [Upload!]!, $fileRole: String!, $resourceId: String!) {
		uploadFiles(files: $files, fileRole: $fileRole, resourceId: $resourceId) {
			id
			title
			files {
				url
				fileType
				fileRole
			}
		}
	}
`;

export const CREATE_RESOURCE = gql`
    mutation CreateResource($input: CreateResourceInput!) {
        createResource(input: $input) {
            id
            title
            files {
                url
            }
        }
    }
`;

export const DELETE_RESOURCE = gql`
    mutation deleteResource($id: String!) {
        deleteResource(id: $id) {
            id,
            title
        }
    }
`;

export const UPDATE_RESOURCE = gql`
    mutation updateResource($input: UpdateResourceInput!) {
        updateResource(input: $input) {
            id
            title
            description
            textContent
        }
    }
`;