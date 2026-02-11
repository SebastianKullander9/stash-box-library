import ColorPaletteRendererExamples from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererExamples";
import { getOneColorPalette } from "@/actions/colorPalette";

export default async function ViewColorExamples({ params }: { params: { id: string } }) {
	const colorPalette = await getOneColorPalette(params.id);

	return (
		<ColorPaletteRendererExamples colorPalette={colorPalette} />
	);
};