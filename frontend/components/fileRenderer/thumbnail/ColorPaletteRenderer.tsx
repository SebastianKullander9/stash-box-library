import { ColorPalette } from "@/types/colorPalette";
import ColorPaletteThumbnail from "./renderers/ColorPaletteThumbnail";

interface ColorPaletteRendererProps {
	colorPalettes: ColorPalette[];
}

export default function ColorPaletteRenderer({ colorPalettes }: ColorPaletteRendererProps) {
	return (
		<section className="container grid grid-cols-12 section-x-padding md:px-0 gap-xl">
			{colorPalettes.map((colorPalette: ColorPalette) => (
				<ColorPaletteThumbnail
					key={colorPalette.id}
					colorPalette={colorPalette}
				/>
			))}
		</section>
	);
};