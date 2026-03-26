export function usePagination(currentPage: number, totalCount: number, itemsPerPage: number) {
	const totalPages = Math.ceil(totalCount / itemsPerPage);
	const windowSize = 5;
	const half = Math.floor(windowSize / 2);

	let start = currentPage - half;
	let end = currentPage + half;

	if (start < 1) {
		start = 1;
		end = Math.min(windowSize, totalPages);
	}
	if (end > totalPages) {
		end = totalPages;
		start = Math.max(1, totalPages - windowSize + 1);
	}

	const pages: (number | '...')[] = [];

	if (start > 1) pages.push('...');

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	if (end < totalPages) pages.push('...');

	return { pages, totalPages };
}