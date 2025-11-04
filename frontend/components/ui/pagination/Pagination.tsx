import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
    pathname: string;
}

export default function Pagination({ currentPage, totalCount, itemsPerPage, pathname }: PaginationProps) {
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const createPageURL = (page: number) => {
        return `${pathname}?page=${page}`;
    }

    return (
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
    );
}