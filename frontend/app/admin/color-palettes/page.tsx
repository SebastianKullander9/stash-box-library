import ToastNotification from "@/components/ui/admin/toast/ToastNotification";

export default async function ColorPalettesPage({
	searchParams
}: {
	searchParams: Promise<{ status: "success" | "error" }>
}) {
	const { status } = await searchParams;

	return (
		<>
			{status && (
				<ToastNotification status={status} redirectTo="/admin/color-palettes" />
			)}

			<div>
				<h1>Color palettes</h1>
			</div>
		</>

	);
};