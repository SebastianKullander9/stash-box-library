import { ColorPaletteTokens } from "../ColorPalettesContexts";

interface TextOnBackgroundProps {
	tokens: ColorPaletteTokens;
}

export default function TextOnBackground({ tokens }: TextOnBackgroundProps) {
	return (
		<div
			className="col-span-4"
			style={{
				background: tokens.background,
				color: tokens.text,
				padding: "1.5rem",
				borderRadius: 8
			}}
		>
			<h3 className="heading-4">Example heading</h3>
			<p>This is how text looks on the background</p>
		</div>
	);
};