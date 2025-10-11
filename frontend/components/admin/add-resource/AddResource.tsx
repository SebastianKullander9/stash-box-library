"use server";

import AddResourceForm from "@/components/forms/AddResourceForm";
import { getCategories } from "@/actions/category"
import { getTags } from "@/actions/tag"

export default async function AddResource() {
    const categories = await getCategories();
    const tags = await getTags();

    return (
        <div className="text-white text-normal">
            <h2 className="text-sm">Add Resource</h2>
            <AddResourceForm categories={categories} tags={tags} />
        </div>
    )
}