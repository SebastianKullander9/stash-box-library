import AddCategory from "@/components/ui/admin/dashboard/cards/categories/AddCategory";
import ListCardCategories from "@/components/ui/admin/dashboard/cards/categories/list/ListCardCategories";
import ResourcesPerCategory from "@/components/ui/admin/dashboard/cards/categories/ResourcesPerCategory";
import { ResourceCategory } from "@/types";

interface DashboardProps {
	categories: ResourceCategory[];
	categoriesWithCount: ResourceCategory[];
}

export default function Dashboard({ categories, categoriesWithCount }: DashboardProps) {
	return (
			<div className="grid grid-cols-12 section-x-padding section-y-padding gap-xl">
				<div className="col-span-2 flex flex-col gap-xl">
					<AddCategory />
					<ResourcesPerCategory categoriesWithCount={categoriesWithCount} />
				</div>
				<div className="col-span-10">
					<ListCardCategories categories={categories} />
				</div>
			</div>
	);
}