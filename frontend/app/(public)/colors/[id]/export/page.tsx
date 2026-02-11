import ColorPaletteRendererExport from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererExport";
import { getOneColorPalette } from "@/actions/colorPalette";

export default async function ViewColorExport({ params }: { params: { id: string } }) {
	const colorPalette = await getOneColorPalette(params.id);

	return (
		<ColorPaletteRendererExport colorPalette={colorPalette} />
	);
};