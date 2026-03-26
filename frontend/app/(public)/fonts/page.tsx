import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import { getTagsByCategory } from "@/actions/tag";
import Renderer from "@/components/fileRenderer/thumbnail";
import EmptyState from "@/components/ui/emptyState/EmptyState";
import SideBar from "@/components/ui/sidebar/SideBar";
import { Suspense } from "react";

export default async function Fonts({ 
	searchParams 
}: { 
	searchParams: Promise<{ page?: string, tag?: string | string[], isVariable?: string, asc?: string }>
}) {
	const { page } = await searchParams;
    const itemsPerPage = 20;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

    const category = await getCategoryByName("Fonts");
    const resources = await getResourceByCategory(category.id , 20, 0);
	const filterTags = await getTagsByCategory("Fonts");

	if (!resources.items.length) return <EmptyState message="No fonts uploaded yet..." />

    return (
        <section className="grid grid-cols-12 m-xs gap-md flex-1">
			<div className="col-span-2">
				<Suspense fallback={<div>Loading filters...</div>} >
					<SideBar 
						tags={filterTags} 
					/>
				</Suspense>
			</div>
            <div className="col-span-10">
                <Renderer resources={resources.items} />
            </div>
        </section>
    )
}