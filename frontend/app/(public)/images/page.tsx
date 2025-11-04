import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import FileRendererThumbnail from "@/components/fileRenderer/thumbnail";
import Pagination from "@/components/ui/pagination/Pagination";

export default async function Images({ searchParams }: { searchParams: { page?: string }}) {
    const itemsPerPage = 20;
    const currentPage = Number(searchParams.page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

    const category = await getCategoryByName("Websites");
    const resources = await getResourceByCategory(category.id , itemsPerPage, currentOffset);

    return (
        <section className="main-x-padding container">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2xl">
                <FileRendererThumbnail resources={resources.items} />
            </div>
            <nav>
                <Pagination 
                    currentPage={currentPage}
                    totalCount={resources.totalCount} 
                    itemsPerPage={itemsPerPage}
                    pathname="/images"
                />
            </nav>
        </section>
    )
}