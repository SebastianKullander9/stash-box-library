import ToastNotification from "@/components/ui/admin/toast/ToastNotification";

export default async function CodePage({
	searchParams
}: {
	searchParams: Promise<{ status: "success" | "error"}>
}) {
	const { status } = await searchParams;

	return (
		<>
			{status && (
				<ToastNotification status={status} redirectTo="/admin/code"/>
			)}

			<div>
				<h1>Code</h1>
			</div>
		</>
	);
};