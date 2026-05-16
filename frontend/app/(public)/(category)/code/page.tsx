import { getCodes } from "@/actions/code";
import CodesPage from "@/components/pages/code/CodesPage";
import EmptyState from "@/components/ui/emptyState/EmptyState";

export default async function Code({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;
    const itemsPerPage = 20;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

    const codes = await getCodes(itemsPerPage, currentOffset);

    if (!codes.items.length) return <EmptyState message="No code/files uploaded yet..." />;

    return (
        <CodesPage
            codes={codes}
            currentPage={currentPage}
            totalCount={codes.items.length}
            itemsPerPage={itemsPerPage}
        />
    );
}
