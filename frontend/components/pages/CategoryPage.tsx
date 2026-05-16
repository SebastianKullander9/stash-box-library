import { ReactNode } from "react";
import Pagination from "../ui/pagination/Pagination";

interface CategoryPageProps {
    children: ReactNode;
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
    pathname: string;
}

export default function CategoryPage({
    children,
    currentPage,
    totalCount,
    itemsPerPage,
    pathname,
}: CategoryPageProps) {
    return (
        <section className="relative h-[calc(100vh-165px)]">
            <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">{children}</div>
            <div className="flex justify-center items-center py-3">
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    itemsPerPage={itemsPerPage}
                    pathname={pathname}
                />
            </div>
        </section>
    );
}
