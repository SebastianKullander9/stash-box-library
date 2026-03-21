"use client";

import { ResourceTag, ResourceCategory } from "@/types";
import { createResourceAction } from "@/actions/resource";
import FileInput from "../ui/inputs/FileInput";
import TagInput from "../ui/inputs/TagInput";
import Select from "../ui/inputs/Select";
import Input from "../ui/inputs/Input";
import BaseButton from "../ui/buttons/BaseButton";
import { useRouter } from "next/navigation";

interface AddResourceFormInterface {
	tags: ResourceTag[];
	categories: ResourceCategory[];
}

const noFilesErrorParams = new URLSearchParams({
	status: "error",
	message: "You need to upload at least one file."
});

const fileTooLargeErrorParams = new URLSearchParams({
	status: "error",
	message: "File(s) is too large (max 4mb)"
})

export default function AddResourceForm({ tags, categories }: AddResourceFormInterface) {
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget;
		const files = form.querySelectorAll("input[type='file']");
		let totalFiles = 0;
		let totalSize = 0;
		const maxSize = 4 * 1024 * 1024

		files.forEach((input) => {
			const fileInput = input as HTMLInputElement;
			Array.from(fileInput.files ?? []).forEach((file) => {
				totalSize += file.size;
				totalFiles++;
			});
		});

		if (totalFiles === 0) {
			e.preventDefault();
			router.push(`/admin/add-resource?${noFilesErrorParams}`);
			return;
		}

		if (totalSize > maxSize) {
			e.preventDefault();
			router.push(`/admin/add-resource?${fileTooLargeErrorParams }`)
		}
	}

    return (
        <form
            id="addResourceForm"
            action={createResourceAction}
			onSubmit={handleSubmit}
            className="flex flex-col py-xl gap-3xl max-w-[750px]"
        >
			<div className="text-center flex flex-col gap-md">
				<h2 className="text-2xl">
					Add a resource here
				</h2>
				<p className="text-text-secondary max-w-prose">
					Just fill out the form with the required information, the resource can be anything from an image, code, website, model, etc.
				</p>
			</div>
            <div className="flex flex-row gap-3xl">
                <div className="w-1/3">
                    <FileInput label="Upload a resource" name="files"/>
                </div>
                <div className="w-2/3 flex flex-col gap-md">
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