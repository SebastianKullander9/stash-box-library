"use server";

import { getTags } from "@/actions/tag";
import { getCategories } from "@/actions/category";
import { createResourceAction } from "@/actions/resource";
import FileInput from "../ui/inputs/FileInput";
import TagInput from "../ui/inputs/TagInput";
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
            id="addResourceForm"
            action={createResourceAction}
            className="flex flex-col gap-md"
        >
            <div className="flex flex-row gap-xl">
                <div>
                    <FileInput label="Upload a resource" name="files"/>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <Select label="Choose category" name="category" options={categories} />
                    <Input label="Title" name="title" type="text" />
                    <Input label="Description" name="description" type="text" />
                    <Input label="Additional text" name="textContent" type="text" />
                    <TagInput label="Add tags" name="tags" type="text" tags={tags} />
                </div>
            </div>
            <BaseButton label="Add resource" type="submit" />
        </form>
    )
}