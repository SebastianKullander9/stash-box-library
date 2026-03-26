import Link from "next/link";
import { 
	ChevronsLeft,
	ChevronsRight,
	ChevronLeft,
	ChevronRight
} from "lucide-react";
import { usePagination } from "@/components/hooks/usePagination";

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
    pathname: string;
}

export default function Pagination({ currentPage, totalCount, itemsPerPage, pathname }: PaginationProps) {
	const { pages, totalPages } = usePagination(currentPage, totalCount, itemsPerPage);

    const createPageURL = (page: number) => {
        return `${pathname}?page=${page}`;
    }

    return (
		<div className="inline-flex flex-row bg-surface rounded-full overflow-hidden">
			<div className="p-md border-r border-border cursor-pointer hover:bg-surface-hover">
				<ChevronsLeft />
			</div>
			<div className="p-md border-r border-border cursor-pointer hover:bg-surface-hover">
				<ChevronLeft />
			</div>

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
						<button
							className="py-md px-lg cursor-pointer hover:bg-surface-hover"
							key={page}
							disabled={page === currentPage}
						>
							{page}
						</button>
					)
				)}
			</div>

			<div className="p-md border-l border-border cursor-pointer hover:bg-surface-hover">
				<ChevronRight />
			</div>
			<div className="p-md border-l border-border cursor-pointer hover:bg-surface-hover">
				<ChevronsRight />
			</div>
		</div>
    );
}

/*
        <div className="flex flex-row gap-lg p-2xl justify-center">
            <Link 
                href={createPageURL(currentPage - 1)}
                className="p-sm bg-primary-900 rounded-sm hover:bg-primary-700 cursor-pointer transition-colors duration-150"
            >
                Prev
            </Link>

            <div className="p-sm bg-primary-900 rounded-sm">
                {currentPage} / {totalPages}
            </div>

            <Link 
                href={createPageURL(currentPage + 1)}
                className="p-sm bg-primary-900 rounded-sm hover:bg-primary-700 cursor-pointer transition-colors duration-150"
            >
                Next
            </Link>
        </div>
*/