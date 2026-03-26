import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import { getTagsByCategory } from "@/actions/tag";
import Renderer from "@/components/fileRenderer/thumbnail";
import EmptyState from "@/components/ui/emptyState/EmptyState";
import SideBar from "@/components/ui/sidebar/SideBar";
import { Suspense } from "react";
import Pagination from "@/components/ui/pagination/Pagination";

export default async function Fonts({ 
	searchParams 
}: { 
	searchParams: Promise<{ page?: string, tag?: string | string[], variable?: string, asc?: string }>
}) {
	const { page, tag, variable, asc } = await searchParams;
    const itemsPerPage = 6;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;
	const tagNames = Array.isArray(tag) ? tag : tag ? [tag] : [];
	const isVariable = variable === "true" ? true : undefined;
	const orderAsc = asc === "true";

    const category = await getCategoryByName("Fonts");
    const resources = await getResourceByCategory(
		category.id,
		itemsPerPage, 
		currentOffset,
		{ tagNames, isVariable, orderAsc}
	);
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
            <div className="col-span-10 flex flex-col gap-md">
                <Renderer resources={resources.items} />
				<div className="flex flex-row justify-center">
					<Pagination 
						currentPage={currentPage}  
						totalCount={resources.totalCount}  
						itemsPerPage={itemsPerPage}  
						pathname={"/fonts"} 
					/>
				</div>
            </div>
        </section>
    )
}