import { ColorPaletteTokens } from "../ColorPalettesContexts";

interface ExampleAlertProps {
	tokens: ColorPaletteTokens;
	variation: "success" | "warning" | "error";
}

export default function ExampleAlert({
	tokens,
	variation
}: ExampleAlertProps) {
	const backgroundColor = tokens[variation];
	console.log(backgroundColor)

	return (
		<div 
			className="first-letter:uppercase"
		>
			{variation}
		</div>
	);
};