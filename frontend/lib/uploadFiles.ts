import { getAuthorizedClient } from "./authorizedGraphqlClient";
import { UPLOAD_FILES } from "@/graphql/mutations/resourceMutations";

export async function uploadFilesToServer(
    files: File[],
    fileRole = "RESOURCE_FILE",
    resourceId?: string
) {
    if (!resourceId) {
        throw new Error("resourceId is required to attach files");
    }

    const endpoint = process.env.NEXT_PUBLIC_API_URL!;
    const formData = new FormData();

    formData.append(
        "operations",
        JSON.stringify({
            query: UPLOAD_FILES,
            variables: {
                files: new Array(files.length).fill(null),
                fileRole,
                resourceId,
            },
        })
    );

    formData.append(
        "map",
        JSON.stringify(
            Object.fromEntries(files.map((_, i) => [i.toString(), [`variables.files.${i}`]]))
        )
    );

    files.forEach((file, i) => formData.append(i.toString(), file));

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "x-apollo-operation-name": "UploadFiles",
        },
        body: formData,
        credentials: "include",
    });

    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);

    return json.data.uploadFiles;
}