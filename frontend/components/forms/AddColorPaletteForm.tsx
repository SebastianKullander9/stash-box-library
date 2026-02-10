"use server";

import BaseButton from "../ui/buttons/BaseButton";
import Input from "../ui/inputs/Input";
import TokenInputs from "../ui/inputs/TokenInputs";
import { createColorPalette } from "@/actions/colorPalette";

export default async function AddColorPaletteForm() {
	return (
		<form
			id="addColorPaletteForm"
			action={createColorPalette}
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

			<TokenInputs />

			<BaseButton 
				label="Add asset"
				type="submit"
			/>
		</form>
	);
};