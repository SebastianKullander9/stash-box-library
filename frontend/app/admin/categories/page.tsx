"use server";

import Dashboard from "@/components/adminDashboard/categories/Dashboard";
import { getCategories, getCategoriesWithCount } from "@/actions/category";
import ToastNotification from "@/components/ui/admin/toast/ToastNotification";

export default async function CategoriesPage({
	searchParams
}: {
	searchParams: Promise<{ status?: "success" | "error" }>
}) {
	const categories = await getCategories();
	const categoriesWithCount = await getCategoriesWithCount();

	const { status } = await searchParams;

	return (
		<>
			{status && (
				<ToastNotification status={status} redirectTo="/admin/categories" />
			)}

			<section>
				<Dashboard 
					categories={categories}
					categoriesWithCount={categoriesWithCount}
				/>
			</section>
		</>
	);
};