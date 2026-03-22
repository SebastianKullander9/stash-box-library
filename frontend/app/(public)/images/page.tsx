import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import Renderer from "@/components/fileRenderer/thumbnail";
import Pagination from "@/components/ui/pagination/Pagination";
import { getRendererType } from "@/components/fileRenderer/thumbnail/rendererLayoutConfig";
import { rendererConfig } from "@/components/fileRenderer/thumbnail/rendererLayoutConfig";
import EmptyState from "@/components/ui/emptyState/EmptyState";

export default async function Images({ 
	searchParams 
}: { 
	searchParams: Promise<{ page?: string }>
}) {
	const { page } = await searchParams;
    const itemsPerPage = 20;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

    const category = await getCategoryByName("Images");
    const resources = await getResourceByCategory(category.id , itemsPerPage, currentOffset);

	if (!resources.items.length) return <EmptyState message="No images uploaded yet..." />
	
	const rendererType = getRendererType(resources.items[0]);
	const layout = rendererConfig[rendererType];

    return (
        <section className={`main-x-padding container grid ${layout.grid} section-x-padding sm:px-0`}>
            <Renderer resources={resources.items} colSpan={layout.thumbnail} />
            <nav>

            </nav>
        </section>
    )
}