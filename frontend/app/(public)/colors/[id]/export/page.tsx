import ColorPaletteRendererExport from "@/components/fileRenderer/full/renderers/ColorPaletteRenderer/ColorPaletteRendererExport";
import { ColorPalette } from "@/types/colorPalette";

export default async function ViewColorExport({ colorPalette }: { colorPalette: ColorPalette }) {
	return (
		<ColorPaletteRendererExport colorPalette={colorPalette} />
	);
};