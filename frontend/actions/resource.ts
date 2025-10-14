"use server";

import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { ClientError } from "graphql-request";
import { graphqlClient } from "@/lib/graphqlClient";
import { uploadFilesToServer } from "@/lib/uploadFiles";
import { CREATE_RESOURCE, DELETE_RESOURCE, UPDATE_RESOURCE } from "@/graphql/mutations/resourceMutations";
import { GET_RESOURCES, GET_ONE_RESOURCE, GET_RESOURCES_BY_CATEGORY } from "@/graphql/queries/queries";
import { revalidatePath } from "next/cache";
import { Resource } from "@/types";
import { ResourcePage } from "@/types";
import { redirect } from "next/navigation";

export async function createResourceAction(formData: FormData) {
    try {
        const titleFromForm = formData.get("title");
        const description = formData.get("description");
        const textContent = formData.get("textContent");
        const categoryName = formData.get("category");
        const tagNames = formData.getAll("tags");
        const files = formData.getAll("files") as File[];

        const graphqlClient = await getAuthorizedClient();

        const resource = await graphqlClient.request<{
            createResource: { id: string; name: string };
        }>(CREATE_RESOURCE, {
            input: {
                title: titleFromForm,
                description: description,
                textContent: textContent,
                categoryName: categoryName,
                tagNames: tagNames,
            },
        });

        const resourceId = resource.createResource.id;

        const selectedFiles = files ? Array.from(files) : [];
        if (selectedFiles.length > 0) {
            await uploadFilesToServer(selectedFiles, "RESOURCE_FILE", resourceId);
        }

        revalidatePath("/admin/");
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            const graphQLError = err.response.errors?.[0];
            throw new Error(graphQLError?.message || "Something went wrong");
        }
        throw err;
    }
}

export async function getResources(limit?: number, offset?: number) {
    try {
        const data = await graphqlClient.request<{ resources: ResourcePage}>(
            GET_RESOURCES,
            {
                limit,
                offset
            }
        );

        return data.resources;
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}

export async function deleteResource(formData: FormData) {
    try {
        const graphqlClient = await getAuthorizedClient();

        const id = formData.get("id");

        await graphqlClient.request<{
            deleteResource: { id: string };
        }>(DELETE_RESOURCE, { id: id});

        revalidatePath("/admin/resources");
    } catch(err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}

export async function getOneResource(id: string) {
    try {
        const data = await graphqlClient.request<{ resource: Resource}>(
            GET_ONE_RESOURCE,
            { id }
        );

        return data.resource;
    } catch(err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}

export async function updateResource(formData: FormData) {
    try {
        const graphqlClient = await getAuthorizedClient();

        const id = formData.get("id");
        const title = formData.get("title");
        const description = formData.get("description");
        const textContent = formData.get("additionalText");
        const categoryId = formData.get("category");
        const tagNames = formData.getAll("tags");

        await graphqlClient.request<{
            updateResource: {
                id: string;
                title: string,
                description: string,
                additionalText: string,
            }
        }>(UPDATE_RESOURCE, { input: {
            id,
            title,
            description,
            textContent,
            categoryId,
            tagNames
        }});

        return redirect(`/admin/resources/${id}`);
    } catch(err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong")
        }
        throw err;
    }
}
            
export async function getResourceByCategory(categoryId: string, limit = 20, offset = 0) {
    try {
        const data = await graphqlClient.request<{ resources: ResourcePage }>(
            GET_RESOURCES_BY_CATEGORY,
            {
                categoryId,
                limit,
                offset,
            }
        );

        return data.resources;
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong");
        }
        throw err;
    }
}