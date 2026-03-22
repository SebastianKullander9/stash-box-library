import ColorPaletteRendererExport from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererExport";
import { getCachedColorPalette } from "@/lib/cache/colorPalette";

export default async function ViewColorExport({ 
	params 
}: { 
	params: Promise<{ id: string }>
}) {
	const { id } = await params;
	const colorPalette = await getCachedColorPalette(id);

	return (
		<ColorPaletteRendererExport colorPalette={colorPalette} />
	);
};