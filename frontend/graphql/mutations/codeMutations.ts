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

