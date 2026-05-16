import { getCodes } from "@/actions/code";
import CodesRenderer from "@/components/fileRenderer/thumbnail/CodeRenderer";
import EmptyState from "@/components/ui/emptyState/EmptyState";

export default async function Code({ 
	searchParams 
}: { 
	searchParams: Promise<{ page?: string }>
}) {
	const { page } = await searchParams;
	const itemsPerPage = 20;
	const currentPage = Number(page) || 1;
	const currentOffset = (currentPage - 1) * itemsPerPage;

	const codes = await getCodes(itemsPerPage, currentOffset);  

	if (!codes.items.length) return <EmptyState message="No code/files uploaded yet..." />
	
	return (
		<CodesRenderer codes={codes.items} />
	);
};