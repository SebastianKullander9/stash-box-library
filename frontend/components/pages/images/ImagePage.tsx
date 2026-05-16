import FileRendererThumbnail from "@/components/fileRenderer/thumbnail";
import { ResourcePage } from "@/types";
import CategoryPage from "../CategoryPage";

interface ImagePageProps {
    resources: ResourcePage;
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
}

export default function ImagePage({
    resources,
    currentPage,
    totalCount,
    itemsPerPage,
}: ImagePageProps) {
    return (
        <CategoryPage
            currentPage={currentPage}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            pathname="Images"
        >
            <FileRendererThumbnail resources={resources.items} colSpan="grid grid-cols-12" />
        </CategoryPage>
    );
}
