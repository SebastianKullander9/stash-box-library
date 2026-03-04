import AddCategory from "@/components/ui/admin/dashboard/cards/categories/AddCategory";
import ListCardCategories from "@/components/ui/admin/dashboard/cards/categories/list/ListCardCategories";
import ResourcesPerCategory from "@/components/ui/admin/dashboard/cards/categories/ResourcesPerCategory";
import { ResourceCategory } from "@/types";

interface DashboardProps {
	categories: ResourceCategory[];
	categoriesWithCount: ResourceCategory[];
}

export default function Dashboard({ categories, categoriesWithCount }: DashboardProps ) {
	return (
		<div className="grid grid-cols-12 section-x-padding section-y-padding gap-xl">
			<AddCategory />
			<ListCardCategories categories={categories} />
			<ResourcesPerCategory categoriesWithCount={categoriesWithCount}/>
		</div>
	);
};