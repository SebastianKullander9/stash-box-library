"use server";

import { getAuthorizedClient } from "@/lib/authorizedGraphqlClient";
import { ClientError } from "graphql-request";
import { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from "@/graphql/mutations/categoryMutations";
import { GET_CATEGORIES, GET_CATEGORIES_WITH_COUNT, GET_CATEGORY_BY_NAME } from "@/graphql/queries/queries";
import { graphqlClient } from "@/lib/graphqlClient";
import { revalidatePath } from "next/cache";
import { ResourceCategory } from "@/types";
import { redirect } from "next/navigation";

export async function createCategoryAction(formData: FormData) {
    try {
        const name = formData.get("categoryName");

        const graphqlClient = await getAuthorizedClient();
        await graphqlClient.request<{
            createCategory: { id: string; name: string };
        }>(CREATE_CATEGORY, { input: { name: name} });

        revalidatePath("/admin/categories");
    } catch (err: unknown) {
		if (err instanceof ClientError) {
			const message = err.response.errors?.[0]?.message ?? "Something went wrong";
			redirect(`/admin/categories?status=error&message=${encodeURIComponent(message)}`);
		}
		redirect("admin/categories?status=error");
	}

	redirect(`/admin/categories?status=success&message=Category+was+added+successfully.`);
}

export async function getCategories() {
    try {
        const data = await graphqlClient.request<{ categories: ResourceCategory[] }>(
            GET_CATEGORIES
        );

        return data.categories;
    } catch (err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong");
        }
        throw err;
    }
}

export async function getCategoriesWithCount() {
	try {
		const data = await graphqlClient.request<{ categoriesWithCount: ResourceCategory[] }>(
			GET_CATEGORIES_WITH_COUNT
		);

		return data.categoriesWithCount;
	} catch (err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong");
        }
        throw err;
    }
}

export async function updateCategory(formData: FormData) {
    try {
        const graphqlClient = await getAuthorizedClient();

        const id = formData.get("id");
        const name = formData.get("category");

        await graphqlClient.request<{
            updateCategory: { id: string, name: string };
        }>(UPDATE_CATEGORY, { input: { id, name } });

        revalidatePath("/admin/categories");
    } catch(err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong");
        }
        throw err;
    }
}

export async function deleteCategory(formData: FormData) {
    try {
        const graphqlClient = await getAuthorizedClient();

        const id = formData.get("id");

        await graphqlClient.request<{
            deleteCategory: { id: string };
        }>(DELETE_CATEGORY, { id: id});

        revalidatePath("/admin/categories");
    } catch (err: unknown) {
		if (err instanceof ClientError) {
			const message = err.response.errors?.[0]?.message ?? "Something went wrong";
			redirect(`/admin/categories?status=error&message=${encodeURIComponent(message)}`);
		}
		redirect("admin/categories?status=error");
	}

	redirect("/admin/categories?status=success&message=Category+was+deleted+successfully.")
}

export async function getCategoryByName(categoryName: string) {
    try {
        const data = await graphqlClient.request<{ category: ResourceCategory}>(
            GET_CATEGORY_BY_NAME,
            { categoryName }
        );

        return data.category;
    } catch(err: unknown) {
        if (err instanceof ClientError) {
            throw new Error(err?.message || "Something went wrong");
        }
        throw err;
    }
}