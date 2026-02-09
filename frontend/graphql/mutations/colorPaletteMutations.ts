import { gql } from "graphql-request";

export const CREATE_COLOR_PALETTE = gql`
	mutation CreateColorPalette($input: CreateColorPaletteInput!) {
		createColorPalette(input: $input) {
			id
			name
			code
			tokens {
				value
				role
				order
			}
		}
	}
`;