import ColorPaletteRendererExamples from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererExamples";
import { ColorPalette } from "@/types/colorPalette";

export default async function ViewColorExamples({ colorPalette }: { colorPalette: ColorPalette }) {
	return (
		<ColorPaletteRendererExamples colorPalette={colorPalette} />
	);
};