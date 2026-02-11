import ColorPaletteRendererHome from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererHome";
import { ColorPalette } from "@/types/colorPalette";

export default async function ViewColorHome({ colorPalette }: { colorPalette: ColorPalette }) {
	return (
		<ColorPaletteRendererHome colorPalette={colorPalette} />
	);
};