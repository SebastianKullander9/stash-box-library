"use server";

import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { graphqlClient } from "@/lib/graphqlClient";
import { ClientError } from "graphql-request";
import { GET_TAGS } from "@/graphql/queries/queries";
import { UPDATE_TAG, CREATE_TAG, DELETE_TAG } from "@/graphql/mutations/tagMutations";
import { revalidatePath } from "next/cache";

export type Tag = {
    id: string;
    name: string;
}

export async function getTags() {
    try {
        const data = await graphqlClient.request<{ tags: Tag[]}>(
            GET_TAGS
        );

        return data.tags
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}

export async function createTagAction(formData: FormData) {
    try {
        const name = formData.get("tagName");

        const graphqlClient = await getAuthorizedClient();
        await graphqlClient.request<{
            createTag: { id: string; name: string };
        }>(CREATE_TAG, { name: name });

        revalidatePath("/admin/tags");
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            const graphQLError = err.response.errors?.[0];
            throw new Error(graphQLError?.message || "Something went wrong");
        }
        throw err;
    }
}

export async function updateTag(formData: FormData) {
    try {
        const graphqlClient = await getAuthorizedClient();

        const id = formData.get("id");
        const name = formData.get("tag");

        await graphqlClient.request<{
            updateTag: { id: string, name: string };
        }>(UPDATE_TAG, { input: { id, name } });

        revalidatePath("/admin/categories");
    } catch(err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}

export async function deleteTag(formData: FormData) {
    try {
        const graphqlClient = await getAuthorizedClient();

        const id = formData.get("id");

        await graphqlClient.request<{
            deleteTag: { id: string };
        }>(DELETE_TAG, { id: id});

        revalidatePath("/admin/tags");
    } catch(err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}