import ColorPaletteRendererExamples from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererExamples";
import { getCachedColorPalette } from "@/lib/cache/colorPalette";

export default async function ViewColorExamples({ 
	params 
}: { 
	params: Promise<{ id: string }>
}) {
	const { id } = await params;
	const colorPalette = await getCachedColorPalette(id);

	return (
		<ColorPaletteRendererExamples colorPalette={colorPalette} />
	);
};