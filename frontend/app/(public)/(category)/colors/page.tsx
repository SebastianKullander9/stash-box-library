import { getColorPalettes } from "@/actions/colorPalette";
import ColorPage from "@/components/pages/colors/ColorPage";
import EmptyState from "@/components/ui/emptyState/EmptyState";

export default async function Colors({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const itemsPerPage = 20;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

    const colorPalettes = await getColorPalettes(itemsPerPage, currentOffset);

    if (!colorPalettes.items.length)
        return <EmptyState message="No color palettes uploaded yet..." />;

    return (
        <ColorPage
            colorPalettes={colorPalettes}
            currentPage={currentPage}
            totalCount={colorPalettes.totalCount}
            itemsPerPage={itemsPerPage}
        />
    );
}
