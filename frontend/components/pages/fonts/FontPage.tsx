import FileRendererThumbnail from "@/components/fileRenderer/thumbnail";
import { ResourcePage } from "@/types";
import CategoryPage from "../CategoryPage";

interface FontPageProps {
    resources: ResourcePage;
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
}

export default function FontPage({
    resources,
    currentPage,
    totalCount,
    itemsPerPage,
}: FontPageProps) {
    return (
        <CategoryPage
            currentPage={currentPage}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            pathname="/fonts"
        >
            <FileRendererThumbnail resources={resources.items} />
        </CategoryPage>
    );
}
