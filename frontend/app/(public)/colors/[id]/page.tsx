import ColorPaletteRendererHome from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererHome";
import { getCachedColorPalette } from "@/lib/cache/colorPalette";

export default async function ViewColorHome({ 
	params 
}: { 
	params: Promise<{ id: string }>
}) {
	const { id } = await params;
	const colorPalette = await getCachedColorPalette(id);

	return (
		<ColorPaletteRendererHome colorPalette={colorPalette} />
	);
};