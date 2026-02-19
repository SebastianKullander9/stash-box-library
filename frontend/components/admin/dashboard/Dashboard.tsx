import TotalResourcesCard from "@/components/ui/admin/dashboard/cards/totalResources/TotalResourcesCard";
import ResourceListCard from "../../ui/admin/dashboard/cards/resourceList/ResourceListCard";
import CategoriesCard from "@/components/ui/admin/dashboard/cards/categoriesCard/CategoriesCard";
import PopularTagsCard from "@/components/ui/admin/dashboard/cards/popularTagsCard/PopularTagsCard";
import { ResourcePage } from "@/types";
import { ResourceCategory } from "@/types";
import { PopularTag } from "@/components/ui/admin/dashboard/cards/popularTagsCard/PopularTagsCard";

interface DashboardProps {
    resources: ResourcePage;
	categories: ResourceCategory[];
	popularTags: PopularTag[];
}

export default function Dashboard({ resources, categories, popularTags }: DashboardProps) {
    return (
		<section className="grid grid-cols-12 section-x-padding section-y-padding gap-xl">
			<TotalResourcesCard resources={resources} />
			<CategoriesCard categories={categories} />
			<PopularTagsCard popularTags={popularTags} />
			<ResourceListCard resources={resources} />
		</section>
    )
}