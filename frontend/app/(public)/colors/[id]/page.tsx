import ColorPaletteRendererHome from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererHome";
import { getCachedColorPalette } from "@/lib/cache/colorPalette";

export default async function ViewColorHome({ params }: { params: { id: string } }) {
	const colorPalette = await getCachedColorPalette(params.id);

	return (
		<ColorPaletteRendererHome colorPalette={colorPalette} />
	);
};