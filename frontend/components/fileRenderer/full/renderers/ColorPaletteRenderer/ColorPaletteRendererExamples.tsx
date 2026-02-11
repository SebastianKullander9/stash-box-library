import { ColorPalette } from "@/types/colorPalette";

interface ColorPaletteRendererExamplesProps {
	colorPalette: ColorPalette;
}

export default function ColorPaletteRendererExamples({ colorPalette }: ColorPaletteRendererExamplesProps) {
	return (
		<div className="col-span-12 min-h-screen bg-surface p-md rounded-lg">
			<p>examples</p>
		</div>
	);
};