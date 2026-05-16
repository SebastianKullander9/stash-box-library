import Link from "next/link";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/components/hooks/usePagination";

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
    pathname: string;
}

export default function Pagination({
    currentPage,
    totalCount,
    itemsPerPage,
    pathname,
}: PaginationProps) {
    const { pages, totalPages } = usePagination(currentPage, totalCount, itemsPerPage);

    const createPageURL = (page: number) => {
        const clamped = Math.max(1, Math.min(page, totalPages));
        return `${pathname}?page=${clamped}`;
    };

    return (
        <div className="inline-flex flex-row bg-surface rounded-full overflow-hidden">
            <Link
                href={createPageURL(1)}
                className={`p-md border-r border-border ${currentPage === 1 ? "pointer-events-none text-text-secondary" : "cursor-pointer hover:bg-surface-hover"}`}
            >
                <ChevronsLeft />
            </Link>
            <Link
                href={createPageURL(currentPage - 1)}
                className={`p-md border-r border-border ${currentPage === 1 ? "pointer-events-none text-text-secondary" : "cursor-pointer hover:bg-surface-hover"}`}
            >
                <ChevronLeft />
            </Link>

            <div className="flex flex-row">
                {pages.map((page, i) =>
                    page === "..." ? (
                        <span
                            className="py-md px-lg cursor-pointer hover:bg-surface-hover"
                            key={`ellipsis-${i}`}
                        >
                            . . .
                        </span>
                    ) : (
                        <Link
                            href={createPageURL(page)}
                            className={`py-md px-lg cursor-pointer  ${page === currentPage ? "bg-surface-active" : "hover:bg-surface-hover"}`}
                            key={page}
                        >
                            {page}
                        </Link>
                    ),
                )}
            </div>

            <Link
                href={createPageURL(currentPage + 1)}
                className={`p-md border-l border-border ${currentPage === totalPages ? "pointer-events-none text-text-secondary" : "cursor-pointer hover:bg-surface-hover"}`}
            >
                <ChevronRight />
            </Link>
            <Link
                href={createPageURL(totalPages)}
                className={`p-md border-l border-border ${currentPage === totalPages ? "pointer-events-none text-text-secondary" : "cursor-pointer hover:bg-surface-hover"}`}
            >
                <ChevronsRight />
            </Link>
        </div>
    );
}
