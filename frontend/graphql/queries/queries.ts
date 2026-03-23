import { gql } from "graphql-request";

export const GET_CATEGORIES = gql`
    query {
        categories(orderBy: "DESC") {
            id
            name
            createdAt
        }
    }
`;

export const GET_TAGS = gql`
    query {
        tags(orderBy: "DESC") {
            id
            name
            createdAt
        }
    }
`;

export const GET_POPULAR_TAGS = gql`
	query PopularTags($limit: Int) {
		popularTags(limit: $limit) {
			id
			name
			resourceCount
		}
	}
`;

export const GET_RESOURCES = gql`
    query GetAllResources($limit: Int, $offset: Int) {
        resources(limit: $limit, offset: $offset) {
            items {
                id
                title
                description
                createdAt
                category {
                    id
                    name
                }
                files {
                    url
                    fileType
                }
            }
            totalCount
            nextOffset
        }
    }
`;

export const GET_ONE_RESOURCE = gql`
    query GetResource($id: String!) {
        resource(id: $id) {
            id
            title
            description
            textContent
            createdAt
            category {
                id
                name
            }
            tags {
                id
                name
            }
            user {
                id
                email
            }
            files {
                url
                fileType
                fileRole
				fontMetadata {
					family
					subfamily
					weight
					isVariable
					isThumbnailFace
					variableAxes {
						tag
						min
						max
					}
				}
				imageMetadata {
					width
					height
				}
            }
        }
    }
`

export const GET_RESOURCES_BY_CATEGORY = gql`
    query GetResourcesByCategory($categoryId: String, $limit: Int, $offset: Int) {
        resources(categoryId: $categoryId, limit: $limit, offset: $offset) {
            items {
                id
                title
                description
                createdAt
                category { id name }
                tags { id name }
                files { url fileType fileRole }
            }
            totalCount
            nextOffset
        }
    }
`;

export const GET_CATEGORY_BY_NAME = gql`
    query GetCategoryByName($categoryName: String!) {
        category(name: $categoryName) {
            id
        }
    }
`;

export const GET_CATEGORIES_WITH_COUNT = gql`
	query CategoriesWithCount {
		categoriesWithCount {
			id
			name
			resourceCount
			createdAt
		}
	}
`;

export const GET_COLOR_PALETTES = gql`
	query GetColorPalettes($limit: Int, $offset: Int) {
		colorPalettes(limit: $limit, offset: $offset) {
			items {
				id
				name
				code
				createdAt
				tokens {
					value
					role
					order
				}
			}
			totalCount
			nextOffset
		}
	}
`;

export const GET_ONE_COLOR_PALETTE = gql`
	query GetOneColorPalette($id: String!) {
		colorPalette(id: $id) {
			id
			name
			code
			createdAt
			tokens {
				value
				role
				order
			}
		}
	}
`;

export const GET_CODES = gql`
	query GetCodes($limit: Int, $offset: Int) {
		codes(limit: $limit, offset: $offset) {
			items {
				id
				title
				description
				tags { id name }
				codeFiles {
					id
					title
					language
					content
				}
				createdAt
				updatedAt
			}
			totalCount
			nextOffset
		}
	}
`;

export const GET_ONE_CODE = gql`
	query GetOneCode($id: String!) {
		code(id: $id) {
			id
			title
			description
			tags { id name }
			codeFiles {
				id
				title
				language
				content
				codeVersions {
					id
					content
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
					content
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
					createdAt
				}
			}
			createdAt
			updatedAt
		}
	}
`;

export const SEARCH = gql`
	query ($query: String!) {
		search(query: $query) {
			id
			title
			description
			type
			categoryName
			rank
		}
	}
`;