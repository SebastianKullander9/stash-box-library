import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import Renderer from "@/components/fileRenderer/thumbnail";
import Pagination from "@/components/ui/pagination/Pagination";
import EmptyState from "@/components/ui/emptyState/EmptyState";

export default async function Fonts({ 
	searchParams 
}: { 
	searchParams: Promise<{ page?: string }>
}) {
	const { page } = await searchParams;
    const itemsPerPage = 20;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

    const category = await getCategoryByName("Fonts");
    const resources = await getResourceByCategory(category.id , 20, 0);

	if (!resources.items.length) return <EmptyState message="No fonts uploaded yet..." />

    return (
        <section className="main-x-padding container">
            <div className="flex flex-col gap-4xl">
                <Renderer resources={resources.items} />
            </div>
            <nav>
                <Pagination 
                    currentPage={currentPage}
                    totalCount={resources.totalCount} 
                    itemsPerPage={itemsPerPage}
                    pathname="/fonts"
                />
            </nav>
        </section>
    )
}