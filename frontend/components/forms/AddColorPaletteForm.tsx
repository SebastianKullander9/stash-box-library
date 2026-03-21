"use client";

import BaseButton from "../ui/buttons/BaseButton";
import Input from "../ui/inputs/Input";
import TokenInputs from "../ui/inputs/TokenInputs";
import { createColorPalette } from "@/actions/colorPalette";
import { useRouter } from "next/navigation";
import { useState } from "react";

const invalidHexColorParams = new URLSearchParams({
	status: "error",
	message: "Please fix invalid hex colors",
});

export default function AddColorPaletteForm() {
	const router = useRouter();
	const [tokenErrors, setTokenErrors] = useState<Record<number, string>>({});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const hasErrors = Object.values(tokenErrors).some(err => err !== "");

		if (hasErrors) {
			e.preventDefault();
			router.push(`/admin/add-color-palette?${invalidHexColorParams}`);
			return;
		}
	}

	return (
		<form
			id="addColorPaletteForm"
			action={createColorPalette}
			onSubmit={handleSubmit}
			className="flex flex-col py-xl gap-3xl max-w-[750px]"
		>
			<div className="text-center flex flex-col gap-md">
				<h2 className="text-2xl">
					Add a color palette here
				</h2>
				<p className="text-text-secondary max-w-prose">
					Just fill out the form with the required information, the asset can at this moment only be a color palette.
				</p>
			</div>

			<Input 
				label="Name"
				name="name"
				type="text"
				defaultValue=""
			/>

			<TokenInputs onErrorsChange={setTokenErrors} />

			<BaseButton 
				label="Add asset"
				type="submit"
			/>
		</form>
	);
};