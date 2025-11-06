"use server";

import { getTags } from "@/actions/tag";
import { getCategories } from "@/actions/category";
import { createResourceAction } from "@/actions/resource";
import FileInput from "../ui/inputs/FileInput";
import Select from "../ui/inputs/Select";
import Input from "../ui/inputs/Input";
import BaseButton from "../ui/buttons/BaseButton";

export default async function AddResourceForm() {
    const [tags, categories] = await Promise.all([
        getTags(),
        getCategories(),
    ]);

    return (
        <form 
            action={createResourceAction}
            className="flex flex-col gap-md"
        >
            <FileInput label="Upload a resource" name="resource"/>
            <Select label="Choose category" name="category" options={categories} />
            <Input label="Title" name="title" type="text" />
            <Input label="Description" name="description" type="text" />
            <Input label="Additional text" name="textContent" type="text" />
            <Select label="Tags" name="tags" options={tags} />
            <BaseButton label="Add resource" type="submit" />
        </form>
    )
}