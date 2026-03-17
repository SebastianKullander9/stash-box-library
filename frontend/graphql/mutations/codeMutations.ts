import { gql } from "graphql-request";

export const CREATE_CODE = gql`
	mutation CreateCode($input: CreateCodeInput!) {
		createCode(input: $input) {
			id
			title
			description
			codeFiles {
				title
				language
				content
			}
		}
	}
`;

export const UPDATE_CODE_FILES = gql`
	mutation UpdateCode($id: String!, $input: UpdateCodeInput!) {
		updateCode(id: $id, input: $input) {
			id
			codeFiles {
					id
					title
					content
					language
					codeVersions {
						id
						versionNumber
						createdAt
				}
			}
			snapshots {
				id
				message
				createdAt
				fileVersions {
					id
					versionNumber
					createdAt
				}
				addedFiles {
					id
					title
					language
				}
				deletedFiles {
					id
					title
					language
				}
			}
		}
	}
`