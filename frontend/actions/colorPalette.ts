"use server";

import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { graphqlClient } from "@/lib/graphqlClient";
import { ClientError } from "graphql-request";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CREATE_COLOR_PALETTE } from "@/graphql/mutations/colorPaletteMutations";
import { GET_COLOR_PALETTES, GET_ONE_COLOR_PALETTE } from "@/graphql/queries/queries";
import { ColorPalette, ColorPalettesPage } from "@/types/colorPalette";

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

export async function getColorPalettes(limit?:number, offset?: number) {
	try {
		const data = await graphqlClient.request<{ colorPalettes: ColorPalettesPage}>(
			GET_COLOR_PALETTES,
			{
				limit,
				offset
			}
		);

		return data.colorPalettes;
	} catch (err: unknown) {
		if (err instanceof ClientError) {
			throw new Error(err?.message || "Something went wrong");
		}
		throw err;
	}
}

export async function getOneColorPalette(id: string) {
	try {
		const data = await graphqlClient.request<{ colorPalette: ColorPalette }>(
			GET_ONE_COLOR_PALETTE,
			{ id }
		);

		return data.colorPalette;
	} catch (err: unknown) {
		if (err instanceof ClientError) {
			throw new Error(err?.message || "Something went wrong");
		}
		throw err;
	}
}


/*
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

*/