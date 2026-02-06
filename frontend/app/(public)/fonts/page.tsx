import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import FileRendererThumbnail from "@/components/fileRenderer/thumbnail";
import Pagination from "@/components/ui/pagination/Pagination";

export default async function Fonts({ searchParams }: { searchParams: { page?: string }}) {
    const itemsPerPage = 20;
    const currentPage = Number(searchParams.page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

    const category = await getCategoryByName("Fonts");
    const resources = await getResourceByCategory(category.id , 20, 0);

    return (
        <section className="main-x-padding container">
            <div className="flex flex-col gap-4xl">
                <FileRendererThumbnail resources={resources.items} />
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