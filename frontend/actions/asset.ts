"use server";

import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { ClientError } from "graphql-request";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CREATE_COLOR_PALETTE } from "@/graphql/mutations/colorPaletteMutations";

export async function createColorPalette(formData: FormData) {
	try {
		const name = formData.get("name") as string;

		const tokens: {
			key: string;
			token: {
				value: string;
				role: string;
			};
		}[] = [];
		let index = 0;

		while (formData.has(`tokens[${index}].role`)) {
			const role = formData.get(`tokens[${index}].role`) as string;
			const value = formData.get(`tokens[${index}].value`) as string;

			tokens.push({
				key: role.toLowerCase().replace(/\s+/g, ""),
				token: {
					value,
					role,
				},
			});
			
			index++;
		}

		const graphgqlClient = await getAuthorizedClient();

		await graphgqlClient.request(CREATE_COLOR_PALETTE, {
			input: {
				name,
				tokens,
			},
		});

		revalidatePath("/admin/");
		redirect("/admin");
	} catch (err: unknown) {
        if (err instanceof ClientError) {
            const graphQLError = err.response.errors?.[0];
            throw new Error(graphQLError?.message || "Something went wrong");
        }
        throw err;
    }
}