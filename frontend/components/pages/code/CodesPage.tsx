import CategoryPage from "../CategoryPage";
import { CodePage } from "@/types/code";
import CodesRenderer from "@/components/fileRenderer/thumbnail/CodeRenderer";

interface CodePageProps {
    codes: CodePage;
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
}
export default function CodesPage({ codes, currentPage, totalCount, itemsPerPage }: CodePageProps) {
    return (
        <CategoryPage
            currentPage={currentPage}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            pathname="Code"
        >
            <CodesRenderer codes={codes.items} />
        </CategoryPage>
    );
}
