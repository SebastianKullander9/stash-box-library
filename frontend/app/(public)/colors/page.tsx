import { getColorPalettes } from "@/actions/colorPalette";
import ColorPaletteRenderer from "@/components/fileRenderer/thumbnail/ColorPaletteRenderer";
import EmptyState from "@/components/ui/emptyState/EmptyState";

export default async function Colors({ 
	searchParams 
}: { 
	searchParams: Promise<{ page?: string }>
}) {
	const { page } = await searchParams;
    const itemsPerPage = 20;
    const currentPage = Number(page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

	const colorPalettes = await getColorPalettes(itemsPerPage, currentOffset);

	if (!colorPalettes.items.length) return <EmptyState message="No color palettes uploaded yet..." />

	return (
		<ColorPaletteRenderer colorPalettes={colorPalettes.items}/>
	);
};

