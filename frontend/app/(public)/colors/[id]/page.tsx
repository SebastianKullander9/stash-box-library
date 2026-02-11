import ColorPaletteRendererHome from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererHome";
import { getOneColorPalette } from "@/actions/colorPalette";

export default async function ViewColorHome({ params }: { params: { id: string } }) {
	const colorPalette = await getOneColorPalette(params.id);

	return (
		<ColorPaletteRendererHome colorPalette={colorPalette} />
	);
};