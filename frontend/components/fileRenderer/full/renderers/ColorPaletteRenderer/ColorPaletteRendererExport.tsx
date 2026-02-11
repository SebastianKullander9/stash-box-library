import { ColorPalette } from "@/types/colorPalette";

interface ColorPaletteRendererExportProps {
	colorPalette: ColorPalette;
}

export default function ColorPaletteRendererExport({ colorPalette }: ColorPaletteRendererExportProps) {
	return (
		<div className="col-span-12 min-h-screen bg-surface p-md rounded-lg">
			<p>export</p>
		</div>
	);
};