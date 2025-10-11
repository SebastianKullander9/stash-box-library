"use server";

import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { ClientError } from "graphql-request";
import { graphqlClient } from "@/lib/graphqlClient";
import { uploadFilesToServer } from "@/lib/uploadFiles";
import { CREATE_RESOURCE } from "@/graphql/mutations/resourceMutations";
import { revalidatePath } from "next/cache";

export async function createResourceAction(formData: FormData) {
    try {
        const title = formData.get("title");
        const description = formData.get("description");
        const textContent = formData.get("textContent");
        const categoryName = formData.get("categoryName");
        const tagNames = formData.getAll("tagNames");
        const files = formData.getAll("files") as File[];

        const selectedFiles = files ? Array.from(files) : [];

        const uploadResult = selectedFiles.length
            ? await uploadFilesToServer(selectedFiles, "RESOURCE_FILE")
            : [];

        const uploadedFiles = uploadResult?.files ?? [];

        const graphqlClient = await getAuthorizedClient();
        await graphqlClient.request<{
            createResource: { id: string; name: string };
        }>(CREATE_RESOURCE, { input: { 
            title: title,
            description: description,
            textContent: textContent,
            categoryName: categoryName,
            tagNames: tagNames,
            files: uploadedFiles
        } });

        revalidatePath("/admin/");
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            const graphQLError = err.response.errors?.[0];
            throw new Error(graphQLError?.message || "Something went wrong");
        }
        throw err;
    }
}


