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
`