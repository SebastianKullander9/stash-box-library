"use server";

import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { ClientError } from "graphql-request";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/graphql/mutations";
import { GET_CATEGORIES } from "@/graphql/queries";
import { graphqlClient } from "@/lib/graphqlClient";

export async function createCategoryAction(input: { name: string }) {
    try {
        const graphqlClient = await getAuthorizedClient();
        const data = await graphqlClient.request<{
            createCategory: { id: string; name: string };
        }>(CREATE_CATEGORY, { input });

        return data.createCategory;
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            const graphQLError = err.response.errors?.[0];
            throw new Error(graphQLError?.message || "Login failed");
        }
        throw err;
    }
}

export type Category = {
    id: string;
    name: string;
}

export async function getCategories() {
    try {
        const data = await graphqlClient.request<{ categories: Category[]}>(
            GET_CATEGORIES
        );

        return data.categories
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}

export async function updateCategory(input: { id: string, name: string }) {
    try {
        const graphqlClient = await getAuthorizedClient();
        const data = await graphqlClient.request<{
            updateCategory: { id: string, name: string };
        }>(UPDATE_CATEGORY, { input });

        return data;
    } catch(err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}