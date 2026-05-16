import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import { getTagsByCategory } from "@/actions/tag";
import EmptyState from "@/components/ui/emptyState/EmptyState";
import FontPage from "@/components/pages/fonts/FontPage";

export default async function Fonts({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        tag?: string | string[];
        variable?: string;
        asc?: string;
    }>;
}) {
    const { page, tag, variable, asc } = await searchParams;
    const itemsPerPage = 8;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;
    const tagNames = Array.isArray(tag) ? tag : tag ? [tag] : [];
    const isVariable = variable === "true" ? true : undefined;
    const orderAsc = asc === "true";

    const category = await getCategoryByName("Fonts");
    const resources = await getResourceByCategory(category.id, itemsPerPage, currentOffset, {
        tagNames,
        isVariable,
        orderAsc,
    });
    const filterTags = await getTagsByCategory("Fonts");

    if (!resources.items.length) return <EmptyState message="No fonts uploaded yet..." />;

    return (
        <FontPage
            filterTags={filterTags}
            resources={resources}
            currentPage={currentPage}
            totalCount={resources.totalCount}
            itemsPerPage={itemsPerPage}
        />
    );
}
