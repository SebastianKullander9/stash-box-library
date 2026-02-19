import AddColorPaletteForm from "@/components/forms/AddColorPaletteForm";
import CardWrapper from "@/components/ui/admin/dashboard/cardWrapper/CardWrapper";

export default function AddColorPalette() {
	return (
		<section className="p-2xl flex justify-center">
			<CardWrapper colSpan="col-span-12">
				<AddColorPaletteForm />
			</CardWrapper>
		</section>
	);
};

