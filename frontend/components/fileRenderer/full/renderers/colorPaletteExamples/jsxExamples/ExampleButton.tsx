import { ColorPaletteTokens } from "../ColorPalettesContexts";

interface ExampleButtonProps {
	tokens: ColorPaletteTokens;
	primary: boolean;
}

export default function ExampleButton({ tokens, primary }: ExampleButtonProps) {
	return (
		<div 
			className="min-w-35 p-md rounded-lg text-center font-medium"
			style={{ backgroundColor: primary ? tokens.primary : tokens.secondary, border: `1px ${tokens.border}`,  }}
		>
			PrimaryBtn
		</div>
	);
};