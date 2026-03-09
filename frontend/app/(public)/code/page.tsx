import { getCodes } from "@/actions/code";
import CodesRenderer from "@/components/fileRenderer/thumbnail/CodeRenderer";

export default async function Code({ searchParams }: { searchParams: { page?: string }}) {
	const itemsPerPage = 20;
	const currentPage = Number(searchParams.page) || 1;
	const currentOffset = (currentPage - 1) * itemsPerPage;

	const codes = await getCodes(itemsPerPage, currentOffset);  
	
	return (
		<CodesRenderer codes={codes.items} />
	);
};