import { ColorPalette } from "@/types/colorPalette";

interface ColorPaletteRendererHomeProps {
	colorPalette: ColorPalette;
}

export default function ColorPaletteRendererHome({ colorPalette }: ColorPaletteRendererHomeProps) {
	return (
		<div className="col-span-12 min-h-screen bg-surface p-md rounded-tr-lg rounded-b-lg">
			<p>home</p>
		</div>
	);
};