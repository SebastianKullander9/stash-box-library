import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import Renderer from "@/components/fileRenderer/thumbnail";
import Pagination from "@/components/ui/pagination/Pagination";
import { getRendererType } from "@/components/fileRenderer/thumbnail/rendererLayoutConfig";
import { rendererConfig } from "@/components/fileRenderer/thumbnail/rendererLayoutConfig";
import EmptyState from "@/components/ui/emptyState/EmptyState";
import ImagePage from "@/components/pages/images/ImagePage";

export default async function Images({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const itemsPerPage = 20;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

    const category = await getCategoryByName("Images");
    const resources = await getResourceByCategory(category.id, itemsPerPage, currentOffset);

    if (!resources.items.length) return <EmptyState message="No images uploaded yet..." />;

    const rendererType = getRendererType(resources.items[0]);
    const layout = rendererConfig[rendererType];

    return (
        <ImagePage
            resources={resources}
            currentPage={currentPage}
            totalCount={resources.totalCount}
            itemsPerPage={itemsPerPage}
        />
    );
}
