"use server";

import { Code, CodeFile } from "@/types/code";
import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { ClientError } from "graphql-request";
import { CREATE_CODE, UPDATE_CODE_FILES } from "@/graphql/mutations/codeMutations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { graphqlClient } from "@/lib/graphqlClient";
import { CodePage } from "@/types/code";
import { GET_CODES, GET_ONE_CODE } from "@/graphql/queries/queries";

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
				codeFiles: codeBlocks,
				categoryName: "Code",
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

export async function updateCodeResource(formData: FormData) {
	try {

	} catch (err: unknown) {
		if (err instanceof ClientError) {
			const graphQLError = err.response.errors?.[0];
			throw new Error(graphQLError?.message || "Something went wrong");
		}
		throw err;
	}
}

export async function updateCodeFiles(id: string, formData: FormData) {
  	try {
		const fileIds = formData.getAll("fileIds") as string[];
		const deletedFileIds = fileIds.filter((id) => formData.get(`delete_${id}`) === "on");
		const activeFileIds = fileIds.filter((id) => !deletedFileIds.includes(id));

		const codeFiles = activeFileIds.map((fileId) => ({
			id: fileId,
			title: formData.get(`title_${fileId}`) as string,
			content: formData.get(`content_${fileId}`) as string,
		}));

		const client = await getAuthorizedClient();
			await client.request(UPDATE_CODE_FILES, {
			id,
			input: { codeFiles, deletedFileIds },
		});

		revalidatePath(`/code/${id}`);
		redirect(`/code/${id}`);
	} catch (err: unknown) {
		if (err instanceof ClientError) {
			const graphQLError = err.response.errors?.[0];
			throw new Error(graphQLError?.message || "Something went wrong");
		}
		throw err;
	}
}

export async function getCodes(limit?: number, offset?: number) {
	try {
		const data = await graphqlClient.request<{ codes: CodePage }>(
			GET_CODES,
			{
				limit,
				offset
			}
		);

		return data.codes;
	} catch (err: unknown) {
		if (err instanceof ClientError) {
			const graphQLError = err.response.errors?.[0];
			throw new Error(graphQLError?.message || "Something went wrong");
		}
		throw err;
	}
}

export async function getOneCode(id: string) {
	try {
		const data = await graphqlClient.request<{ code: Code }>(
			GET_ONE_CODE,
			{ id }
		);

		return data.code;
	} catch (err: unknown) {
		if (err instanceof ClientError) {
			const graphQLError = err.response.errors?.[0];
			throw new Error(graphQLError?.message || "Something went wrong");
		}
		throw err;
	}
}