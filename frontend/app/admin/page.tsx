import Dashboard from "@/components/admin/dashboard/Dashboard";
import { getResources } from "@/actions/resource";
import { getCategories } from "@/actions/category";
import { getPopularTags } from "@/actions/tag";

export default async function Admin() {
    const resources = await getResources(20, 0);
	const categories = await getCategories();
	const popularTags = await getPopularTags();

	console.log(popularTags)

    return (
        <section>
            <Dashboard 
				resources={resources} 
				categories={categories} 
				popularTags={popularTags}
			/>
        </section>
    );
}