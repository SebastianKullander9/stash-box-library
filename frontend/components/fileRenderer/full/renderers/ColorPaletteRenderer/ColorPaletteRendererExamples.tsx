import { ColorPalette, ColorPaletteToken } from "@/types/colorPalette";
import { COLOR_PALETTE_CONTEXTS } from "../colorPaletteExamples/ColorPalettesContexts";

interface ColorPaletteRendererExamplesProps {
	colorPalette: ColorPalette;
}

function mapTokensToPalette(tokens: ColorPaletteToken[]): Record<string, string> {
	return tokens.reduce((acc, token) => {
		acc[token.role] = token.value;
		return acc;
	}, {} as Record<string, string>);
}

function canRenderContext(
	context: typeof COLOR_PALETTE_CONTEXTS[number],
	palette: Record<string, string>
) {
  	return context.required.every((role) => palette[role]);
}

export default function ColorPaletteRendererExamples({ colorPalette }: ColorPaletteRendererExamplesProps) {
	const paletteMap = mapTokensToPalette(colorPalette.tokens);

	const availableContexts = COLOR_PALETTE_CONTEXTS.filter((context) =>
		canRenderContext(context, paletteMap)
	);

	console.log(paletteMap)

	return (
		<div className="col-span-12 min-h-screen bg-surface p-md rounded-lg">
			<div className="grid grid-cols-12">
				{availableContexts.map((context) => (
					context.render(paletteMap, context.id)
				))}
			</div>
		</div>
	);
};