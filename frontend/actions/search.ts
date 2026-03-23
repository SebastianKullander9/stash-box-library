"use server";

import { SEARCH } from "@/graphql/queries/queries";
import { graphqlClient } from "@/lib/graphqlClient";
import { SearchObject } from "@/types/search";
import { ClientError } from "graphql-request";

export async function homePageSearch(query: string) {
	try {
		const data = await graphqlClient.request<{ search: SearchObject[] }>(
			SEARCH,
			{ query }
		);

		return data.search;
	} catch (err: unknown) {
		if (err instanceof ClientError) {
			throw new Error(err?.message || "Something went wrong");
		}
		throw err;
	}
}