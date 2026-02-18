"use server";

import { CodeFile } from "@/types/code";
import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { ClientError } from "graphql-request";
import { CREATE_CODE } from "@/graphql/mutations/codeMutations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCode(formData: FormData) {
	try {
		const title = formData.get("title");
		const description = formData.get("description");
		const codeBlocks: CodeFile[] = [];

		let index = 0;

		while (formData.has(`title[${index}]`)) {
			const title = formData.get(`title[${index}]`) as string;
			const language = formData.get(`language[${index}]`) as string;
			const codeBlock = formData.get(`codeblock[${index}]`) as string;

			codeBlocks.push({
				title,
				language,
				content: codeBlock,
			});

			index++;
		}

		const graphgqlClient = await getAuthorizedClient();

		await graphgqlClient.request(CREATE_CODE, {
			input: {
				title,
				description,
				codeFiles: codeBlocks
			}
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