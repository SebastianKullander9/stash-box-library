import AddColorPaletteForm from "@/components/forms/AddColorPaletteForm";
import CardWrapper from "@/components/ui/dashboard/cardWrapper/CardWrapper";

import { getTags } from "@/actions/tag";

export default function AddColorPalette() {
	return (
		<section className="p-2xl flex justify-center">
			<CardWrapper colSpan="col-span-12">
				<AddColorPaletteForm />
			</CardWrapper>
		</section>
	);
};

