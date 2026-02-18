"use server";

import BaseButton from "../ui/buttons/BaseButton";
import Input from "../ui/inputs/Input";
import TagInput from "../ui/inputs/TagInput";
import { getTags } from "@/actions/tag";
import CodeInputs from "../ui/inputs/CodeInputs";
import { createCode } from "@/actions/code";

export default async function AddCodeForm() {
	const tags = await getTags();

	return (
		<form
			id="addCodeForm"
			action={createCode}
			className="flex flex-col gap-md"
		>
			<div className="text-center flex flex-col gap-md">
				<h2 className="text-2xl">
					Add you code here
				</h2>
				<p className="text-text-secondary max-w-prose">
					Just fill out the form with the required information, the asset can at this moment only consist of code/text.
				</p>
			</div>
			<Input 
				label="Title"
				name="title"
				type="text"
				defaultValue=""
			/>
			<Input
				label="Description"
				name="description"
				type="text"
				defaultValue=""
			/>
			<CodeInputs />
			<TagInput label="Add tags" name="tags" type="text" tags={tags} />
			<BaseButton 
				label="Add code"
				type="submit"
			/>
		</form>
	);
};