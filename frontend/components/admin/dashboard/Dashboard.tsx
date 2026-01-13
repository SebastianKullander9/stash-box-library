import TotalResourcesCard from "@/components/ui/dashboard/cards/totalResources/TotalResourcesCard";
import ResourceListCard from "../../ui/dashboard/cards/resourceList/ResourceListCard";
import CategoriesCard from "@/components/ui/dashboard/cards/categoriesCard/CategoriesCard";
import PopularTagsCard from "@/components/ui/dashboard/cards/popularTagsCard/PopularTagsCard";
import { ResourcePage } from "@/types";
import { ResourceCategory } from "@/types";
import { PopularTag } from "@/components/ui/dashboard/cards/popularTagsCard/PopularTagsCard";

interface DashboardProps {
    resources: ResourcePage;
	categories: ResourceCategory[];
	popularTags: PopularTag[];
}

export default function Dashboard({ resources, categories, popularTags }: DashboardProps) {
    return (
        <section className="grid grid-cols-12 section-x-padding py-2xl gap-xl">
			<TotalResourcesCard resources={resources} />
			<CategoriesCard categories={categories} />
			<PopularTagsCard popularTags={popularTags} />
            <ResourceListCard resources={resources} />
        </section>
    )
}