import ColorPaletteRendererExamples from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererExamples";
import { getCachedColorPalette } from "@/lib/cache/colorPalette";

export default async function ViewColorExamples({ params }: { params: { id: string } }) {
	const colorPalette = await getCachedColorPalette(params.id);

	return (
		<ColorPaletteRendererExamples colorPalette={colorPalette} />
	);
};