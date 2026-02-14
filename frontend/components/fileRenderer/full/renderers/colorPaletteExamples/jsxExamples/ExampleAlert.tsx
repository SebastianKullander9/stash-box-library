import { ColorPaletteTokens } from "../ColorPalettesContexts";
import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";
import { TriangleAlert } from "lucide-react";

interface ExampleAlertProps {
	tokens: ColorPaletteTokens;
	variation: "success" | "warning" | "error";
}

const iconVariations = {
	success: CircleCheckBig,
	warning: TriangleAlert,
	error: CircleX
};

export default function ExampleAlert({
	tokens,
	variation
}: ExampleAlertProps) {
	//const backgroundColor = tokens[variation];
	const Icon = iconVariations[variation];

	return (
		<div className="relative col-span-2">
			<div 
				className="first-letter:uppercase px-md py-lg w-49 rounded-t-lg"
				style={{
					backgroundColor: tokens.background,
					color: tokens[variation],
				}}
			>
				<div className="flex flex-row gap-xs">
					<Icon size={26} />
					<p className="text-center">
						This was a {variation}
					</p>
				</div>
			</div>
			<div 
				className="h-2 w-49 rounded-b-lg"
				style={{
					backgroundColor: tokens[variation]
				}} 
			/>
		</div>
	);
};