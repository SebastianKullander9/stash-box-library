"use server";

import Dashboard from "@/components/adminDashboard/categories/Dashboard";
import { getCategories, getCategoriesWithCount } from "@/actions/category";

export default async function CategoriesPage() {
	const categories = await getCategories();
	const categoriesWithCount = await getCategoriesWithCount();

	return (
		<section>
			<Dashboard 
				categories={categories}
				categoriesWithCount={categoriesWithCount}
			/>
		</section>
	);
};