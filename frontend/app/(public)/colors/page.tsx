import { getColorPalettes } from "@/actions/colorPalette";
import { ColorPalettesPage } from "@/types/colorPalette";
import ColorPaletteRenderer from "@/components/fileRenderer/thumbnail/ColorPaletteRenderer";

export default async function Colors({ searchParams }: { searchParams: { page?: string }}) {
    const itemsPerPage = 20;
    const currentPage = Number(searchParams.page) || 1;
    const currentOffset = (currentPage - 1) * itemsPerPage;

	const colorPalettes = await getColorPalettes(itemsPerPage, currentOffset);

	return (
		<ColorPaletteRenderer colorPalettes={colorPalettes.items}/>
	);
};

