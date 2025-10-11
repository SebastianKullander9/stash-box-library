"use client";

import { useState } from "react";
import { createResourceAction } from "@/actions/resource";
import Select from "@/components/ui/inputs/Select";
import FileInput from "../ui/inputs/FileInput";
import Input from "../ui/inputs/Input";
import BaseButton from "../ui/buttons/BaseButton";

type Category = { id: string; name: string };
type Tag = { id: string; name: string };

type AddResourceFormProps = {
    categories: Category[];
    tags: Tag[];
};

export default function AddResourceForm({ categories, tags }: AddResourceFormProps) {
    const [loading, setLoading] = useState(false);

    return (
        <form
            action={async (formData) => {
                setLoading(true);
                await createResourceAction(formData);
                setLoading(false);
            }}
        >
            <Input label="Title" name="title" type="text" />
            <Input label="Description" name="description" type="text" />
            <Input label="Additional text" name="textContent" type="text" />
            <div className="pt-2">
                <FileInput name="files" label="Upload files" />
            </div>
            <Select label="Category" name="category" options={categories} />
            <Select label="Tags" name="tags" options={tags} multiple />
            <BaseButton
                label={loading ? "Uploading..." : "Create resource"}
                type="submit"
                disabled={loading}
            />
        </form>
    );
}