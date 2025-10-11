import { gql } from "graphql-request";

export const UPLOAD_FILES = gql`
  mutation UploadFiles($files: [Upload!]!, $fileRole: String!) {
    uploadFiles(files: $files, fileRole: $fileRole) {
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