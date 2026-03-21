import AddColorPaletteForm from "@/components/forms/AddColorPaletteForm";
import CardWrapper from "@/components/ui/admin/dashboard/cardWrapper/CardWrapper";
import ToastNotification from "@/components/ui/admin/toast/ToastNotification";

export default async function AddColorPalette({
	searchParams
}: {
	searchParams: Promise<{ status?: "success" | "error" }>
}) {
	const { status } = await searchParams;

	return (
		<>
			{status && (
				<ToastNotification status={status} redirectTo="/admin/add-color-palette"/>
			)}

			<section className="p-2xl flex justify-center">
				<CardWrapper colSpan="col-span-12">
					<AddColorPaletteForm />
				</CardWrapper>
			</section>
		</>

	);
};

