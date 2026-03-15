import ColorPaletteRendererExport from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererExport";
import { getCachedColorPalette } from "@/lib/cache/colorPalette";

export default async function ViewColorExport({ params }: { params: { id: string } }) {
	const colorPalette = await getCachedColorPalette(params.id);

	return (
		<ColorPaletteRendererExport colorPalette={colorPalette} />
	);
};