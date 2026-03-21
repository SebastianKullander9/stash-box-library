import AddResourceForm from "@/components/forms/AddResourceForm";
import ToastNotification from "@/components/ui/admin/toast/ToastNotification";
import CardWrapper from "@/components/ui/admin/dashboard/cardWrapper/CardWrapper";
import { getTags } from "@/actions/tag";
import { getCategories } from "@/actions/category";

export default async function AddResource({
	searchParams
}: {
	searchParams: Promise<{ status?: "success" | "error" }>
}) {
	const [tags, categories] = await Promise.all([
		getTags(),
		getCategories(),
	]);

	const { status } = await searchParams;

	return (
		<>
			{status && (
				<ToastNotification status={status} redirectTo={"/admin/add-resource"} />
			)}

			<section className="p-2xl flex justify-center">
				<CardWrapper colSpan="col-span-12">
					<AddResourceForm tags={tags} categories={categories} />
				</CardWrapper>
			</section>
		</>
	);
};